import { Router } from "express";
import { scrapeShopeeHandler } from "../controllers/shopeeController";

const router = Router();

router.post("/scrape", scrapeShopeeHandler);

export default router;
