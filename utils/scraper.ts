// utils/scraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

interface ScrapedData {
    title: string;
    price: number;
}

export const scrapeWebsite = async (): Promise<ScrapedData[]> => {
    try {
        const { data } = await axios.get('https://say-hi-beta.vercel.app/blogs'); // Replace with actual website URL

        const $ = cheerio.load(data); // Load HTML into Cheerio for scraping

        const scrapedData: ScrapedData[] = [];

        // Example: scrape product titles and prices (Modify selectors for your target site)
        $('.product').each((index, element) => {
            const title = $(element).text().trim();
            const link = $(element).attr('href');
            console.log("link: ", link)
            // if (title && link) {
            //     scrapedData.push({ title, link });
            // }
        })
        // Push data into the array

        return scrapedData;
    } catch (error) {
        console.error('Error scraping the site:', error);
        return [];
    }
};
