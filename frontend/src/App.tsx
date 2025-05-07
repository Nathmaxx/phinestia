import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Authentication from './pages/Authentication';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Accounts from './pages/Accounts';
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';

function App() {

	return (
		<Router>
			<Routes>
				<Route index element={<Navigate to="/authentification/connexion" replace />} />
				<Route path='reset-password/:id' element={<ResetPassword />} />
				<Route path="authentification">
					<Route index element={<Navigate to="/authentification/connexion" replace />} />
					<Route path="connexion" element={<Authentication method="login" />} />
					<Route path="inscription" element={<Authentication method="signin" />} />
				</Route>

				<Route element={<Layout />}>
					<Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
					<Route path='/profil' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
					<Route path='/comptes' element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
					<Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
					<Route path='/transactions' element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
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
