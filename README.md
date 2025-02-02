# Next.js Project with DeepSeek Integration

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It includes instructions for integrating DeepSeek using Ollama.

---

## Installation

### Step 1: Install Ollama and DeepSeek Model

1. **Go to [Ollama's official website](https://ollama.com/)**.
2. **Download and install Ollama** for your operating system (Windows, macOS, or Linux).
3. **Open your terminal** and pull the DeepSeek model (e.g., `deepseek-r1:1.5b` or any other model you prefer):

   ```bash
   ollama pull deepseek-r1:1.5b
   ```

4. **Run the DeepSeek model**:

   ```bash
   ollama run deepseek-r1:1.5b
   ```

   The model will now be running and ready to use.

---

### Step 2: Run the Next.js App

1. **Navigate to your project directory** in the terminal.
2. **Install dependencies** (if not already installed):

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser** and go to [http://localhost:3000](http://localhost:3000) to view the app.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
