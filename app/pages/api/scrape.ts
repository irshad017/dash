import { scrapeWebsite } from '@/utils/scraper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await scrapeWebsite(); // Call the scrape function
        res.status(200).json(data);         // Send the scraped data as JSON
    } catch (error) {
        res.status(500).json({
            message: "Errror",
            error: error 
        });
    }
}
