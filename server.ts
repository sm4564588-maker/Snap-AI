import express from 'express';
import { GoogleGenAI, Type, Schema } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Lazy get GoogleGenAI instance
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing from environment.');
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
}

// Food analysis schema
const foodAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    mealName: { type: Type.STRING, description: "Overall concise name of the analyzed meal" },
    foods: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          confidence: { type: Type.NUMBER, description: "Confidence percentage (0-100)" },
          estimatedWeightGrams: { type: Type.NUMBER, description: "Estimated weight in grams" },
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER, description: "Protein in grams" },
          carbs: { type: Type.NUMBER, description: "Carbohydrates in grams" },
          fat: { type: Type.NUMBER, description: "Fat in grams" }
        },
        required: ["name", "confidence", "estimatedWeightGrams", "calories", "protein", "carbs", "fat"]
      }
    },
    totalNutrition: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.NUMBER },
        protein: { type: Type.NUMBER },
        carbs: { type: Type.NUMBER },
        fat: { type: Type.NUMBER },
        fiber: { type: Type.NUMBER },
        sugar: { type: Type.NUMBER },
        sodiumMg: { type: Type.NUMBER },
        cholesterolMg: { type: Type.NUMBER },
        servingSizeGrams: { type: Type.NUMBER }
      },
      required: ["calories", "protein", "carbs", "fat", "fiber", "sugar", "sodiumMg", "cholesterolMg", "servingSizeGrams"]
    },
    mealScore: { type: Type.NUMBER, description: "Overall meal health & nutrition score (0-100)" },
    scoreReason: { type: Type.STRING, description: "Short breakdown of why this score was given" },
    aiSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Personalized nutrition insights, e.g. ['High Protein', 'Add More Greens', 'Great Post Workout']"
    },
    macroBreakdownPercentage: {
      type: Type.OBJECT,
      properties: {
        proteinPct: { type: Type.NUMBER },
        carbsPct: { type: Type.NUMBER },
        fatPct: { type: Type.NUMBER }
      },
      required: ["proteinPct", "carbsPct", "fatPct"]
    }
  },
  required: ["mealName", "foods", "totalNutrition", "mealScore", "scoreReason", "aiSuggestions", "macroBreakdownPercentage"]
};

// API Route: Analyze Food Image
app.post('/api/analyze-food', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback mock payload if API key is not configured yet
      return res.json({
        mealName: "Grilled Chicken & Quinoa Salad",
        foods: [
          { name: "Grilled Chicken Breast", confidence: 98, estimatedWeightGrams: 180, calories: 298, protein: 55, carbs: 0, fat: 6 },
          { name: "Organic Quinoa", confidence: 95, estimatedWeightGrams: 120, calories: 144, protein: 5, carbs: 26, fat: 2.5 },
          { name: "Fresh Avocado", confidence: 92, estimatedWeightGrams: 50, calories: 80, protein: 1, carbs: 4, fat: 7.5 },
          { name: "Steamed Broccoli", confidence: 96, estimatedWeightGrams: 80, calories: 28, protein: 2.5, carbs: 6, fat: 0.4 }
        ],
        totalNutrition: {
          calories: 550,
          protein: 63.5,
          carbs: 36,
          fat: 16.4,
          fiber: 8.5,
          sugar: 3.2,
          sodiumMg: 380,
          cholesterolMg: 145,
          servingSizeGrams: 430
        },
        mealScore: 94,
        scoreReason: "High lean protein density with complex carbohydrates, healthy fats, and high dietary fiber.",
        aiSuggestions: ["High Protein Source", "Great Post-Workout Fuel", "Balanced Healthy Fats", "Low Glycemic Index"],
        macroBreakdownPercentage: { proteinPct: 46, carbsPct: 26, fatPct: 28 }
      });
    }

    const ai = getGenAI();

    // Remove data URL prefix if present
    const base64Clean = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Clean
          }
        },
        {
          text: `You are Snap AI, an expert computer vision nutrition analyst. 
Analyze this meal photo with maximum precision.
Identify every food item visible, estimate their gram weights, calculate exact calories and macronutrients (protein, carbs, fat, fiber, sugar, sodium, cholesterol), score the overall meal quality from 0 to 100 based on nutritional density, and provide actionable AI health suggestions.
Return data matching the specified JSON schema.`
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: foodAnalysisSchema,
        temperature: 0.2
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error('Empty response from AI model');
    }

    const parsedData = JSON.parse(resultText);
    res.json(parsedData);
  } catch (error: any) {
    console.error('Error analyzing food image:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze food image' });
  }
});

// API Route: AI Nutritionist Chat
app.post('/api/chat-nutritionist', async (req, res) => {
  try {
    const { messages, userProfile, currentDailyStats } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      const lastMsg = messages[messages.length - 1]?.content || "";
      return res.json({
        reply: `Ghost AI Nutritionist: Great question! To hit your goal regarding "${lastMsg}", aim for lean proteins like chicken breast, salmon, eggs, or Greek yogurt. Pair with complex carbs and drink plenty of water! 🟡`
      });
    }

    const ai = getGenAI();

    const systemInstruction = `You are "Snap AI Ghost Nutritionist", a friendly, ultra-knowledgeable, snappy AI health & fitness coach inspired by Snapchat's energetic vibe.
User Profile context: ${JSON.stringify(userProfile || {})}
Current Daily Stats context: ${JSON.stringify(currentDailyStats || {})}

Keep replies snappy, clear, highly practical, and formatted with bullet points or emojis when helpful. Give specific meal ideas, macro breakdowns, and motivational advice!`;

    const chatContents = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600
      }
    });

    res.json({ reply: response.text || "I'm here to help you snap your way to healthier eating!" });
  } catch (error: any) {
    console.error('Error in chat nutritionist:', error);
    res.status(500).json({ error: error.message || 'Failed to get chat response' });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await vite.transformIndexHtml(url, `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
              <title>Snap AI - Snap. Analyze. Eat Smarter.</title>
              <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%23FFFC00'/><circle cx='50' cy='50' r='28' fill='%23000'/><circle cx='50' cy='50' r='18' fill='%23FFFC00'/><circle cx='50' cy='50' r='10' fill='%23000'/><path d='M35 30 L45 20 L55 20 L65 30' stroke='%23000' stroke-width='4' fill='none'/></svg>" />
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
            </head>
            <body class="bg-black text-white font-sans antialiased selection:bg-yellow-400 selection:text-black">
              <div id="root"></div>
              <script type="module" src="/src/main.tsx"></script>
            </body>
          </html>
        `);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ Snap AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
