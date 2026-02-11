import bcrypt from 'bcrypt';
import { createUser, findByEmail } from '../models/userModel.js';

export async function register(req, res) {
  try {
    const { ime, email, password } = req.body;

    const existing = await findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await createUser(ime, email, passwordHash);

    return res.status(201).json({
      message: "User created",
      user: newUser
    });

  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.user = {
      id: user.idkorisnik,
      ime: user.ime
    };

    return res.json(req.session.user);

  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

export function logout(req, res) {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    return res.json({ message: 'Logged out' });
  });
}

export function currentUser(req, res) {
  return res.json(req.session.user || null);
}