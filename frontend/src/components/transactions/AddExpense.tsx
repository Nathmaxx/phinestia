import { useEffect, useRef, useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import TextInput from "../Inputs/TextInput";
import { Calendar } from "../ui/calendar";
import { formatDate } from "@/utils/format";
import Select from "../Select";
import { updateAmount } from "@/utils/validation";
import { useAccount } from "@/hooks/useAccountContext";

type AddExpenseProps = {
	className?: string
	accountName: string
}

const AddExpense = ({ accountName, className = "" }: AddExpenseProps) => {

	const { accounts } = useAccount()



	const getAccountCategories = () => {
		const targetAccount = accounts.find(account => account.name === accountName);

		if (targetAccount) {
			return targetAccount.categories.map(category => ({
				name: category.name,
				id: category.id
			}));
		}

		return [];
	};

	const accountCategories = getAccountCategories();

	const categories = [{ name: "Sélectionner une catégorie", id: "" }, ...accountCategories]

	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<{ name: string, id: string }>(categories[0]);

	const calendarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(event.target as Node) &&
				isCalendarOpen
			) {
				setIsCalendarOpen(false);
			}
		};

		if (isCalendarOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isCalendarOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

	};

	return (
		<div className={`bg-white rounded-xl shadow-md p-3 font-figtree w-full ${className}`}>
			<h2 className="text-2xl font-semibold font-bricolage text-sky-dark-violet mb-5">
				Ajouter une dépense
			</h2>

			<form onSubmit={handleSubmit} className="space-y-2">
				<div className="space-y-1">
					<label className="block text-sm font-medium text-gray-700">
						Titre
						<span className="text-red-700 ml-0.5">*</span>
					</label>
					<TextInput
						value={title}
						setValue={setTitle}
					/>
				</div>

				<div className="space-y-1">
					<label className="block text-sm font-medium text-gray-700">
						Montant
						<span className="text-red-700 ml-0.5">*</span>
					</label>
					<div className="relative">
						<TextInput
							value={amount}
							setValue={(v) => updateAmount(v, setAmount)}
							placeholder="0.00"
							className=""
						/>
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
							€
						</span>
					</div>
				</div>

				<div className="space-y-1">
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

				<div className="space-y-1">
					<label className="block text-sm font-medium text-gray-700">
						Date
						<span className="text-red-700 ml-0.5">*</span>
					</label>
					<div className="relative z-20" ref={calendarRef}>
						<button
							type="button"
							className="w-full flex items-center justify-between px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 "
							onClick={() => setIsCalendarOpen(!isCalendarOpen)}
						>
							<span>{selectedDate ? formatDate(selectedDate) : "Sélectionner une date"}</span>
							<CalendarIcon size={18} className="text-gray-500" />
						</button>

						{isCalendarOpen && (
							<Calendar
								mode="single"
								selected={selectedDate}
								onSelect={setSelectedDate}
								className="rounded-md border absolute bg-white"
								classNames={{
									day_selected: "bg-sky-dark-violet text-white hover:bg-sky-dark-violet hover:text-white focus:bg-sky-dark-violet focus:text-white",
									caption_label: "text-sky-dark-violet font-semibold",
								}}
							/>
						)}
					</div>
				</div>

				<div className="space-y-1">
					<label className="block text-sm font-medium text-gray-700">
						Catégorie
						<span className="text-red-700 ml-0.5">*</span>
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
					className="w-full flex items-center justify-center py-1 mt-4 rounded-md font-medium bg-sky-dark-violet text-white hover:bg-sky-dark-violet/90 focus:outline-none focus:ring-2 focus:ring-sky-dark-violet/30 disabled:opacity-50 transition-colors"
					disabled={!title || !amount || selectedCategory.id === "" || !selectedDate}
				>
					<Plus size={18} className="mr-2" />
					Ajouter la dépense
				</button>
			</form>
		</div>
	);
};

export default AddExpense;