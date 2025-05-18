import { useState } from 'react';
import SubmitButton from '../buttons/SubmitButton';
import Message from '../Message';
import TextInput from '../Inputs/TextInput';
import { useAccount } from '../../hooks/useAccountContext';

type AddCategoryProps = {
	className?: string
	accountId: string
}

const AddCategory = ({ className = "", accountId }: AddCategoryProps) => {

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [message, setMessage] = useState('');


	const { addCategory } = useAccount()


	// Validation des champs
	const validateName = (value: string) => {
		setName(value);
		if (!value.trim()) {
			setNameError('Le nom de la catégorie est requis');
			return false;
		} else if (value.trim().length < 2) {
			setNameError('Le nom doit contenir au moins 2 caractères');
			return false;
		} else if (value.trim().length > 30) {
			setNameError('Le nom ne doit pas dépasser 30 caractères');
			return false;
		} else {
			setNameError('');
			return true;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (name === "") {
			return
		}

		if (!validateName(name)) {
			return;
		}

		const response = await addCategory(accountId, name)
		if (!response.success) {
			setMessage(response.message)
			setTimeout(() => setMessage(""), 3000)
			return
		}
		setMessage('Catégorie créée avec succès');
		setName('');
		setTimeout(() => setMessage(''), 3000);
	};

	return (
		<div className={`w-full font-figtree ${className}`}>
			<h2 className="text-2xl font-bricolage font-semibold text-sky-dark-violet mb-3 text-center">
				Ajouter une catégorie
			</h2>

			<form onSubmit={handleSubmit} className="space-y-3">

				<label htmlFor="name" className="block text-gray-700 font-medium mb-1">
					Nom de la catégorie
				</label>
				<TextInput
					value={name}
					id='name'
					setValue={validateName}
					placeholder="Ex: Alimentation, Loisirs..."
				/>
				{nameError && (
					<p className="text-red-500 text-sm mt-1">{nameError}</p>
				)}

				<SubmitButton>
					Ajouter
				</SubmitButton>


				<Message message={message} />
			</form>
		</div>
	)
}

export default AddCategory