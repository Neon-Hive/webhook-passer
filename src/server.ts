import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
require('dotenv').config()

const envs = process.env as Record<string, string>
const app = express();
app.use(bodyParser.json());

if (!envs.DOMAIN_A || !envs.DOMAIN_A) {
  throw new Error('DOMAIN_A and DOMAIN_B environment variables must be defined');
}

const targetUrls: string[] = [envs.DOMAIN_A, envs.DOMAIN_B];

app.post('/webhook-passer', async (req, res) => {
  const data = req.body;
  
  try {
    // Create an array of promises for concurrent requests
    const requests = targetUrls.map(async url => {
      try {
        console.log(`Sending payload to ${url}:`, data);  // Log URL and payload
        const response = await axios.post(url, data)
        console.log(`Response from ${url}:`, response.status, response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(`Error sending request to ${url}:`, error.response?.status);
        } else {
          console.error(`Unexpected error sending request to ${url}:`, error);
        }
      }
    });

    // Await all requests
    await Promise.all(requests);

    // Respond to the sender
    res.status(202).send('Request forwarded to all targets');
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).send('Error forwarding request');
  }
});

const PORT = envs.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
