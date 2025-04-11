import { Request, Response } from "express";
import { scrapeShopeeProduct } from "../services/scraperService";

export const scrapeShopeeHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  {
    const { productUrl } = req.body;

    if (!productUrl) {
      res.status(400).json({ error: "Product URL is required." });
    }

    try {
      const data = await scrapeShopeeProduct(productUrl);
      res.json(data);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Internal Server Error", detail: error.message });
    }
  }
};
