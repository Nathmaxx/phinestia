import { useState } from 'react';
import SubmitButton from '../components/buttons/SubmitButton';
import Message from '../components/Message';
import TextInput from '../components/Inputs/TextInput';
import { useAccount } from '../hooks/useAccountContext';
import Select from '../components/Select';
import { AccountName } from '../types/accounts';

const Categories = () => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [message, setMessage] = useState('');


	const { accountNames, addCategory } = useAccount()

	const [account, setAccount] = useState<AccountName>(accountNames[0])

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

		if (account.name === "" || account.id === "") {
			setMessage("Veuillez renseigner un compte valide")
		}

		if (!validateName(name)) {
			return;
		}

		const response = await addCategory(account.id, name)
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
		<div className="w-full h-screen flex flex-col items-center justify-center bg-sky-semiviolet/5">
			<div className="bg-white p-4 rounded-lg shadow-md w-[400px] font-figtree">
				<h1 className="text-2xl font-bricolage font-semibold text-sky-dark-violet mb-3">
					Ajouter une catégorie
				</h1>

				<form onSubmit={handleSubmit} className="space-y-3">
					<div>
						<label htmlFor="id" className="block text-gray-700 font-medium mb-1">
							Sélectionner le compte
						</label>
						<Select
							id='account'
							name='account'
							onChange={setAccount}
							options={accountNames}
							className='mb-3 w-full border focus:outline-none rounded-md border-gray-300 shadow-xs py-0.5 px-1.5 font-figtree'
						/>
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
					</div>

					<SubmitButton>
						Créer la catégorie
					</SubmitButton>


					<Message message={message} />
				</form>
			</div>
		</div>
	);
};

export default Categories;