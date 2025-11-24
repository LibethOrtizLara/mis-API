import mongoose from 'mongoose';

const computadorasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    detalle: {
        type: [String],
        required: false,
    }
});

const Computadoras = mongoose.model('Computadoras', computadorasSchema);
export default Computadoras;
