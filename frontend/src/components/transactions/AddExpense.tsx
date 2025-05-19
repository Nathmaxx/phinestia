import { useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import TextInput from "../Inputs/TextInput";
import { Calendar } from "../ui/calendar";
import { formatDate } from "@/utils/format";
import Select from "../Select";


// Composant pour ajouter une dépense
const AddExpense = () => {

	const categories = [
		{ name: "Sélectionner une catégorie", id: "" },
		{ name: "Alimentation", id: "123" },
		{ name: "Transport", id: "456" },
		{ name: "Logement", id: "789" },
	]

	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<{ name: string, id: string }>(categories[0]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

	};

	return (
		<div className="bg-white rounded-xl shadow-md p-5 font-figtree w-full max-w-md mx-auto">
			<h2 className="text-2xl font-semibold font-bricolage text-sky-dark-violet mb-5">
				Ajouter une dépense
			</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Montant */}
				<div className="space-y-1.5">
					<label className="block text-sm font-medium text-gray-700">
						Montant
					</label>
					<div className="relative">
						<TextInput
							value={amount}
							setValue={setAmount}
							placeholder="0.00"
							className="pr-8 text-right font-medium"
							type="text"
						/>
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
							€
						</span>
					</div>
				</div>

				<div className="space-y-1.5">
					<label className="block text-sm font-medium text-gray-700">
						Description
					</label>
					<TextInput
						value={description}
						setValue={setDescription}
						placeholder="Description de la dépense"
						className="w-full"
					/>
				</div>

				<div className="space-y-1.5">
					<label className="block text-sm font-medium text-gray-700">
						Date
					</label>
					<div className="relative z-20">
						<button
							type="button"
							className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-dark-violet/30"
							onClick={() => setIsCalendarOpen(!isCalendarOpen)}
						>
							<span>{formatDate(selectedDate)}</span>
							<CalendarIcon size={18} className="text-gray-500" />
						</button>

						{isCalendarOpen && (
							<Calendar
								mode="single"
								selected={selectedDate}
								onSelect={setSelectedDate}
								className="rounded-md border absolute bg-white"
							/>
						)}
					</div>
				</div>

				<div className="space-y-1.5">
					<label className="block text-sm font-medium text-gray-700">
						Catégorie
					</label>
					<Select
						id="categories"
						name="categories"
						onChange={setSelectedCategory}
						options={categories}
						className="w-full border rounded-md outline-none py-1 px-2"
					/>
				</div>

				<button
					type="submit"
					className="w-full flex items-center justify-center py-2.5 px-4 rounded-md font-medium bg-sky-dark-violet text-white hover:bg-sky-dark-violet/90 focus:outline-none focus:ring-2 focus:ring-sky-dark-violet/30 disabled:opacity-50 transition-colors"
					disabled={!amount || !selectedCategory}
				>
					<Plus size={18} className="mr-2" />
					Ajouter la dépense
				</button>
			</form>
		</div>
	);
};

export default AddExpense;