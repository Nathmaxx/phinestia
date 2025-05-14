import { ReactNode, useCallback, useEffect, useState } from "react"
import api from "../utils/axios"
import { catchError } from "../utils/error"
import { useAuth } from "../hooks/useAuthContext"
import { AccountContext } from "../hooks/useAccountContext"
import { Account, DBAccount } from "../types/accounts"
import { UpdatedCategory } from "../types/categories"


type AccountProviderProps = {
	children: ReactNode
}

export const AccountProvider = ({ children }: AccountProviderProps) => {

	const { userInfos } = useAuth()

	const [accounts, setAccounts] = useState<Account[]>([])

	const accountNames = accounts.map(account => ({
		name: account.name,
		id: account.id
	}))

	// +-------------------------------------+
	// | Fonctions pour les comptes          | 
	// +-------------------------------------+

	const addAccount = async (name: string, amount: number) => {
		try {
			const response = await api.post(`/account/`, { name, amount, userId: userInfos.id })
			const newAccount = response.data.account as DBAccount
			setAccounts([
				...accounts,
				{
					id: newAccount._id,
					name: newAccount.name,
					amount: newAccount.amount,
					updatedAt: newAccount.updatedAt,
					categories: []
				}
			])
			return { success: true, message: "Compte ajouté" }
		} catch (error) {
			return catchError(error, "Impossible d'ajouter le compte, veuillez réessayer plus tard")
		}
	}

	const fetchAccounts = useCallback(async () => {

		if (!userInfos.id) {
			return { success: false, message: "Données manquantes" }
		}

		try {
			const response = await api.get(`/account/${userInfos.id}`)
			const accounts = response.data.accounts as DBAccount[]
			const formattedAccounts = accounts.map((account) => ({
				id: account._id,
				name: account.name,
				amount: account.amount,
				updatedAt: account.updatedAt,
				categories: account.categories ? account.categories.map(cat => ({
					id: cat._id,
					name: cat.name,
					amount: cat.amount,
					allocation: cat.allocation
				})) : []
			}))
			setAccounts(formattedAccounts)
			return { success: true, message: "Comptes récupérés" }
		} catch (error) {
			return catchError(error, "Impossible de récupérer les comptes")
		}
	}, [userInfos.id])

	const deleteAccount = async (accountId: string) => {

		if (!accountId) {
			return { success: false, message: "Données manquantes" }
		}

		try {
			await api.delete(`/account/${accountId}`)
			const newAccounts = accounts.filter(account => account.id !== accountId)
			setAccounts(newAccounts)
			return { success: true, message: "Compte supprimé" }
		} catch (error) {
			return catchError(error, "Impossible de supprimer le compte")
		}
	}

	const updateAccountInfos = async (accountId: string, name: string, amount: number) => {
		if (!accountId) {
			return { success: false, message: "Données manquantes" }
		}

		try {
			await api.put(`/account/${accountId}`, { name, amount })
			const accountsUpdated = accounts.map((account) => {
				return account.id === accountId ? {
					...account,
					name,
					amount
				} : account
			})
			setAccounts(accountsUpdated)
			return { success: true, message: "Compte modifié avec succès" }
		} catch (error) {
			return catchError(error, "Impossible de modifier le compte")
		}
	}

	const findAccount = (accountName: string) => {
		return accounts.find((account) => account.name === accountName) || null
	}

	// +-------------------------------------+
	// | Fonctions pour les catégories       | 
	// +-------------------------------------+

	const categoryNames = (accountName: string) => {
		const account = accounts.find(a => a.name === accountName)
		if (!account) {
			return null
		}

		return account.categories.map(category => {
			return {
				name: category.name,
				id: category.id
			}
		})
	}

	const addCategory = async (accountId: string, name: string) => {
		try {
			if (!accountId) {
				return { success: false, message: "Données manquantes" }
			}

			const response = await api.post(`/account/${accountId}/category`, { name })
			const newCategory = response.data.category
			const updatedAccounts = accounts.map(account => {
				if (account.id === accountId) {
					return {
						...account,
						categories: [
							...account.categories,
							{
								id: newCategory._id,
								name: newCategory.name,
								amount: null,
								allocation: null
							}
						]
					};
				}
				return account;
			});
			setAccounts(updatedAccounts);
			return { success: true, message: "Catégorie ajoutée avec succès" }
		} catch (error) {
			return catchError(error, "Impossible d'ajouter la catégorie")
		}
	}

	const updateCategoryName = async (accountId: string, categoryId: string, name: string) => {

		if (!accountId || !categoryId) {
			return { success: false, message: "Données manquantes" };
		}

		try {
			await api.put(`/account/${accountId}/category/${categoryId}`, { name })
			const updatedAccounts = accounts.map((account) => {
				if (account.id === accountId) {
					return {
						...account,
						categories: account.categories.map((category) => {
							if (category.id === categoryId) {
								return { ...category, name }
							}
							return category
						})
					}
				}
				return account
			})
			setAccounts(updatedAccounts)
			return { success: true, message: "Catégorie modifiée avec succès" }
		} catch (error) {
			return catchError(error, "Impossible de modifier la catégorie")
		}
	}

	const deleteCategory = async (accountId: string, categoryId: string) => {

		if (!accountId || !categoryId) {
			return { success: false, message: "Données manquantes" };
		}

		try {
			await api.delete(`/account/${accountId}/category/${categoryId}`)
			const updatedAccounts = accounts.map((account) => {
				if (account.id === accountId) {
					return {
						...account,
						categories: account.categories.filter((category) => category.id !== categoryId)
					}
				}
				return account
			})
			setAccounts(updatedAccounts)
			return { success: true, message: "Catégorie supprimée avec succès" }
		} catch (error) {
			return catchError(error, "Impossible de supprimer la catégorie")
		}
	}

	const updateCategoriesAmounts = async (accountid: string, updatedCategories: UpdatedCategory[]) => {

		if (!accountid || !updatedCategories) {
			return { success: false, message: "Données manquantes" }
		}

		try {
			const response = await api.put(`/account/${accountid}/category`, { updatedCategories })
			const newCategories = response.data.newCategories
			const updatedAccounts = accounts.map((account) => {
				if (account.id === accountid) {
					return {
						...account,
						categories: newCategories
					}
				}
				return { ...account }
			})
			setAccounts(updatedAccounts)

			return { success: true, message: "Montants mis à jour" }
		} catch (error) {
			return catchError(error, "Impossible de mettre à jour les montants")
		}
	}

	const categoryTransfert = async (accountid: string, initialCategoryId: string, finalCategoryId: string, amount: number) => {

		if (!initialCategoryId || !finalCategoryId) {
			return { success: false, message: "Données manquantes" }
		}

		try {
			const response = await api.put(`account/${accountid}/category/transfert`, { initialCategoryId, finalCategoryId, amount })
			const updatedAccount = response.data.account as DBAccount
			const updatedAccounts = accounts.map((account) => {
				if (account.id === accountid) {
					return {
						...updatedAccount,
						id: updatedAccount._id,
						categories: updatedAccount.categories.map((category) => {
							return {
								...category,
								id: category._id
							}
						})
					}
				}
				return { ...account }
			})
			setAccounts(updatedAccounts)
			return { success: true, message: "Transfert réalisé" }
		} catch (error) {
			return catchError(error, "Impossible de réaliser le transfert")
		}
	}


	useEffect(() => {
		fetchAccounts()
	}, [fetchAccounts])


	const value = {
		accounts,
		accountNames,
		addAccount,
		fetchAccounts,
		deleteAccount,
		updateAccountInfos,
		categoryNames,
		addCategory,
		findAccount,
		updateCategoryName,
		deleteCategory,
		updateCategoriesAmounts,
		categoryTransfert
	}

	return (
		<AccountContext.Provider value={value}>
			{children}
		</AccountContext.Provider>
	)
}