# AI Prompt Generator & Optimizer

A modern, dark-themed web application for generating and optimizing AI prompts using OpenRouter API. Transform your ideas into professional, high-quality prompts for ChatGPT, Claude, and other AI models.

## ✨ Features

- **Two Generation Modes**:
  - **Fast Mode**: Concise, professional prompts (<500 characters)
  - **Advanced Mode**: Structured, detailed prompts with bullet points (500-1000 characters)
- **Beautiful Dark UI**: Modern glassmorphism design with smooth animations
- **Copy to Clipboard**: One-click copying of generated prompts
- **Keyboard Shortcuts**: Press `Ctrl+Enter` to generate
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd prompt-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your OpenRouter API key to `.env`:
```
VITE_OPENROUTER_API_KEY=your_actual_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📦 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Create a GitHub Repository** and push your code

2. **Add Repository Secret**:
   - Go to your repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VITE_OPENROUTER_API_KEY`
   - Value: Your OpenRouter API key

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / root
   - Save

4. **Push to Main Branch**:
   - The workflow will automatically build and deploy
   - Your site will be available at: `https://<username>.github.io/<repository-name>/`

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client
- **OpenRouter API** - AI model access
- **CSS3** - Styling with custom properties

## 🎨 Design Features

- Dark theme with deep purple and pink gradients
- Glassmorphism effects with backdrop blur
- Smooth animations and transitions
- Modern typography (Outfit font)
- Responsive layout

## 📝 Usage

1. Select your desired mode (Fast or Advanced)
2. Enter your idea or concept in the input field
3. Click "Generate Optimized Prompt" or press `Ctrl+Enter`
4. Copy the generated prompt to use with any AI model

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENROUTER_API_KEY` | Your OpenRouter API key | Yes |

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Made with ❤️ using OpenRouter AI
