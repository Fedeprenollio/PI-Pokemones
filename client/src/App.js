import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import  LandinPage  from "./componentes/LandinPage";
import Home from "./componentes/Home";
import { Nav } from "./componentes/Nav";

// const Layout = () => <h1>Probando</h1>

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <div className="App">
        <Routes>
        {/* <Route path="/" element={<Layout />}></Route> */}
          <Route exact path ="/" element={<LandinPage/>} />
          <Route path ="/pokemons" element={<Home/>} /> 
          <Route path="*" element={<h1>404 not found</h1>}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
