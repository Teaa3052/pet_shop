import { 
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser as deleteUserModel
} from '../models/userModel.js';

// GET /api/korisnik
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/korisnik/:id
export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id); 

    if (!user) {
      return res.status(404).json({ error: "Korisnik nije pronađen"});
    }
    res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message})
    }
};

// POST /api/korisnik
export const addUser = async (req, res) => {
  const { ime, email, password } = req.body;

  try {
    const newUser = await createUser(ime, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT api/korisnik/:id
export const updateUserController = async (req, res) => {
  const {ime, email} = req.body;

  try {
    const updated = await updateUser(req.params.id, ime, email);
    if (!updated) {
      return res.status(404).json({ error: 'Korisnik nije pronaden!' });
    } 
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

// DELETE /api/korisnik/:id
export const deleteUser = async (req, res) => {
  try {
    const success = await deleteUserModel(req.params.id);

    if (!success) {
      return res.status(404).json({ error: 'Korisnik nije pronaden! '});
    }
    res.json({ message: 'Korisnik uspjesno obrisan! '})
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

// malo proučit ovo 