import bcrypt from 'bcryptjs';
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
      ime: user.ime,
      role: user.role
    };


    req.session.save((err) => {
      if (err) {
        console.error("SESSION SAVE ERROR:", err);
        return res.status(500).json({
            message:"Session save failed"
        });
      }


      return res.json({ user: req.session.user });
    });

  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

export function currentUser(req, res) {
    return res.json(req.session.user || null);
}


export function logout(req, res) {

    console.log("LOGOUT CONTROLLER POZVAN");
    console.log("LOGOUT SID:", req.sessionID);
    console.log("LOGOUT USER:", req.session.user);

    req.session.destroy(err => {

        if (err) {
            console.log("DESTROY ERROR:", err);
            return res.status(500).json({
                message: "Logout failed"
            });
        }

        console.log("SESSION DESTROYED");

        res.clearCookie('connect.sid');

        return res.json({
            message: "Logged out"
        });
    });
}