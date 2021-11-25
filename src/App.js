import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/Homepage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import DetailPage from './pages/DetailPage/DetailPage';
import CartPage from './pages/CartPage/CartPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { UpdateProfile } from './pages/ProfilePage/UpdateProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/products" element={<ProductsPage />} />
          <Route exact path="/products/:id" element={<DetailPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/profile/update" element={<UpdateProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
