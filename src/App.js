import { Routes, Route } from 'react-router-dom';
import Checkout from './routes/checkout/checkout.component.js';
import Auth from './routes/auth/auth.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';


const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='home' element={<Home/>} />
        <Route path='shop/*' element={<Shop/>} />
        <Route path='auth' element={<Auth/>} />
        <Route path='checkout' element={<Checkout/>} />
      </Route>
    </Routes>
    
  )
}

export default App;
