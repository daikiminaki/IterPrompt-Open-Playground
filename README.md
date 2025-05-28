**LLM Playground**

A simple, open-source LLM playground for experimenting with language models in your browser.

---

## Prerequisites

* Node.js (>= 16)
* pnpm ([https://pnpm.io/installation](https://pnpm.io/installation))
* A PostgreSQL (or compatible) database URL

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/daikiminaki/IterPrompt-Open-Playground.git
   cd llm-playground
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   * Copy the example file:

     ```bash
     cp .env.example .env
     ```
   * Open `.env` and set the required variable:

     ```env
     DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
     ```
   * No other variables are required to get started.
   * Current version does not use the .env API_KEY variables for each prodvider but uses the API_KEY form input in the playground itself.

4. **Run in development mode**

   ```bash
   pnpm dev
   ```

   The playground will be available at `http://localhost:3000`.


5. **How to add different models**

You can add new models in lib/ai/models.ts


---
