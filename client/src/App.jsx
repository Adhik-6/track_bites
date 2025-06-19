import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Location, Signup, ForgotPassword, MenuCategory, TrainDetails, Preference, Payment, OrderConfirmation, VegMenu, NonvegMenu } from "./pages/index.js";
import {Toaster} from 'react-hot-toast'
import { useEffect, useState } from 'react';
import useGlobalStore from './stores/global.stores.js';

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
        <Route path="/location" element={<Location />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/menucategory" element={<MenuCategory />} />
        <Route path="/veg-menu" element={<VegMenu />} />
        <Route path="/nonveg-menu" element={<NonvegMenu />} />
        <Route path="/traindetails" element={<TrainDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;