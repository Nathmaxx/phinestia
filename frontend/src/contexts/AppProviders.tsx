
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";
import { AccountProvider } from "./AccountContext";

type AppProvidersProps = {
	children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
	return (
		<AuthProvider>
			<AccountProvider>
				<CategoryProvider>
					{children}
				</CategoryProvider>
			</AccountProvider>
		</AuthProvider>
	)
}

export default AppProviders