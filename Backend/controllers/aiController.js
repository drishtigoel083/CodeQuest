import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAIHint = async (req, res) => {
  try {
    const { code, language, problemTitle, problemDescription, errorOutput } = req.body;
    
    // Check if key is available
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API key is not configured on the server." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    let prompt = `You are an expert coding tutor. The user is solving an algorithm problem called "${problemTitle}".\n\nProblem Description:\n${problemDescription}\n\nThe user's current code in ${language} is:\n${code}\n\n`;
    
    if (errorOutput && errorOutput.trim() !== "") {
      prompt += `The user just ran or submitted the code and encountered the following failing output or error:\n${errorOutput}\n\nPlease analyze their code and the exact error. Provide a highly precise debugging hint. DO NOT give them the direct final code solution. Guide them towards the logic gap.`;
    } else {
      prompt += `Please provide a concept explanation or a hint to help them progress in solving this problem. DO NOT write the final code solution for them. Point them in the correct standard algorithm direction.`;
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ hint: text });
  } catch (error) {
    console.error("AI Hint Error:", error);
    res.status(500).json({ message: "Error fetching AI assistance. Please try again later." });
  }
};
