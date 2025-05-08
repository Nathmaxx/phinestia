
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { AccountProvider } from "./AccountContext";

type AppProvidersProps = {
	children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
	return (
		<AuthProvider>
			<AccountProvider>
				{children}
			</AccountProvider>
		</AuthProvider>
	)
}

export default AppProviders