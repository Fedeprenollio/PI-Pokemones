import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import  LandinPage  from "./componentes/LandinPage";
import Home from "./componentes/Home"; 
//import { Nav } from "./componentes/Nav";
import Creation from "./componentes/Creation"
import { Detail } from "./componentes/Detail";





function App() {
  return (
    <BrowserRouter>
   
      <div className="App">
        <Routes>
       
          <Route exact path ="/" element={<LandinPage/>} />
          <Route path ="/home" element={<Home/>} /> 
          <Route path ="/home/:id" element={<Detail/>} /> 
          <Route path ="/created" element={<Creation/>} /> 
         


          <Route path="*" element={<h1>404 not found</h1>}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
