import React, { useState } from "react";
import { formatEuro, formatPercentage } from "../../utils/format";

type DonutChartProps = {
	radius?: number;
	thickness?: number;
	data: { label: string; value: number; color: string }[];
	animate?: boolean;
};

const DonutChart = ({
	radius = 100,
	thickness = 30,
	data,
	animate = true,
}: DonutChartProps) => {
	const [activeSegment, setActiveSegment] = useState<number | null>(null);
	const [isAnimated, setIsAnimated] = useState(false);

	const total = data.reduce((sum, d) => sum + d.value, 0);
	let cumulative = 0;

	React.useEffect(() => {
		if (animate) {
			setIsAnimated(true);
		}
	}, [animate]);

	const createArcPath = (
		startAngle: number,
		endAngle: number,
		isActive = false
	): string => {
		// Calcul de l'expansion pour l'effet au survol
		const expansionOffset = isActive ? 7 : 0;
		const outerRadius = radius + expansionOffset;

		const start = polarToCartesian(radius, radius, outerRadius, endAngle);
		const end = polarToCartesian(radius, radius, outerRadius, startAngle);
		const innerStart = polarToCartesian(
			radius,
			radius,
			radius - thickness,
			endAngle
		);
		const innerEnd = polarToCartesian(
			radius,
			radius,
			radius - thickness,
			startAngle
		);

		const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

		// Créer un path pour un anneau au lieu d'une tranche pleine
		return [
			`M ${start.x} ${start.y}`,
			`A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
			`L ${innerEnd.x} ${innerEnd.y}`,
			`A ${radius - thickness} ${radius - thickness
			} 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
			"Z",
		].join(" ");
	};

	const polarToCartesian = (
		cx: number,
		cy: number,
		r: number,
		angleInDegrees: number
	) => {
		const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
		return {
			x: cx + r * Math.cos(angleInRadians),
			y: cy + r * Math.sin(angleInRadians),
		};
	};

	const segments = data.map((entry, i) => {
		const startAngle = (cumulative / total) * 360;
		cumulative += entry.value;
		const endAngle = (cumulative / total) * 360;
		const isActive = activeSegment === i;

		const strokeWidth = isActive ? 2 : 0;
		const strokeColor = "white";

		return (
			<path
				key={i}
				d={createArcPath(startAngle, endAngle, isActive)}
				fill={entry.color}
				stroke={strokeColor}
				strokeWidth={strokeWidth}
				onMouseEnter={() => setActiveSegment(i)}
				onMouseLeave={() => setActiveSegment(null)}
				className="transition-all duration-200 ease-in-out cursor-pointer"
				style={{
					opacity: activeSegment === null || activeSegment === i ? 1 : 0.6,
					filter: isActive ? "drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))" : "",
					transform: isAnimated ? "scale(1)" : "scale(0)",
					transformOrigin: "center",
					transition: `transform ${300 + i * 100}ms ease-out, 
						opacity 200ms ease-in-out, 
						filter 200ms ease-in-out`
				}}
			/>
		);
	});

	// Contenu du centre du donut
	const getCenterContent = () => {
		if (activeSegment !== null) {
			const entry = data[activeSegment];
			return (
				<g>
					{/* Fond de couleur légère pour le texte central */}
					<circle
						cx={radius}
						cy={radius}
						r={radius - thickness - 5}
						fill={`${data[activeSegment].color}`}
						className="transition-all duration-300 opacity-15"
					/>

					{/* Texte pour l'étiquette */}
					<text
						x={radius}
						y={radius - 20}
						textAnchor="middle"
						dominantBaseline="middle"
						fill="#333"
						fontWeight="bold"
						fontSize="18"
						className="transition-all duration-200"
					>
						{entry.label}
					</text>

					{/* Texte pour la valeur */}
					<text
						x={radius}
						y={radius + 5}
						textAnchor="middle"
						dominantBaseline="middle"
						fill="#555"
						fontSize="18"
						fontWeight="500"
						className="transition-all duration-200"
					>
						{formatEuro(entry.value)}
					</text>

					{/* Texte pour le pourcentage */}
					<text
						x={radius}
						y={radius + 25}
						textAnchor="middle"
						dominantBaseline="middle"
						fill="#777"
						fontSize="14"
						className="transition-all duration-200"
					>
						{formatPercentage(entry.value, total)}
					</text>
				</g>
			);
		} else {
			return (
				<g>
					<text
						x={radius}
						y={radius - 10}
						textAnchor="middle"
						dominantBaseline="middle"
						fill="#333"
						fontSize="18"
						fontWeight="bold"
					>
						Total
					</text>
					<text
						x={radius}
						y={radius + 15}
						textAnchor="middle"
						dominantBaseline="middle"
						fill="#666"
						fontSize="16"
					>
						{formatEuro(total)}
					</text>
				</g>
			);
		}
	};

	return (
		<div className="font-figtree">
			<div className="w-full flex justify-center">
				<svg
					width={radius * 2}
					height={radius * 2}
					className="overflow-visible"
					viewBox={`0 0 ${radius * 2} ${radius * 2}`}
					preserveAspectRatio="xMidYMid meet"
				>
					{/* Rendu des segments */}
					{segments}

					{/* Cercle central pour les informations */}
					<circle
						cx={radius}
						cy={radius}
						r={radius - thickness}
						fill="white"
						className="transition-all duration-300"
					/>

					{/* Contenu du centre (informations) */}
					{getCenterContent()}
				</svg>
			</div>

			{/* Légende en dehors du SVG */}
			<div className="grid grid-cols-4 mt-6 gap-2">
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
		</div>
	);
};

export default DonutChart;