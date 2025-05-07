import { useState } from 'react';
import SubmitButton from '../components/buttons/SubmitButton';
import Message from '../components/Message';
import TextInput from '../components/Inputs/TextInput';

const Categories = () => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [message, setMessage] = useState('');

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateName(name)) {
			return;
		}

		setMessage('Catégorie créée avec succès');

		setName('');

		setTimeout(() => setMessage(''), 3000);
	};

	return (
		<div className="w-full h-screen py-8 flex flex-col items-center bg-sky-semiviolet/5">
			<div className="bg-white p-4 rounded-lg shadow-md w-[400px] font-figtree">
				<h1 className="text-2xl font-bricolage font-semibold text-sky-dark-violet mb-3">
					Ajouter une catégorie
				</h1>

				<form onSubmit={handleSubmit} className="space-y-3">
					<div>
						<label htmlFor="name" className="block text-gray-700 font-medium mb-1">
							Nom de la catégorie
						</label>
						<TextInput
							value={name}
							setValue={validateName}
							placeholder="Ex: Alimentation, Loisirs..."
						/>
						{nameError && (
							<p className="text-red-500 text-sm mt-1">{nameError}</p>
						)}
					</div>

					<SubmitButton>
						Créer la catégorie
					</SubmitButton>

					{message && (
						<Message message={message} />
					)}
				</form>
			</div>
		</div>
	);
};

export default Categories;