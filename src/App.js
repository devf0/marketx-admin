import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListUsers from "./pages/list-users/ListUsers";
import ListProducts from "./pages/list-products/ListProducts";
import Single from "./pages/single/Single";
import NewUser from "./pages/new-user/NewUser";
import NewProduct from "./pages/new-product/NewProduct";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext} from "react";
import { DarkModeContext} from "./context/darkModeContext";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  
  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
  <BrowserRouter>
    <Routes>
      <Route path="/" > 
      {/* <Route path="/" element={<Home/>} /> */}
      <Route path="/" element={<ListProducts/>} />
      <Route path="login" element={<Login/>}/>
      <Route path="users">
        <Route index element={<ListUsers/>}/>
        <Route path=":userId" element={<Single/>}/>
        <Route path="new" element={<NewUser inputs={userInputs} title="Add New User"/>}/>
      </Route>
      <Route path="products">
        <Route index element={<ListProducts/>}/>
        <Route path=":productId" element={<Single/>}/>
        <Route path="new" element={<NewProduct inputs={productInputs} title="Add New Product"/>}/>
      </Route>
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
