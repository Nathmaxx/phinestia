
import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const Layout = () => {
	return (
		<div className="">
			<nav className="flex gap-5 absolute">
				<Link to={'/dashboard'}>Dashboard</Link>
				<Link to={'/profil'}>Profil</Link>
				<Link to={'/comptes'}>Comptes</Link>
				<Link to={'/transactions'}>Transactions</Link>
			</nav>

			<main className="pt-8">
				<Outlet />
			</main>
			<ToastContainer aria-label="Notifications" />
		</div>
	)
}

export default Layout