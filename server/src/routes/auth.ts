import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "Usuario registrado" });
});

router.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false });
  res.json({ message: "Login exitoso" });
});

router.post("/logout", (req: any, res: any) => {
  res.clearCookie("token");
  res.json({ message: "Logout exitoso" });
});

export default router;
