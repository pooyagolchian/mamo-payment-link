const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 4003;

app.use(cors());
app.use(express.json());

app.post('/create-payment-link', async (req, res) => {
  try {
    const response = await axios.post('https://sandbox.dev.business.mamopay.com/manage_api/v1/links', req.body, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer sk-a83af377-2fd5-4991-8202-e74801df8d98`,
      },
    });
    console.log(response.data)
    res.json(response.data);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
