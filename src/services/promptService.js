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
    const systemPrompt = `You are an expert prompt engineer. Your task is to transform the user's input into a high-quality AI prompt.
    
CRITICAL REQUIREMENT: The generated prompt MUST start with a clear persona definition, such as "As an expert in [field]..." or "Act as a seasoned [role]...".

The output must be:
1. Concise (under 500 characters).
2. Written in a direct, professional tone.
3. Ready to paste directly into an AI model.

Do not include any explanations, meta-commentary, or conversational filler. Just output the optimized prompt itself.`;

    return await generateCompletion(systemPrompt, userInput);
}

/**
 * Generate prompt using Advanced mode
 * @param {string} userInput - The raw user input
 * @returns {Promise<string>} - The optimized prompt with structured format
 */
export async function generateAdvancedPrompt(userInput) {
    const systemPrompt = `You are an expert prompt engineer. Your task is to transform the user's input into a comprehensive, advanced AI prompt (500-1000 characters).

CRITICAL REQUIREMENT: The generated prompt MUST start by establishing a sophisticated persona, such as "Act as a world-class expert in [field]..." or "You are a senior [role]...".

The output must be structured as follows:
- **Introduction**: Define the persona and the high-level objective.
- **Key Requirements**: Use bullet points to detail specific constraints, formats, or necessary inclusions.
- **Conclusion**: A brief closing statement emphasizing the quality or specific outcome expected.

Do not include any explanations or meta-commentary. Output ONLY the final optimized prompt.`;

    return await generateCompletion(systemPrompt, userInput);
}
