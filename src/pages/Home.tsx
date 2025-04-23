import { useState } from "react"
import TextInput from "../components/TextInput"
import SubmitButton from "../components/SubmitButton"


const Home = () => {

	const [text, setText] = useState("")

	return (
		<form
			className="w-[350px]"
		>
			<TextInput
				value={text}
				setValue={setText}
			/>
			<SubmitButton>Valider</SubmitButton>
		</form>
	)
}

export default Home