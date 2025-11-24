import Computadoras from '../models/computadoras.model.js';
import mongoose from 'mongoose';

// Obtener todas las computadoras
export const getALLComputadoras = async (req, res) => {
  console.log('Obtiene todas las computadoras');
  try {
    const computadorasList = await Computadoras.find({}, { __v: 0 });
    if (computadorasList.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron computadoras',
      });
    }
    return res.status(200).json({
      computadoras: computadorasList,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener las computadoras',
    });
  }
};

// Obtener computadora por ID
export const getComputadoraById = async (req, res) => {
  console.log('COMPUTADORA POR ID');
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido',
      });
    }
    const computadora = await Computadoras.findById(id);
    if (!computadora) {
      return res.status(404).json({
        msg: 'Computadora no encontrada',
      });
    }
    return res.status(200).json({
      computadora,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener la computadora',
    });
  }
};

// Crear computadora
export const postComputadora = async (req, res) => {
  console.log('POST COMPUTADORA');
  const body = req.body;
  const computadora = new Computadoras(body);
  try {
    const validationError = computadora.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(
        (error) => error.message
      );
      return res.status(400).json({
        error: errorMessages,
      });
    }

    await computadora.save();
    return res.status(201).json({
      computadora,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al guardar la computadora',
    });
  }
};

// Actualizar computadora
export const putComputadora = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido',
      });
    }
    const computadora = await Computadoras.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!computadora) {
      return res.status(404).json({
        msg: 'Computadora no encontrada',
      });
    }
    return res.status(200).json({
      computadora,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar la computadora',
    });
  }
};

// Eliminar computadora
export const deleteComputadora = async (req, res) => {
  console.log('DELETE COMPUTADORA');
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID no válido',
      });
    }
    const computadora = await Computadoras.findByIdAndDelete(id);
    if (!computadora) {
      return res.status(404).json({
        msg: 'Computadora no encontrada',
      });
    }
    return res.status(200).json({
      msg: 'Computadora eliminada',
      computadora,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al eliminar la computadora',
    });
  }
};
