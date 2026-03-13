"use client"

import { useState } from "react"
import { Upload, FileJson, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const EXAMPLE_DATA = [
  {
    config: {
      client: {
        max_concurrency: 8,
        num_prompts: 1000,
        dataset_name: "sharegpt",
        sharegpt_output_len: 256,
      },
      server: {
        tensor_parallel_size: 1,
        max_num_batched_tokens: 4096,
        max_num_seqs: 16,
      },
      server_args: [
        "--tensor-parallel-size=1",
        "--max-num-batched-tokens=4096",
        "--max-num-seqs=16",
      ],
    },
    results: {
      backend: "vllm",
      dataset_name: "sharegpt",
      max_concurrency: 8,
      total_input_tokens: 296523,
      total_output_tokens: 256000,
      total_output_tokens_retokenized: 255910,
      request_throughput: 2.3237,
      input_throughput: 689.04,
      output_throughput: 594.87,
      mean_e2e_latency_ms: 3441.46,
      median_e2e_latency_ms: 3413.32,
      std_e2e_latency_ms: 130.48,
      p99_e2e_latency_ms: 4004.0,
      mean_ttft_ms: 85.23,
      median_ttft_ms: 78.45,
      std_ttft_ms: 32.12,
      p99_ttft_ms: 195.67,
      mean_tpot_ms: 13.12,
      median_tpot_ms: 12.85,
      std_tpot_ms: 2.34,
      p99_tpot_ms: 19.87,
      mean_itl_ms: 13.05,
      median_itl_ms: 12.78,
      std_itl_ms: 2.45,
      p99_itl_ms: 20.12,
    },
    cmd: "vllm serve meta-llama/Llama-3.1-8B-Instruct --host 127.0.0.1 --port 8000 --tensor-parallel-size=1 --max-num-batched-tokens=4096 --max-num-seqs=16",
  },
  {
    config: {
      client: {
        max_concurrency: 16,
        num_prompts: 1000,
        dataset_name: "sharegpt",
        sharegpt_output_len: 256,
      },
      server: {
        tensor_parallel_size: 2,
        max_num_batched_tokens: 8192,
        max_num_seqs: 32,
      },
      server_args: [
        "--tensor-parallel-size=2",
        "--max-num-batched-tokens=8192",
        "--max-num-seqs=32",
      ],
    },
    results: {
      backend: "vllm",
      dataset_name: "sharegpt",
      max_concurrency: 16,
      total_input_tokens: 296523,
      total_output_tokens: 256000,
      total_output_tokens_retokenized: 255880,
      request_throughput: 4.1205,
      input_throughput: 1221.5,
      output_throughput: 1054.8,
      mean_e2e_latency_ms: 3880.12,
      median_e2e_latency_ms: 3825.45,
      std_e2e_latency_ms: 198.34,
      p99_e2e_latency_ms: 4520.67,
      mean_ttft_ms: 112.45,
      median_ttft_ms: 102.33,
      std_ttft_ms: 45.67,
      p99_ttft_ms: 265.89,
      mean_tpot_ms: 14.78,
      median_tpot_ms: 14.25,
      std_tpot_ms: 3.12,
      p99_tpot_ms: 22.45,
      mean_itl_ms: 14.65,
      median_itl_ms: 14.12,
      std_itl_ms: 3.25,
      p99_itl_ms: 23.18,
    },
    cmd: "vllm serve meta-llama/Llama-3.1-8B-Instruct --host 127.0.0.1 --port 8000 --tensor-parallel-size=2 --max-num-batched-tokens=8192 --max-num-seqs=32",
  },
  {
    config: {
      client: {
        max_concurrency: 32,
        num_prompts: 1000,
        dataset_name: "sharegpt",
        sharegpt_output_len: 256,
      },
      server: {
        tensor_parallel_size: 4,
        max_num_batched_tokens: 16384,
        max_num_seqs: 64,
      },
      server_args: [
        "--tensor-parallel-size=4",
        "--max-num-batched-tokens=16384",
        "--max-num-seqs=64",
      ],
    },
    results: {
      backend: "vllm",
      dataset_name: "sharegpt",
      max_concurrency: 32,
      total_input_tokens: 296523,
      total_output_tokens: 256000,
      total_output_tokens_retokenized: 255795,
      request_throughput: 7.5612,
      input_throughput: 2241.3,
      output_throughput: 1934.5,
      mean_e2e_latency_ms: 4230.78,
      median_e2e_latency_ms: 4150.23,
      std_e2e_latency_ms: 310.56,
      p99_e2e_latency_ms: 5120.34,
      mean_ttft_ms: 145.67,
      median_ttft_ms: 132.45,
      std_ttft_ms: 58.9,
      p99_ttft_ms: 312.45,
      mean_tpot_ms: 16.45,
      median_tpot_ms: 15.89,
      std_tpot_ms: 4.23,
      p99_tpot_ms: 26.78,
      mean_itl_ms: 16.32,
      median_itl_ms: 15.78,
      std_itl_ms: 4.35,
      p99_itl_ms: 27.45,
    },
    cmd: "vllm serve meta-llama/Llama-3.1-8B-Instruct --host 127.0.0.1 --port 8000 --tensor-parallel-size=4 --max-num-batched-tokens=16384 --max-num-seqs=64",
  },
]

interface JsonInputProps {
  onDataLoaded: (data: Record<string, unknown>[]) => void
  hasData: boolean
  onClear: () => void
}

export function JsonInput({ onDataLoaded, hasData, onClear }: JsonInputProps) {
  const [rawInput, setRawInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  function handleParse() {
    try {
      const parsed = JSON.parse(rawInput)
      const arr = Array.isArray(parsed) ? parsed : [parsed]
      setError(null)
      setRawInput("")
      onDataLoaded(arr)
    } catch {
      setError("Invalid JSON. Please check your input and try again.")
    }
  }

  function handleLoadExample() {
    onDataLoaded(EXAMPLE_DATA)
    setRawInput("")
    setError(null)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === "application/json") {
      const reader = new FileReader()
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target?.result as string)
          const arr = Array.isArray(parsed) ? parsed : [parsed]
          setError(null)
          onDataLoaded(arr)
        } catch {
          setError("Invalid JSON file.")
        }
      }
      reader.readAsText(file)
    }
  }

  if (hasData) {
    return (
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="gap-2 border-border bg-secondary text-secondary-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
          Clear Data
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLoadExample}
          className="gap-2 border-border bg-secondary text-secondary-foreground hover:bg-muted"
        >
          <FileJson className="h-4 w-4" />
          Load Example
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        className={`relative rounded-lg border-2 border-dashed transition-colors ${
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border bg-card"
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Paste JSON or drop a .json file
              </p>
              <p className="text-xs text-muted-foreground">
                vLLM benchmark output format expected
              </p>
            </div>
          </div>
          <textarea
            className="min-h-[180px] w-full resize-y rounded-md border border-border bg-secondary p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder={`[\n  {\n    "config": { ... },\n    "results": { ... },\n    "cmd": "vllm serve ..."\n  }\n]`}
            value={rawInput}
            onChange={(e) => {
              setRawInput(e.target.value)
              setError(null)
            }}
          />
          {error && (
            <p className="mt-2 text-sm text-destructive">{error}</p>
          )}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleParse}
              disabled={!rawInput.trim()}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <FileJson className="h-4 w-4" />
              Parse & Visualize
            </Button>
            <Button
              variant="outline"
              onClick={handleLoadExample}
              className="gap-2 border-border bg-secondary text-secondary-foreground hover:bg-muted"
            >
              Load Example Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
