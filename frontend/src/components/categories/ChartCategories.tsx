import { ChartData } from "@/types/charts"
import { formatPercentage } from "@/utils/format"

type ChartCategoriesProps = {
	data: ChartData[]
	setActiveSegment: (value: number | null) => void
	total: number
	activeSegment: number | null
}

const ChartCategories = ({ data, setActiveSegment, activeSegment, total }: ChartCategoriesProps) => {
	return (
		<div className="grid grid-cols-4 mt-6 gap-2 w-full">
			{data.map((entry, i) => (
				<div
					key={`legend-${i}`}
					className={`flex items-center gap-1.5 cursor-pointer transition-all duration-200 px-2 py-1 rounded-md ${activeSegment === i ? 'bg-gray-100' : 'hover:bg-gray-50'
						}`}
					onMouseEnter={() => setActiveSegment(i)}
					onMouseLeave={() => setActiveSegment(null)}
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
	)
}

export default ChartCategories