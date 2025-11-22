require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    console.log('Testing Gemini API...');
    console.log('API Key:', process.env.GEMINI_API_KEY ? 'Set' : 'NOT SET');
    console.log('Model:', process.env.AI_MODEL || 'gemini-1.5-flash');
    
    const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-1.5-flash' });
    
    const prompt = "Say hello in 5 words.";
    console.log('\nSending test prompt...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n✅ Success!');
    console.log('Response:', text);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    console.error('\nFull error:', error);
  }
}

testGemini();
