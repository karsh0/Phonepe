import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import { ContactPage } from "./pages/contacts/ContactsPage"

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/contacts" element={<ContactPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
