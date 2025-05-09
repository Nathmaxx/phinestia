import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import ProtectedLayout from './components/protected-layout/ProtectedLayout';

function App() {

	return (
		<Router>
			<Routes>
				<Route path='reset-password/:id' element={<ResetPassword />} />
				<Route path="authentification">
					<Route index element={<Navigate to="/authentification/connexion" replace />} />
					<Route path="connexion" element={<Authentication method="login" />} />
					<Route path="inscription" element={<Authentication method="signin" />} />
				</Route>

				<Route element={<ProtectedLayout />}>
					<Route index element={<Navigate to="dashboard" replace />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='profil' element={<Profile />} />
					<Route path='comptes'>
						<Route index element={<Accounts />} />
						<Route path=':compte' element={<Accounts />} />
					</Route>
					<Route path='transactions' element={<Transactions />} />
				</Route>

				{/* Route 404 */}
				<Route path="*" element={
					<div className="text-center py-10">
						<h2 className="text-2xl font-bold">404 - Page non trouvée</h2>
						<p className="mt-2">La page que vous recherchez n'existe pas.</p>
					</div>
				} />
			</Routes>
		</Router>
	)
}

export default App
