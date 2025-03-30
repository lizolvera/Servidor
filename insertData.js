require('dotenv').config();
const mongoose = require('mongoose');
const MisionVision = require('./Models/MisionVision');
const HistorialAntecedentes = require('./models/HistorialAntecedentes');

// Conectar a la base de datos
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    process.exit(1);
  }
};

// Función para insertar datos
const insertarDatos = async () => {
  try {
    // Insertar datos en la colección MisionVision
    const misionVision = new MisionVision({
      mision: 'Ofrecer productos de alta calidad que satisfagan las necesidades de nuestros clientes.',
      vision: 'Ser reconocidos como líderes en innovación y excelencia en nuestro sector.',
      valores: 'Compromiso, integridad y respeto por nuestros clientes y empleados.',
    });
    await misionVision.save();
    console.log('Datos insertados en MisionVision');

    // Insertar datos en la colección HistorialAntecedentes
    const historialAntecedentes = new HistorialAntecedentes({
      historial: 'Nuestra empresa fue fundada en 2005 con el objetivo de revolucionar la industria.',
      antecedentes: 'Desde nuestros inicios, hemos crecido y evolucionado, manteniendo siempre nuestra misión y valores.',
    });
    await historialAntecedentes.save();
    console.log('Datos insertados en HistorialAntecedentes');

  } catch (error) {
    console.error('Error al insertar datos', error);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar el script
(async () => {
  await conectarDB();
  await insertarDatos();
})();