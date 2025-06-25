import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { question, zip } = req.body;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const SHEET_URL = process.env.SHEET_URL;

  try {
    const prompt = `You are Unstoppabl, the 24/7 AI real estate expert. Answer concisely and clearly.\n\nUser question: ${question}\n\nZIP code: ${zip}\n\nLook up the agent in this Google Sheet: ${SHEET_URL} if ZIP is matched. Otherwise offer Stripe link to claim.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ answer: reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching response from OpenAI' });
  }
}
