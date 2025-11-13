import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registrar usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Usuario ya registrado' });

    const user = await User.create({ name, email, password });
    if (user) {
      console.log(`[Auth] Registro exitoso: ${user.email}`);
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Error al registrar usuario' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      console.log(`[Auth] Inicio de sesión: ${user.email}`);
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    console.log(`[Auth] Cierre de sesión: ${req.user?.email ?? 'desconocido'}`);
    res.status(200).json({ message: 'Sesión cerrada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};
// Obtener perfil del usuario
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        weight: user.weight,
        position: user.position,
        profileImage: user.profileImage || null,
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar perfil del usuario
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.age = req.body.age !== undefined ? Number(req.body.age) : user.age;
      user.weight = req.body.weight !== undefined ? Number(req.body.weight) : user.weight;
      user.position = req.body.position || user.position;
      
      // Si hay una imagen, la guardamos (por ahora como URL, luego podemos usar multer para archivos)
      const previousImage = user.profileImage;
      if (req.body.profileImage) {
        user.profileImage = req.body.profileImage;
      }

      const updatedUser = await user.save();

      console.log(
        `[User] ${updatedUser.email} actualizó su perfil (nombre="${updatedUser.name}", edad=${updatedUser.age ?? 'n/a'}, peso=${updatedUser.weight ?? 'n/a'}, posición="${updatedUser.position ?? 'n/a'}")`
      );

      if (req.body.profileImage && req.body.profileImage !== previousImage) {
        console.log(`[User] ${updatedUser.email} actualizó su imagen de perfil`);
      }

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        weight: updatedUser.weight,
        position: updatedUser.position,
        profileImage: updatedUser.profileImage || null,
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};