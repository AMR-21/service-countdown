import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { DAYS } from "@/lib/constants";
import { getPlurality } from "@/lib/utils";

const chartConfig = {
  passed: {
    label: "passed",
  },
} satisfies ChartConfig;

export function RadialChart({
  passed,
  duration,
}: {
  passed: number;
  duration: number;
}) {
  const [swap, setSwap] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setSwap((s) => !s), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <RadialBarChart
        data={[{ passed }]}
        startAngle={0}
        endAngle={(passed / duration) * 360}
        barSize={16}
        innerRadius={94}
        outerRadius={124}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[100, 88]}
        />
        <RadialBar dataKey="passed" background cornerRadius={0} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="relative"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-6xl transition-x-40"
                    >
                      {swap
                        ? passed
                        : Math.round((passed / duration) * 100) + "%"}
                    </tspan>
                    {swap && (
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 48}
                        className="fill-muted-foreground text-xl"
                      >
                        {DAYS.at(getPlurality(passed))}
                      </tspan>
                    )}
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
