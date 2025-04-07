
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

if (!accessKey) {
  throw new Error('UNSPLASH_ACCESS_KEY is not defined in environment variables.');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const { searchTerm } = query;

  console.log(`Unsplash API request received for: ${searchTerm}`); // Log incoming request

  if (!searchTerm || typeof searchTerm !== 'string') {
    console.error('Unsplash API: Search term is missing or invalid.');
    return res.status(400).json({ error: 'Search term is required.' });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&client_id=${accessKey}`
    );

    // console.log(`Unsplash API response status: ${response.status}`);

    if (!response.ok) {
      console.error(`Unsplash API: Failed to fetch images. Status: ${response.status}`);
      return res.status(response.status).json({ error: 'Failed to fetch images from Unsplash.' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Unsplash API error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}