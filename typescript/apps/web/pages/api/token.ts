import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "next-auth/jwt";

const secret = process.env.SECRET;

export default async function Token(req: NextApiRequest, res: NextApiResponse) {
  const token = await jwt.getToken({ req, secret });
  console.log("tokennnnnnn", token);
  res.send(JSON.stringify(token, undefined, 2));
}
