"use client"
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts"
import {
	ChartConfig,
	ChartContainer,
} from "@/components/ui/chart"
import ChartCategories from "../categories/ChartCategories";

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

			<ChartCategories
				activeSegment={activeIndex}
				data={data}
				setActiveSegment={setActiveIndex}
				total={total}
			/>
		</div>
	);
};

export default LabelBarChart;