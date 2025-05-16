"use client"
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

	const total = data.reduce((acc, cur) => acc + cur.value, 0)

	return (
		<div className="w-full flex flex-col items-center">
			<ChartContainer config={chartConfig} className="h-[300px]">
				<BarChart
					accessibilityLayer
					data={data}
					margin={{
						top: 20,
					}}
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
					<Bar dataKey="value" fill="var(--color-desktop)" radius={4}>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.color}
								className="transition-colors duration-200"
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
			<div className="grid grid-cols-4 mt-6 gap-2">
				{data.map((entry, i) => (
					<div
						key={`legend-${i}`}
						className={`flex items-center gap-1.5 cursor-pointer transition-all duration-200 px-2 py-1 rounded-md 
							}`}
					//onMouseEnter={() => setActiveSegment(i)}
					//onMouseLeave={() => setActiveSegment(null)}
					// ${activeSegment === i ? 'bg-gray-100' : 'hover:bg-gray-50'
					>
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-sm">
							{entry.label} ({formatPercentage(entry.value, total)})
						</span>
					</div>
				))}
			</div>
		</div>

	)
}

export default LabelBarChart