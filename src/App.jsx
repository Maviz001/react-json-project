import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CaseList from "./pages/CaseList";
import AddCase from "./pages/AddCase";
import EditCase from "./pages/EditCase";

function App(){
 return(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/cases" element={<CaseList/>}/>
    <Route path="/add-case" element={<AddCase/>}/>
    <Route path="/edit/:id" element={<EditCase/>}/>
   </Routes>
  </BrowserRouter>
 );
}

export default App;
