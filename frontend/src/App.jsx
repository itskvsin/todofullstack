import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register" 
import {BrowserRouter, Routes, Route} from "react-router"

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
