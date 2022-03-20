import { NextApiRequest, NextApiResponse } from "next";

export default async function Login(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("loggingreq in  ____req", _req);
  console.log("loggingbody in  ____req", _req.body);
  console.log("loggingcookies in  ____req", _req.cookies);
  console.log("logging in  ____resss", res.getHeaders());
  res
    .status(200)
    .json({ name: "John Doe", email: "JohnDoe@amiarealboy.test.com" });
}
