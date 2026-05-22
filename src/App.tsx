import { Route, Routes, useLocation } from 'react-router'
import './index.css'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './routes/ProtectedRoute'
import NavBar from './components/NavBar'
import Trips from './pages/Trips'
import TripDetail from './pages/TripDetail'
import Explore from './pages/Explore'
import ExploreCity from './pages/ExploreCity'
import Footer from './components/Footer'
import { useScrollRestoration } from './hooks/useScrollRestoration'
import { PageTransition } from './layout/PageTransition'

function App() {
	// scroll poosition restore, cann the hook
	useScrollRestoration();
	// need location for animate presence to work
	const location = useLocation();
	
	return (
		<>
			<NavBar/>
			<PageTransition>
				{/* key is needed to override default react router behavior and rebuild the route tree so animate presence can capture the prev page component for the exit animation */}
				<Routes location={location} key={location.pathname}>
					{/* Landing page */}
					<Route index element={<Landing/>}/>
					{/* signup */}
					<Route path='signup' element={<Signup/>}/>
					{/* login */}
					<Route path='login' element={<Login/>}/>
					{/* protected routes */}
					<Route element={<ProtectedRoute/>}>
						{/* authenticated home */}
						<Route path='home' element={<Dashboard/>}/>
						{/* trips routes */}
						<Route path='trips'>
							<Route index element={<Trips/>} />
							<Route path=':tripId' element={<TripDetail/>} />
						</Route>
						{/* explore routes */}
						<Route path='explore'>
							<Route index element={<Explore/>} />
							<Route path=':cityId' element={<ExploreCity/>} />
						</Route>
					</Route>
				</Routes>
			</PageTransition>
			<Footer/>
		</>
	)
}

export default App
