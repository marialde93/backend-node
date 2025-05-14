import { User } from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authSchema } from "../validators/authSchema.js";



export const register = async (req, res) => {
  const { username, password } = req.body;

  const validation = authSchema.safeParse({ username, password });

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.issues });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { username: newUser.username },
    });
  } catch (error) {
    console.log("Hola");
    res.status(400).json({ error: "el usuario ya existe" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const validator = authSchema.safeParse({ username, password });

  if (!validator.success) {
    return res.status(400).json({ error: validator.error.issues });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "credenciales inválidas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "contraseña invalida" });

    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIyNTUzN2U4YTg1NDM3YjFmNTdkODMiLCJpYXQiOjE3NDcwODUyMjEsImV4cCI6MTc0NzA4ODgyMX0.0q3Mcu9FCKhYg6p2Xmiqa0TTn2L9O0-ONII6wQCJAhQ
