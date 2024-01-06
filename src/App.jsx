import React from "react"
import Registration from "./pages/Registration"
import Login from "./pages/Login";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Messege from "./pages/Messege";
import Notification from "./pages/Notification";
import RouteLayout from "./Components/RouteLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />   
      <Route path="/login" element={<Login />} /> 
      <Route path="/forgot" element={<Forgot />} />
     
     <Route path="/" element={<RouteLayout/>}>
     <Route path="/home" element={<Home />} />
      <Route path="/messege" element={<Messege />} />
      <Route path="/notification" element={<Notification />} />
     </Route>
      
    </Route>  
  )
);

function App() {


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />  
    </>
  )
}

export default App
