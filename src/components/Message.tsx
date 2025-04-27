
type MessageProps = {
	message: string
}

const Message = ({ message }: MessageProps) => {
	return (
		message && (
			<div className="w-full border border-orange-300 rounded-md text-center ">{message}</div>
		)
	)
}

export default Message