
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";

type AppProvidersProps = {
	children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
	return (
		<AuthProvider>
			<CategoryProvider>
				{children}
			</CategoryProvider>
		</AuthProvider>
	)
}

export default AppProviders