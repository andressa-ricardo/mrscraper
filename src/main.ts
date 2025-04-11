import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import shopeeRoutes from "./routes/shopeeRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/shopee", shopeeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
