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
    contents: `Hello, this is an application where the user can either discover a new laptop based on their needs and optionally budget, or, a validation mode where they provide an existing laptop model and/or existing laptop specs, and their needs.

Your job is simply to convert the user input into a structured form. If it is a discovery query, use that queryType, and similarly if it's a validation query, use the validation queryType. The laptopModel and laptopSpecs properties should only be filled out if it's a validation query. The needs, needsBudget (meaning their budget) and otherNotes properties may be filled out for both query types (or some don't have to be filled out if it's not appropriate).

The user input will be in <userInput></userInput> tags after this sentence.

<userInput>${req.body.userInput}</userInput>`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        "type": "object",
        "properties": {
          "queryType": {
            "type": "string",
            "enum": [
              "discovery",
              "validation"
            ]
          },
          "laptopModel": {
            "type": "string"
          },
          "laptopSpecs": {
            "type": "object",
            "properties": {
              "processor": {
                "type": "string"
              },
              "ram": {
                "type": "string"
              },
              "storage": {
                "type": "string"
              },
              "graphics": {
                "type": "string"
              }
            }
          },
          "needs": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "needsBudget": {
            "type": "number"
          },
          "otherNotes": {
            "type": "string"
          }
        },
        "required": [
          "queryType"
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
