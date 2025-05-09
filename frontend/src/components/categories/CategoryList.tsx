import { Category } from "../../types/categories"

type CategoryListProps = {
	categories: Category[]
}

const CategoryList = ({ categories }: CategoryListProps) => {
	return (
		<div className="">
			<h2 className="font-bricolage text-sky-dark-violet text-2xl font-semibold">Catégories</h2>
			<ul>
				{categories.map((category) => {
					return <li key={category.name}>{category.name}</li>
				})}
			</ul>
		</div>
	)
}

export default CategoryList