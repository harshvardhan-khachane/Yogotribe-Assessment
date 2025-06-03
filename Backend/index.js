import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Prime check algorithm
export const isPrime = (number) => {
  if (number <= 1) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;
  
  const limit = Math.sqrt(number);
  for (let i = 3; i <= limit; i += 2) {
    if (number % i === 0) return false;
  }
  return true;
};

// Prime check endpoint
app.get('/api/is-prime', (req, res) => {
  const { number: numberParam } = req.query;
  
  if (numberParam === undefined || numberParam === '') {
    return res.status(400).json({ error: "Missing required parameter: 'number'" });
  }

  const number = Number(numberParam);
  
  if (!Number.isInteger(number)) {
    return res.status(400).json({ error: "Input must be an integer" });
  }

  if (number < 0) {
    return res.status(400).json({ error: "Input must be a non-negative integer" });
  }

  res.json({
    number,
    isPrime: isPrime(number)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;