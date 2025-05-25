
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { AccountProvider } from "./AccountProvider";
import { TransactionProvider } from "./TransactionProvider";

type AppProvidersProps = {
	children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
	return (
		<AuthProvider>
			<AccountProvider>
				<TransactionProvider>
					{children}
				</TransactionProvider>
			</AccountProvider>
		</AuthProvider>
	)
}

export default AppProviders