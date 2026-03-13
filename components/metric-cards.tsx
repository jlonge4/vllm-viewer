"use client"

import { Zap, Clock, ArrowUpRight, ArrowDownRight, Hash } from "lucide-react"

interface MetricCardsProps {
  data: Record<string, unknown>[]
}

function formatNumber(value: unknown): string {
  if (typeof value !== "number") return String(value)
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`
  if (value % 1 !== 0) return value.toFixed(2)
  return String(value)
}

function getAggregateMetric(
  data: Record<string, unknown>[],
  key: string
): { avg: number; min: number; max: number } | null {
  const values: number[] = []
  for (const entry of data) {
    const results = entry.results as Record<string, unknown> | undefined
    if (results && typeof results[key] === "number") {
      values.push(results[key] as number)
    }
  }
  if (values.length === 0) return null
  return {
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
  }
}

const KEY_METRICS = [
  {
    key: "request_throughput",
    label: "Req Throughput",
    unit: "req/s",
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    key: "output_throughput",
    label: "Output Throughput",
    unit: "tok/s",
    icon: ArrowUpRight,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    key: "mean_e2e_latency_ms",
    label: "Avg E2E Latency",
    unit: "ms",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    key: "mean_ttft_ms",
    label: "Avg TTFT",
    unit: "ms",
    icon: ArrowDownRight,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    key: "total_input_tokens",
    label: "Total Input Tokens",
    unit: "tokens",
    icon: Hash,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
  {
    key: "total_output_tokens",
    label: "Total Output Tokens",
    unit: "tokens",
    icon: Hash,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
]

export function MetricCards({ data }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {KEY_METRICS.map((metric) => {
        const agg = getAggregateMetric(data, metric.key)
        if (!agg) return null
        const Icon = metric.icon
        return (
          <div
            key={metric.key}
            className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-md ${metric.bgColor}`}
              >
                <Icon className={`h-3.5 w-3.5 ${metric.color}`} />
              </div>
              <span className="text-xs text-muted-foreground">
                {metric.label}
              </span>
            </div>
            <div>
              <p className={`text-xl font-semibold tracking-tight ${metric.color}`}>
                {formatNumber(agg.avg)}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {metric.unit}
              </p>
            </div>
            {data.length > 1 && (
              <div className="flex gap-3 border-t border-border pt-2 text-[11px] text-muted-foreground">
                <span>
                  min{" "}
                  <span className="font-medium text-foreground">
                    {formatNumber(agg.min)}
                  </span>
                </span>
                <span>
                  max{" "}
                  <span className="font-medium text-foreground">
                    {formatNumber(agg.max)}
                  </span>
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
