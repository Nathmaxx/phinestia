
type LoadingSpinnerProps = {
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	color?: string;
};

const LoadingSpinner = ({
	className = "",
	size = "md",
	color = "text-sky-dark-violet"
}: LoadingSpinnerProps) => {

	// Définir les tailles
	const sizeClasses = {
		sm: "w-5 h-5",
		md: "w-8 h-8",
		lg: "w-12 h-12"
	};

	return (
		<div className={`flex justify-center items-center ${className}`}>
			<div className={`animate-spin rounded-full border-t-2 border-b-2 ${color} ${sizeClasses[size]}`}></div>
		</div>
	);
};

export default LoadingSpinner;