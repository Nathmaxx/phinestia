
import { Link, Outlet } from "react-router-dom"

const Layout = () => {
	return (
		<div>
			<nav className="flex gap-5 absolute">
				<Link to={'/dashboard'}>Dashboard</Link>
				<Link to={'/profil'}>Profil</Link>
				<Link to={'/comptes'}>Comptes</Link>
				<Link to={'/transactions'}>Transactions</Link>
			</nav>

			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout