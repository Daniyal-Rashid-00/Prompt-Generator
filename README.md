# 🧠 AI Prompt Generator & Optimizer

**Live Demo:** [https://daniyal-rashid-00.github.io/Prompt-Generator/](https://daniyal-rashid-00.github.io/Prompt-Generator/)

**Prompt Generator** is an intelligent web application designed to eliminate the "prompt engineering barrier." It acts as a middleware between casual users and Large Language Models, automatically transforming vague or simple inputs into structurally optimized, expert-level AI prompts utilizing the OpenRouter API.

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios" alt="Axios">
  <img src="https://img.shields.io/badge/OpenRouter-AI-blue?style=for-the-badge" alt="OpenRouter">
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions" alt="Actions">
</p>

---

## 🏗️ Architecture & Technical Problem Solving

This project was built to address a common pain point: users struggling to get high-quality outputs from AI models due to poorly structured instructions.

### 1. Frontend Architecture (React + Vite)
- **Component Design:** Built a highly decoupled UI separating the `Header`, `ModeSelector`, `PromptInput`, and `OutputDisplay`. This ensures maintainability and clean state flows across the application.
- **State & UX:** Features real-time character counting mapped to dynamic length constraints, clipboard API integration, and keyboard shortcut event listeners (e.g., `Ctrl+Enter` to generate) for power users.
- **Design System:** Engineered a custom CSS foundation utilizing glassmorphism attributes, CSS variables for theming, and the `Outfit` font family. Mobile-responsive by default.

### 2. Dual-Mode Generation Engine
Designed the generation logic to handle two highly distinct prompt engineering workflows:
- **Fast Mode:** Outputs concise, actionable prompts (<500 characters) designed for quick, direct interactions.
- **Advanced Mode:** Outputs comprehensive instruction sets (500–1000 characters) including bulleted formatting, contextual bodies, and strict constraints, built for complex coding or reasoning tasks.

### 3. Resilient API Integration
- **LLM Pipeline:** Integrated `DeepSeek R1T2 Chimera` via the OpenRouter API.
- **Network Layer:** Used Axios with configured request interceptors. Designed robust, graceful `try/catch` error handling that maps complex API timeout or validation errors into user-friendly UI notifications instead of failing silently.

### 4. CI/CD Pipeline
- **Automation:** Configured automated GitHub Actions workflows. Every commit to `main` triggers a complete Node.js build process, injects secure environment secrets, and deploys the optimized Vite bundle statically to GitHub Pages.

---

## 🛠️ Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/prompt-generator.git
cd prompt-generator
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Environment:**
Create a `.env` file in the root directory:
```env
VITE_OPENROUTER_API_KEY=your_api_key_here
```

4. **Run Development Server:**
```bash
npm run dev
```

---

## 👨‍💻 About The Developer

Built by **Daniyal Rashid**. I specialize in creating performant, user-centric frontends and robust API integrations. 

🔗 **[View My Portfolio & Resume](https://daniyal-rashid.vercel.app/)**
