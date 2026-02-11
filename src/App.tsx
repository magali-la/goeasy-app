import { Route, Routes } from 'react-router'
import './index.css'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


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

				{/* TODO: authenticated user home */}
				<Route path='dashboard' element={<Dashboard/>}/>
			</Routes>
		</>
	)
}

export default App
