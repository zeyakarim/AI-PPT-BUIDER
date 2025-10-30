# AI PPT Builder  

*A full-stack AI-powered presentation generator for creating professional slides instantly.*



## Live Demo

| Component | Live URL |

| **Frontend** | [![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white)](https://ai-ppt-buider.vercel.app/) |



---

## Table of Contents

- [Project Overview](#-project-overview)

- [Features](#-features)

- [Architecture](#-architecture)

- [Getting Started](#-getting-started)

- [API Integration](#-api-integration)

- [Deployment](#-deployment)

---

## Project Overview

AI PPT Builder is a modern, full-stack web application that leverages **Google Gemini AI** to generate professional PowerPoint presentations from natural language prompts. Users can input topics, upload images, and instantly receive downloadable `.pptx` files with structured slides.



Built with **TypeScript**, **React**, **Vite**, and **Tailwind CSS**, it emphasizes performance, type safety, and an intuitive user experience.



## Features

- **AI-Powered Slide Generation:** Enter a topic → get a full presentation in seconds  

- **Image Upload & Analysis:** Upload up to 5 images; AI analyzes and integrates insights  

- **Edit Existing Slides:** Refine or expand generated presentations  

- **PPTX Export:** One-click download of fully formatted PowerPoint files  

- **Model Selection:** Choose between **Gemini 2.5 Flash** and **1.5 Pro**  

- **Enter to Generate:** Press **Shift + Enter** or **Ctrl + Enter** to generate  

- **Responsive Design:** Mobile & desktop optimized with Tailwind CSS  

- **Type-Safe:** End-to-end TypeScript + Zod validation  



---

## Architecture

### Frontend (React + Vite + TypeScript)

A fast, modern SPA with:

- **Framework**: React 18

- **Build Tool**: Vite

- **Styling**: Tailwind CSS

- **Form Handling**: React Hook Form + Zod

- **AI Integration**: Direct calls to Google Gemini API

- **PPTX Generation**: `pptxgenjs` (client-side)



### Backend

No backend required — **100% client-side** with secure API key handling via environment variables.



> **Security Note**: Gemini API key is stored in `VITE_GEMINI_API_KEY` and used only in the browser (standard for AI tools like this).



### AI Model

- **Provider**: Google Gemini (via `@google/generative-ai`)

- **Models**: `gemini-2.5-flash`, `gemini-1.5-pro`

- **Output**: Structured JSON → converted to PPTX





-----

## 🧑‍💻 Getting Started

### Prerequisites

  * Node.js (v18+ recommended)
  * npm or pnpm
  * Google Gemini API Key

### Environment Setup

1.  **Clone the repo:**
    ```bash
    git clone (https://github.com/zeyakarim/AI-PPT-BUIDER.git)
    cd ai-ppt-builder
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create `.env` in the root directory:**
    ```env
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```
4.  **Start the dev server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173`

-----

## 🔗 API Integration

### Google Gemini API

  * **Endpoint**: `generateContent`
  * **Input**: Text prompt + optional images
  * **Output**: JSON matching a Presentation schema
  * **Schema Enforcement**: `responseSchema` ensures valid output

### PPTX Generation

  * **Library**: `pptxgenjs`
  * **Output**: Fully editable `.pptx` file
  * **Layout**: A4 slides with title + bullet points

-----

## ☁️ Deployment

Deployed on **Vercel** for instant global access.
**Live URL**: `https://ai-ppt-buider.vercel.app/`

### Deploy Your Own

```bash
npm run build
vercel
```

### Architecture Diagram

```mermaid

graph TD

    A[User] --> B[Frontend - React/Vite]

    B --> C[Google Gemini API]

    C --> D[Structured JSON Response]

    D --> B

    B --> E[pptxgenjs → .pptx Download]
