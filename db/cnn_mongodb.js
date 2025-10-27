import mongoose from 'mongoose';

let isConected = false;

const conectarMongoDB = async () => {
  if (isConected) {
    console.log('Ya estamos conectados a MongoDB'.green);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
        isConected= true;
        console.log('Conectado a MongoDB'.green) 
    } catch (error) {

        console.log('Error al conectar a MongoDB'.red);
    
    }
}

const db = mongoose.connection;


db.on('error', (error) => {
    isConected= false;
    console.log('Error al conectar a MongoDB:'.red);
  });

  db.once('open', () => {
    isConected= true;

  })

db.on('disconnected', () => {
    isConected= false;
  console.log('Desconectado de MongoDB'.yellow);
})

process.on('SIGINT',async () => {
    isConected= false;
    await mongoose.connection.close();
    console.log('MongoDB desconectado'.red);
    process.exit(0);
})

export {conectarMongoDB, isConected};