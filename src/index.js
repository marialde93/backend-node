import express from "express";
import cors from "cors";
import { connectDb } from "./config/mongo.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";



const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
//app.use("/api/products", productsRouter);
//app.use("/api/sales", salesRouter);
//app.use("/api/providers", providersRouter);

app.get("/api/user");

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento http://localhost:${PORT}`);
  connectDb();
});
