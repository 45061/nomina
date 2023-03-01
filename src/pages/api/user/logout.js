import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function logout(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "no token" });
  }

  try {
    verify(myTokenName, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);

    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("logout succesully");
  } catch (error) {
    return res.status(403).json({ error: "invalid token" });
  }
}
