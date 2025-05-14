import { connect } from "mongoose";
process.loadEnvFile();

const URI_DB = process.env.URI_DB;

const connectDb = async () => {
  try {
    await connect(URI_DB);
    console.log("Conectado a MongoDB con éxito");
  } catch (error) {
    console.log("Error en la conexión");
    console.error(error);
  }
};

export { connectDb };
