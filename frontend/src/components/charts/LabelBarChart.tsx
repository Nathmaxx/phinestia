"use client"
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts"
import {
	ChartConfig,
	ChartContainer,
} from "@/components/ui/chart"
import { formatPercentage } from "@/utils/format"

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig

type LabelBarChartProps = {
	data: { label: string, value: number, color: string }[]
}

const LabelBarChart = ({ data }: LabelBarChartProps) => {
	// État pour suivre l'élément survolé
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const total = data.reduce((acc, cur) => acc + cur.value, 0);

	return (
		<div className="w-full flex flex-col items-center">
			<ChartContainer config={chartConfig} className="h-[300px]">
				<BarChart
					accessibilityLayer
					data={data}
					margin={{
						top: 20,
					}}
					onMouseLeave={() => setActiveIndex(null)}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="label"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => (
							value.length > 12 ? value.slice(0, 10) + "..." : value
						)}
					/>
					<Bar
						dataKey="value"
						radius={4}
						onMouseOver={(_, index) => setActiveIndex(index)}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.color}
								fillOpacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
								className="transition-all duration-200"
								cursor="pointer"
							/>
						))}
						<LabelList
							position="top"
							offset={12}
							className="fill-foreground"
							fontSize={12}
						/>
					</Bar>
				</BarChart>
			</ChartContainer>

			<div className="grid grid-cols-4 mt-6 gap-2 w-full">
				{data.map((entry, i) => (
					<div
						key={`legend-${i}`}
						className={`flex items-center gap-1.5 cursor-pointer transition-all duration-200 px-2 py-1 rounded-md 
						${activeIndex === i ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
						onMouseEnter={() => setActiveIndex(i)}
						onMouseLeave={() => setActiveIndex(null)}
					>
						<div
							className="w-3 h-3 rounded-full transition-transform duration-200"
							style={{
								backgroundColor: entry.color,
								transform: activeIndex === i ? 'scale(1.2)' : 'scale(1)'
							}}
						/>
						<span className="text-sm truncate">
							{entry.label} ({formatPercentage(entry.value, total)})
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default LabelBarChart;