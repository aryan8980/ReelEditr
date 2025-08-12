import OpenAI from 'openai';

// Check if API key exists and log for debugging
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file');
} else {
  console.log('API key is loaded:', apiKey.substring(0, 5) + '...');
}

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend API
});

// Simple rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 20000; // 20 seconds between requests

export const generateHashtags = async (content: string) => {
  try {
    if (!content || content.trim().length === 0) {
      throw new Error('Content is required to generate hashtags');
    }

    console.log('Generating hashtags for content:', content);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a social media expert specialized in video content. Generate engaging hashtags that will help the video reach its target audience. Include a mix of trending and niche hashtags."
        },
        {
          role: "user",
          content: `Create 15 effective hashtags for this video: "${content}". Include trending hashtags and relevant niche tags. Make them engaging and discoverable.`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent) {
      throw new Error("No content in response");
    }

    console.log("Raw OpenAI response:", responseContent);

    // Extract or create hashtags from the response
    const words = responseContent.split(/[\s,]+/);
    const hashtags = words
      .map(word => {
        word = word.trim();
        // Remove any punctuation except #
        word = word.replace(/[^\w#]/g, '');
        // Add # if it doesn't start with one
        if (!word.startsWith('#')) {
          word = '#' + word;
        }
        return word;
      })
      .filter(tag => tag.length > 1) // Filter out empty or single-char tags
      .slice(0, 15); // Limit to 15 hashtags

    console.log("Generated hashtags:", hashtags);
    
    if (hashtags.length === 0) {
      throw new Error('No valid hashtags were generated');
    }

    return hashtags;
  } catch (error) {
    console.error('Error generating hashtags:', error);
    
    // More specific error messages based on the error type
    if (!apiKey) {
      throw new Error('OpenAI API key is missing. Please check your environment variables.');
    }
    
    if (error instanceof Error) {
      if (error.message.includes('wait')) {
        throw error; // Re-throw rate limit errors as-is
      }
      if (error.message.includes('401')) {
        throw new Error('Invalid OpenAI API key. Please check your configuration.');
      }
      if (error.message.includes('429')) {
        throw new Error('OpenAI API rate limit reached. Please try again in a few minutes.');
      }
      throw new Error(`Failed to generate hashtags: ${error.message}`);
    }
    
    throw new Error('Failed to generate hashtags. Please try again.');
  }
};
