import { useState } from "react"
import Navbar from "./Components/Navbar.jsx"
import NewsBoard from "./Components/NewsBoard.jsx"

export const App = () => {
  const [category,setCategory]=useState("general");
  return (
    <div>
        <Navbar setCategory={setCategory}/>
        <NewsBoard category={category}/>
    </div>
  )
}
export default App


