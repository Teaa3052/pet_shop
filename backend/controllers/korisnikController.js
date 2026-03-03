import { 
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser as deleteUserModel,
  createUserNoPassword
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
      return res.status(404).json({ error: "User not found"});
    }
    res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message})
    }
};

export const addUserNoPass = async (req, res) => {
  const { ime, prezime, email } = req.body;

  try {
  const newUser = await createUserNoPassword(ime, prezime, email);
  res.status(201).json(newUser);
} catch (err) {
  if (err.code === '23505') { // unique_violation
    return res.status(400).json({ error: 'Email already exist' });
  }
  res.status(500).json({ error: err.message });
}

};


// PUT api/korisnik/:id
export const updateUserController = async (req, res) => {
  const {ime, prezime, email} = req.body;

  try {
    const updated = await updateUser(req.params.id, ime, prezime, email);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    } 
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

// DELETE /api/korisnik/:id
export const deleteUser = async (req, res) => {

  const id = req.params.id; 
  if (req.session.user.id == Number(id)) {
    return res.status(400).json({ message: "Superuser cannot delete themselves"});
  }
  try {
    const success = await deleteUserModel(req.params.id);

    if (!success) {
      return res.status(404).json({ error: 'User not found'});
    }
    res.json({ message: 'User successfully deleted'})
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

