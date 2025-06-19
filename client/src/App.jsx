import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Location, Signup, ForgotPassword, MenuCategory, TrainDetails, Preference, Payment, OrderConfirmation, VegMenu, NonvegMenu } from "./pages/index.js";
import {Toaster} from 'react-hot-toast'
import { useEffect, useState } from 'react';
import useGlobalStore from './stores/global.stores.js';
import { Navigate } from "react-router-dom";


function App() {
  const { token } = useGlobalStore()
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
  
  useEffect(() => {
    setIsAuthenticated(token?true:false)
  }, [token])


  useEffect(() => {
    const clearStoreOnClose = () => {
      sessionStorage.removeItem('global-store');
    };

    window.addEventListener('unload', clearStoreOnClose);

    return () => {
      window.removeEventListener('unload', clearStoreOnClose);
    };
  }, []);

  return (
    <Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/location" element={ isAuthenticated ? <Location /> : <Navigate to="/" />} />
        <Route path="/preference" element={ isAuthenticated ? <Preference /> : <Navigate to="/" />} />
        <Route path="/menucategory" element={ isAuthenticated ? <MenuCategory /> : <Navigate to="/" />} />
        <Route path="/veg-menu" element={ isAuthenticated ? <VegMenu /> : <Navigate to="/" />} />
        <Route path="/nonveg-menu" element={ isAuthenticated ? <NonvegMenu /> : <Navigate to="/" />} />
        <Route path="/traindetails" element={ isAuthenticated ? <TrainDetails /> : <Navigate to="/" />} />
        <Route path="/payment" element={ isAuthenticated ? <Payment /> : <Navigate to="/" />} />
        <Route path="/order-confirmation" element={ isAuthenticated ? <OrderConfirmation /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;