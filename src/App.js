import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import styles from "./App.module.scss"
import Home from "./components/Home"
import AboutUs from "./components/AboutUs/AboutUs";
import Recover from "./components/Recover/Recover";
import EditProfile from "./components/EditProfile/editProfile";
import Pay from "./components/Pay/pay";
import Admin from "./components/loginAdmin/admin";
import Inicio from './components/inicio/inicio';
import Cocina from './components/Cocina/cocina';

const  App = () => {
  


  return <BrowserRouter>
  
  <div className={styles.container}>
    <Routes>
      <Route path="/aboutus/:id" element={<AboutUs />} />
      <Route path="/menu/:id" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />    
      <Route path="/" element={<Login />} />
      <Route path="/editProfile/:id" element={<EditProfile />} />
      <Route path="/pay/:id" element={<Pay />} />
      <Route path="/admin/:id" element={<Admin />} />
      <Route path="/inicio/:id" element={<Inicio/>} />
      <Route path="/cocina/:id" element={<Cocina/>} />
  
    </Routes>

  </div>
  
  </BrowserRouter>
}

export default App;
