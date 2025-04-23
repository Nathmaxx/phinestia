import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					{/* <Route path="add-expense" element={<ExpenseFormPage />} /> */}


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
