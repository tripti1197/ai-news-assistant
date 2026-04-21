const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const HF_API = "https://api-inference.huggingface.co/models/google/pegasus-xsum";
const TOKEN = "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";

app.post('/api/summarize', async (req, res) => {
  try {
    const content = req.body.content;

    const sentences = content.split('.').filter(s => s.trim().length > 0);

    const summary = sentences.slice(0, 2).join('.') + '.';

    const keyPoints = sentences.slice(0, 4).map(s => s.trim());

    const headlines = [
      sentences[0]?.slice(0, 50),
      sentences[1]?.slice(0, 50)
    ].filter(Boolean);

    res.json({
      summary,
      keyPoints,
      headlines
    });

  } catch (error) {
    res.status(500).json({ error: "Processing failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});