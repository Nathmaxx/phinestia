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
					allocationUpdated: newAccount.allocationUpdated
				}
			])
			return { success: true, message: "Compte ajouté" }
		} catch (error) {
			return catchError(error, "Impossible d'ajouter le compte, veuillez réessayer plus tard")
		}
	}

	const fetchAccounts = useCallback(async () => {
		try {
			const response = await api.get(`/account/${userInfos.id}`)
			const accounts = response.data.accounts as DBAccount[]
			const formattedAccounts = accounts.map((account) => ({
				id: account._id,
				name: account.name,
				amount: account.amount,
				updatedAt: new Date(account.updatedAt),
				allocationUpdated: account.allocationUpdated
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

	const updateAccount = async (idAccount: string, name: string, amount: number) => {
		try {
			const response = await api.put(`/account/${idAccount}`, { name, amount })
			console.log(response)
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

	useEffect(() => {
		fetchAccounts()
	}, [fetchAccounts])


	const value = {
		accounts,
		addAccount,
		fetchAccounts,
		deleteAccount,
		updateAccount
	}

	return (
		<AccountContext.Provider value={value}>
			{children}
		</AccountContext.Provider>
	)
}