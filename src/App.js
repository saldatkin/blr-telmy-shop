import { Routes, Route } from 'react-router-dom';
import Shop from './components/shop/shop.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';


const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='home' element={<Home/>} />
        <Route path='shop' element={<Shop/>} />
      </Route>
    </Routes>
    
  )
}

export default App;
