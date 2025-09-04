import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenAI } from "@google/genai";
import { newCors, runMiddleware } from '@/lib/cors';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const cors = newCors();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    // Prompt injection :(((((
    contents: `Hello, in this application, the user is validating that a laptop choice they're thinking about, meets their needs. They will input their laptop choice and possibly their needs. Evaluate if it does, and please provide an explanation for your evaluation in the explanation field or other message you want to show to the user in the explanation field. If available, fill out the laptop (the laptop they're inquiring about) and verdict fields.

The user input will be in the <userInput></userInput> tags following this sentence.

<userInput>${req.body.userInput}</userInput>`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        "type": "object",
        "properties": {
          "explanation": {
            "type": "string"
          },
          "laptop": {
            "type": "object",
            "properties": {
              "laptopName": {
                "type": "string"
              }
            }
          },
          "verdict": {
            "type": "object",
            "properties": {
              "suitable": {
                "type": "boolean"
              }
            }
          }
        },
        "required": [
          "explanation"
        ]
      },
    },
  });

  try {
    if (!response.text) {
      throw new Error("empty is unparseable");
    }
    const json = JSON.parse(response.text);
    res.status(200).json(json);
  } catch {
    res.status(500).json({ error: 'An error occurred either from Gemini or parsing Gemini\'s JSON :(' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 10, // Changed this from 5 (the default) to 10
};
