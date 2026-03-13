"use client"

import { useState, useMemo } from "react"
import { Activity } from "lucide-react"
import { JsonInput } from "@/components/json-input"
import { MetricCards } from "@/components/metric-cards"
import { FilterBar, applyFilters, type FilterRule } from "@/components/filter-bar"
import { ResultsTable } from "@/components/results-table"
import { ConfigPanel } from "@/components/config-panel"
import { ComparisonChart } from "@/components/comparison-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BenchmarkDashboard() {
  const [rawData, setRawData] = useState<Record<string, unknown>[]>([])
  const [filters, setFilters] = useState<FilterRule[]>([])

  const filteredData = useMemo(() => {
    return applyFilters(rawData, filters)
  }, [rawData, filters])

  const hasData = rawData.length > 0

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                vLLM Benchmark Viewer
              </h1>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Visualize and compare inference benchmark results
              </p>
            </div>
          </div>
          <JsonInput
            onDataLoaded={(d) => {
              setRawData(d)
              setFilters([])
            }}
            hasData={hasData}
            onClear={() => {
              setRawData([])
              setFilters([])
            }}
          />
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center gap-8 py-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                  Load Benchmark Results
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Paste your vLLM benchmark JSON output to get started
                </p>
              </div>
            </div>
            <div className="w-full max-w-2xl">
              <JsonInput
                onDataLoaded={(d) => {
                  setRawData(d)
                  setFilters([])
                }}
                hasData={false}
                onClear={() => {
                  setRawData([])
                  setFilters([])
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Metrics Overview */}
            <MetricCards data={filteredData} />

            {/* Filter Bar */}
            <FilterBar
              data={rawData}
              filters={filters}
              onFiltersChange={setFilters}
            />

            {/* Filtered count */}
            {filters.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredData.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {rawData.length}
                </span>{" "}
                results
              </p>
            )}

            {/* Tabs: Table / Config */}
            <Tabs defaultValue="table">
              <TabsList className="bg-secondary">
                <TabsTrigger
                  value="table"
                  className="text-secondary-foreground data-[state=active]:bg-card data-[state=active]:text-foreground"
                >
                  Results Table
                </TabsTrigger>
                <TabsTrigger
                  value="compare"
                  className="text-secondary-foreground data-[state=active]:bg-card data-[state=active]:text-foreground"
                >
                  Compare
                </TabsTrigger>
                <TabsTrigger
                  value="config"
                  className="text-secondary-foreground data-[state=active]:bg-card data-[state=active]:text-foreground"
                >
                  Config Overview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <ResultsTable data={filteredData} />
              </TabsContent>
              <TabsContent value="compare">
                <ComparisonChart data={filteredData} />
              </TabsContent>
              <TabsContent value="config">
                <ConfigPanel data={filteredData} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  )
}
