import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import  LandinPage  from "./componentes/LandinPage";
import Home from "./componentes/Home"; 
//import { Nav } from "./componentes/Nav";
import Creation from "./componentes/Creation"
import { Detail } from "./componentes/Detail";
import {UpdatePoke} from "./componentes/UpdatePoke"
//import { Delete } from "./componentes/Delete";

// const Layout = () => <h1>Probando</h1>

function App() {
  return (
    <BrowserRouter>
   
      <div className="App">
        <Routes>
        {/* <Route path="/" element={<Layout />}></Route> */}
          <Route exact path ="/" element={<LandinPage/>} />
          <Route path ="/home" element={<Home/>} /> 
          <Route path ="/home/:id" element={<Detail/>} /> 
          <Route path ="/created" element={<Creation/>} /> 
          <Route path ="/update/:id" element={<UpdatePoke/>} />


          <Route path="*" element={<h1>404 not found</h1>}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
