import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(100);
  }

  const user = verify(myTokenName, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);

  return res.status(201).json({ user: user });
}
