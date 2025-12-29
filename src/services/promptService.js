import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = 'tngtech/deepseek-r1t2-chimera:free';

/**
 * Create axios instance for OpenRouter API
 */
const apiClient = axios.create({
    baseURL: OPENROUTER_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000, // 60 second timeout
});

/**
 * Generate AI completion using OpenRouter API
 * @param {string} systemPrompt - The system instruction
 * @param {string} userPrompt - The user input
 * @returns {Promise<string>} - The AI-generated response
 */
export async function generateCompletion(systemPrompt, userPrompt) {
    try {
        if (!API_KEY || API_KEY === 'your_api_key_here') {
            throw new Error('API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.');
        }

        const response = await apiClient.post('', {
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: userPrompt,
                },
            ],
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Prompt Generator',
            },
        });

        if (response.data?.choices?.[0]?.message?.content) {
            return response.data.choices[0].message.content.trim();
        } else {
            throw new Error('Invalid response from API');
        }
    } catch (error) {
        // Handle different error scenarios
        if (error.response) {
            // API responded with error
            const status = error.response.status;
            const message = error.response.data?.error?.message || 'API request failed';

            if (status === 401) {
                throw new Error('Invalid API key. Please check your configuration.');
            } else if (status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            } else if (status === 500) {
                throw new Error('API server error. Please try again.');
            } else {
                throw new Error(`API Error: ${message}`);
            }
        } else if (error.request) {
            // Request made but no response
            throw new Error('Network error. Please check your internet connection.');
        } else {
            // Other errors
            throw new Error(error.message || 'An unexpected error occurred');
        }
    }
}

/**
 * Generate prompt using Fast mode
 * @param {string} userInput - The raw user input
 * @returns {Promise<string>} - The optimized prompt
 */
export async function generateFastPrompt(userInput) {
    const systemPrompt = `As an expert in prompt engineering, please craft a concise, professional prompt that instructs an AI model to transform any input text into a clear, single-paragraph, straightforward, and highly accurate prompt for expert-level use, adhering strictly to the guidelines: under 500 characters, no explanations or conversations, and written in a direct, professional tone.`;

    return await generateCompletion(systemPrompt, userInput);
}

/**
 * Generate prompt using Advanced mode
 * @param {string} userInput - The raw user input
 * @returns {Promise<string>} - The optimized prompt with structured format
 */
export async function generateAdvancedPrompt(userInput) {
    const systemPrompt = `You are an AI language model tasked with transforming input text into a professional prompt aimed at obtaining the most accurate and high-quality results from AI models. Please address a seasoned expert in the relevant domain with a professional and detailed tone. Structure the output in plain English text using a bullet-point format, including: - A prompt introduction addressing the expert professionally. - A prompt body containing all key details in structured bullet points. - A prompt conclusion emphasizing the expert's role and how their experience should be applied. Ensure the final output is between 500 and 1000 characters, contains no bold formatting, and provides only the professional prompt without any additional responses or conversations.`;

    return await generateCompletion(systemPrompt, userInput);
}
