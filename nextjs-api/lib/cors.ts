import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from "cors";

// Initializing the cors middleware
export function newCors() {
  const cors = Cors({
    methods: ["POST", "GET", "HEAD"],
    origin: "*",
  });

  return cors;
}

// helper to run middleware in Next.js
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: any, res: any, cb: any) => void,
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}
