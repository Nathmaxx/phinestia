import { ReactNode, useCallback, useEffect, useState } from "react"
import api from "../utils/axios"
import { catchError } from "../utils/error"
import { useAuth } from "../hooks/useAuthContext"
import { AccountContext } from "../hooks/useAccountContext"
import { Account, DBAccount } from "../types/accounts"


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

	const addAccount = async (name: string, amount: number) => {
		try {
			const response = await api.post(`/account/add`, { name, amount, userId: userInfos.id })
			const newAccount = response.data.account as DBAccount
			setAccounts([
				...accounts,
				{
					id: newAccount._id,
					name: newAccount.name,
					amount: newAccount.amount,
					updatedAt: new Date(newAccount.updatedAt),
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
				updatedAt: new Date(account.updatedAt),
				categories: account.categories ? account.categories.map(cat => ({
					name: cat.name,
					budget: cat.budget,
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

	const deleteAccount = async (idAccount: string) => {
		try {
			await api.delete(`/account/${idAccount}`)
			const newAccounts = accounts.filter(account => account.id !== idAccount)
			setAccounts(newAccounts)
			return { success: true, message: "Compte supprimé" }
		} catch (error) {
			return catchError(error, "Impossible de supprimer le compte")
		}
	}

	const updateAccountInfos = async (idAccount: string, name: string, amount: number) => {
		try {
			await api.put(`/account/${idAccount}`, { name, amount })
			const accountsUpdated = accounts.map((account) => {
				return account.id === idAccount ? {
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

	const addCategory = async (accountId: string, name: string) => {
		try {
			const response = await api.post(`/account/category/${accountId}`, { name })
			const newCategory = response.data.category
			const updatedAccounts = accounts.map(account => {
				if (account.id === accountId) {
					return {
						...account,
						categories: [
							...account.categories,
							{
								name: newCategory.name,
								budget: null,
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
		addCategory
	}

	return (
		<AccountContext.Provider value={value}>
			{children}
		</AccountContext.Provider>
	)
}