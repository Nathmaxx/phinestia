
type MessageProps = {
	message: string
	className?: string
}

const Message = ({ message, className }: MessageProps) => {
	return (
		message && (
			<div className={`w-full border border-orange-300 text-orange-800 bg-orange-50 rounded-md text-center ${className}`}>{message}</div>
		)
	)
}

export default Message