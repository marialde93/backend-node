import { User } from "../models/authModel.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId, "-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (id !== req.userId) {
    return res
      .status(403)
      .json({ error: "No autorizado para modificar este usuario" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al modificar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (id !== req.userId) {
    return res
      .status(403)
      .json({ error: "No autorizado para eliminar este usuario" });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
