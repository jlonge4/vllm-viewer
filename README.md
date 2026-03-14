<div align="center">
  <h1>🚀 vLLM Benchmark Viewer</h1>
  <p><strong>Analytics Dashboard for vLLM Benchmarks</strong></p>
  
  <p>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-blue.svg?style=flat-square&logo=react" alt="React 19" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black.svg?style=flat-square&logo=next.js" alt="Next.js 16" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS 4" /></a>
    <a href="https://ui.shadcn.com"><img src="https://img.shields.io/badge/ui-shadcn-black?style=flat-square&logo=radix-ui" alt="shadcn/ui" /></a>
  </p>
</div>

## ✨ Overview

**vLLM Viewer** is a sleek, modern, and incredibly fast dashboard tailored specifically for analyzing and visualizing **vLLM benchmark metrics**. Built with the bleeding edge of modern web tech (Next.js 16, React 19, Tailwind CSS v4, and Recharts), it turns mind-numbing performance data into actionable, beautiful insights.

Whether you're tuning throughput, latency, or memory bounds for your language models, this dashboard provides the clarity you need to push your vLLM deployments to their absolute limits.

---

## ⚡️ Features

- 📊 **Interactive Benchmarking Metrics**: Real-time charts covering request latency, throughput rates, and memory utilization.
- 🎨 **Gorgeous UI**: Designed with **Tailwind CSS v4** & **Radix UI** primitives for a premium, accessible feel. 
- 🌓 **Dark Mode Optimized**: First-class dark mode support, making it comfortable to analyze data at any hour.
- 🚀 **Lightning Fast**: Powered by Next.js and Turbopack for instantaneous hot-reloads and lightning-fast render times.
- 📱 **Fully Responsive**: Flawless experience across desktop, tablet, and mobile displays.

---

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tooling**: [TypeScript](https://www.typescriptlang.org/) & [pnpm](https://pnpm.io/)

---

## 🏎️ Getting Started (Running with `npx`)

You don't need any complex global installations to get this bad boy running. You can fire up the development server entirely through `npx`!

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v22+) and `npm` installed on your machine.

### 1. Install Dependencies
Because this project utilizes `pnpm` for lockfile consistency, you can run `pnpm` effortlessly through `npx`:

```bash
npx pnpm install
```

### 2. Start the Development Server
Spin up the blazingly fast Turbopack dev server:

```bash
npx pnpm run dev
```
*(Alternatively, you can bypass the script and just run `npx next dev --turbo`)*

### 3. View the Dashboard
Open your favorite browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

### 4. Load Sample Benchmark Data (Optional)
To quickly test the dashboard with sample vLLM benchmark data:

1. Once the dashboard loads, click **"Load Example Data"** button in the JSON input area, OR
2. Download the sample data file: `public/sample_benchmark_results.json`
3. Paste its contents into the JSON input field and click **"Parse & Visualize"**

The sample data includes 4 benchmark runs with different configurations (varying tensor parallelism, batch sizes, and concurrency levels) to demonstrate the dashboard's visualization capabilities.

---

## 📊 Data Format

The viewer expects benchmark data in JSON format matching the vLLM benchmark output structure:

```json
[
  {
    "config": {
      "client_args": {...},
      "server_args": {...},
      "server_cmd_args": [...]
    },
    "results": {
      "backend": "vllm",
      "request_throughput": 2.32,
      "input_throughput": 1185.62,
      "output_throughput": 592.81,
      "mean_ttft_ms": 85.34,
      "median_ttft_ms": 78.23,
      "mean_itl_ms": 13.18,
      "median_itl_ms": 12.86,
      ...
    },
    "cmd": "vllm serve ...",
    "metadata": {...}
  }
]
```

For llm-optimizer users, use the `--output-json` flag:
```bash
python -m llm_optimizer.cli benchmark --model meta-llama/Llama-3.1-8B --output-json results.json
```

---

## 🛠️ Additional Commands

Here are some other useful commands you can invoke straight from your terminal using `npx`:

**Build for Production:**
```bash
npx pnpm run build
```

**Start the Production Server:**
```bash
npx pnpm run start
```

**Run Linter:**
```bash
npx pnpm run lint
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <i>Built with ❤️ for the AI & open-source community.</i>
</div>
