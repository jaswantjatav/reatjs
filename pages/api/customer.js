import nc from "next-connect";
import executeQuery from '../../lib/db';
import { getAddress } from 'ethers/lib/utils';

const handler = nc();

handler.get(async (req, res) => {
  const { wallet } = req.query;

  try {
    const results = await executeQuery({
      query: 'SELECT name FROM customers WHERE wallet = ?',
      values: [getAddress(wallet)]
    });

    res.json(results[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error.' });
  }
});

export default handler;
