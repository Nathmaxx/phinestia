import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Authentication from './pages/Authentication';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='reset-password/:id' element={<ResetPassword />} />
					<Route path="authentification">
						<Route index element={<Navigate to="/authentification/connexion" replace />} />
						<Route path="connexion" element={<Authentication method="login" />} />
						<Route path="inscription" element={<Authentication method="signin" />} />
					</Route>

					<Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
					<Route path='/profil' element={<ProtectedRoute><Profile /></ProtectedRoute>} />


					{/* Route 404 */}
					<Route path="*" element={
						<div className="text-center py-10">
							<h2 className="text-2xl font-bold">404 - Page non trouvée</h2>
							<p className="mt-2">La page que vous recherchez n'existe pas.</p>
						</div>
					} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App
