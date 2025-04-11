import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getRandomUserAgent } from "../utils/userAgents";

puppeteer.use(StealthPlugin());

export const scrapeShopeeProduct = async (productUrl: string, p0?: string) => {
  const match = productUrl.match(/i\.(\d+)\.(\d+)/);

  if (!match) {
    throw new Error(
      "Invalid product URL. Please make sure it follows the correct format."
    );
  }

  const [, storeId, dealId] = match;

  const url = `https://shopee.tw/api/v4/pdp/get_pc?itemid=${dealId}&shopid=${storeId}`;
  console.log(`Scraping URL: ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    const userAgent = getRandomUserAgent();
    await page.setUserAgent(userAgent);
    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();

    const jsonText = content.match(/{.*}/)?.[0];

    if (!jsonText) {
      throw new Error("Failed to extract JSON data from page.");
    }

    return JSON.parse(jsonText);
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
};
