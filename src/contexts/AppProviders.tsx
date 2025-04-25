
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

type AppProvidersProps = {
	children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	)
}

export default AppProviders