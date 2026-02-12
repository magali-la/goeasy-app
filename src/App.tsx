import { Route, Routes } from 'react-router'
import './index.css'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './routes/ProtectedRoute'


function App() {
	return (
		<>
			<Routes>
				{/* Landing page */}
				<Route index element={<Landing/>}/>

				{/* signup */}
				<Route path='signup' element={<Signup/>}/>

				{/* login */}
				<Route path='login' element={<Login/>}/>

				{/* authenticated home */}
				<Route element={<ProtectedRoute/>}>
					<Route path='home' element={<Dashboard/>}/>
				</Route>
			</Routes>
		</>
	)
}

export default App
