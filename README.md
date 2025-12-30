# AI Prompt Generator and Optimizer

## Overview

This web application serves as an intelligent intermediary between users and large language models. It takes rough ideas or simple descriptions and transforms them into highly effective, professionally structured prompts that maximize the quality and accuracy of AI model outputs.

The core problem this solves is the prompt engineering barrier. Most users struggle to articulate their needs in a way that elicits optimal responses from AI models. This tool automates the prompt engineering process, applying best practices to convert casual input into expert-level prompts.

## Purpose

The application addresses two distinct use cases through its dual-mode operation:

**Fast Mode** generates concise, direct prompts optimized for quick interactions. The system constrains output to under 500 characters while maintaining professional tone and clarity. This mode suits users who need straightforward, actionable prompts without extensive detail.

**Advanced Mode** produces comprehensive, structured prompts designed for complex tasks requiring detailed specifications. Output ranges from 500 to 1000 characters and follows a bullet-point format with clear sections: introduction, body with key details, and conclusion. This mode targets professional workflows where precision and completeness are critical.

## Technical Architecture

### Frontend Layer

Built with React and Vite, the application provides a single-page interface optimized for prompt generation workflows. The component architecture separates concerns:

- **Header**: Branding and navigation
- **ModeSelector**: Toggle between Fast and Advanced generation modes
- **PromptInput**: Text input with character counting and validation
- **OutputDisplay**: Results presentation with clipboard integration
- **ErrorNotification**: User feedback for API failures and validation errors

The design system implements a dark theme with glassmorphism effects, utilizing CSS custom properties for consistent styling. All animations use CSS transitions for performance.

### API Integration

The service layer interfaces with OpenRouter API, which provides access to the DeepSeek R1T2 Chimera model. The implementation includes:

- Axios-based HTTP client with request interceptors
- Environment-based API key management
- Error handling with user-friendly message translation
- Response validation and parsing

Each generation mode uses distinct system prompts that instruct the AI model on output format, length constraints, and tone requirements.

### Deployment Pipeline

GitHub Actions automates the build and deployment process. On commits to the main branch, the workflow:

1. Checks out the repository
2. Configures Node.js environment
3. Installs dependencies
4. Injects API key from repository secrets
5. Builds production bundle with Vite
6. Deploys static assets to GitHub Pages

The workflow uses GitHub's built-in Pages deployment action, eliminating the need for external hosting infrastructure.

## Key Features

**Dual Generation Modes**: Users select between concise or detailed output based on their use case. Mode selection dynamically adjusts the system prompt sent to the API.

**Real-time Character Counting**: Both input and output display character counts, providing transparency about content length relative to mode constraints.

**Clipboard Integration**: Single-click copying of generated prompts enables seamless workflow integration with other AI tools.

**Keyboard Shortcuts**: Ctrl+Enter triggers generation, reducing interaction friction for power users.

**Error Handling**: The application degrades gracefully when API calls fail, displaying actionable error messages and suggestions for resolution.

**Responsive Design**: The interface adapts to different screen sizes using CSS media queries and flexible layouts.

## Technology Stack

- React 18 for component-based UI development
- Vite 5 for fast builds and hot module replacement
- Axios for HTTP client functionality
- OpenRouter API for AI model access
- CSS3 with custom properties for theming
- GitHub Actions for CI/CD automation
- GitHub Pages for static site hosting

## Configuration

The application requires a single environment variable:

`VITE_OPENROUTER_API_KEY`: Authentication token for OpenRouter API access. This must be configured both locally for development and as a GitHub repository secret for production deployment.

## Design Philosophy

The visual design prioritizes clarity and focus while maintaining aesthetic appeal. The dark color scheme reduces eye strain during extended use. Glassmorphism effects provide visual hierarchy without overwhelming the interface. Animations enhance perceived performance and guide user attention to state changes.

Typography uses the Outfit font family for modern, readable text rendering. The layout centers content within a maximum width container, optimizing for readability on large displays while remaining functional on mobile devices.

## License

Released under MIT License.
