import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Navbar from "./components/navbar"
import Home from "./pages/home"
import Problems from "./pages/problems"
import About from "./pages/about"
import Problem from "./pages/problem"

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/problems' element={<Problems/>} />
          <Route path='/about' element={<About/>} />

          /* Problem routes */

          <Route path='/problem/:id' element={<Problem/>} />
          <Route path='/problem/:id/description' element={<Problem/>} />
          <Route path='/problem/:id/hints' element={<Problem/>} />
          <Route path='/problem/:id/submissions' element={<Problem/>} />
          <Route path='/problem/:id/solution' element={<Problem/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
