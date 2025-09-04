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
    contents: `Hello, in this application, the user is trying to find a laptop that suits their needs. Please answer their query with a recommendation of a laptop with an explanation of the recommendation, or other response you wish to provide to the user in the explanation field. If you have the specs of the laptop, please fill them out in the recommendation field.

The user's query will be in the <userInput></userInput> tags following this sentence.

<userInput>${req.body.userInput}</userInput>`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        "type": "object",
        "properties": {
          "explanation": {
            "type": "string"
          },
          "recommendation": {
            "type": "object",
            "properties": {
              "cpuClockGHz": {
                "type": "number"
              },
              "cpuCores": {
                "type": "integer"
              },
              "gpuVramGB": {
                "type": "number"
              },
              "laptopName": {
                "type": "string"
              },
              "price": {
                "type": "number"
              },
              "ramGB": {
                "type": "number"
              },
              "storageGB": {
                "type": "number"
              },
              "storageType": {
                "type": "string",
                "enum": [
                  "SSD",
                  "HDD"
                ]
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
