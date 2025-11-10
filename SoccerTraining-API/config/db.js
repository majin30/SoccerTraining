import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ Error: MONGO_URI no está definida en las variables de entorno.');
      console.error('📝 Por favor, crea un archivo .env con MONGO_URI');
      console.error('📖 Consulta MONGODB_SETUP.md para más información');
      process.exit(1);
    }

    // Validar que la URI no tenga placeholders
    if (process.env.MONGO_URI.includes('<') || process.env.MONGO_URI.includes('>')) {
      console.error('❌ Error: La URI de MongoDB contiene placeholders (<tu_usuario>, <tu_password>, etc.)');
      console.error('📝 Por favor, reemplaza los placeholders con tus credenciales reales en el archivo .env');
      console.error('📖 Consulta MONGODB_SETUP.md para más información');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error conectando a MongoDB: ${error.message}`);
    
    // Mensajes de ayuda según el tipo de error
    if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
      console.error('💡 Posibles soluciones:');
      console.error('   1. Verifica que la URI en .env sea correcta');
      console.error('   2. Si usas MongoDB Atlas, verifica que el cluster exista');
      console.error('   3. Verifica tu conexión a internet');
      console.error('   4. Si usas MongoDB Atlas, verifica que tu IP esté permitida en Network Access');
    } else if (error.message.includes('authentication failed')) {
      console.error('💡 Posibles soluciones:');
      console.error('   1. Verifica que el usuario y contraseña sean correctos');
      console.error('   2. Verifica que el usuario tenga permisos de lectura/escritura');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Posibles soluciones:');
      console.error('   1. Si usas MongoDB local, verifica que el servicio esté corriendo');
      console.error('   2. Verifica que el puerto (27017) sea correcto');
    }
    
    console.error('📖 Consulta MONGODB_SETUP.md para más información');
    process.exit(1);
  }
};

export default connectDB;
