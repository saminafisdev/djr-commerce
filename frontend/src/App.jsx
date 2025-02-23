import { Routes, Route } from "react-router";
import { Home } from "./components/Home";
import { MainLayout } from "./layout/MainLayout";
import { ProductsList } from "./features/products/ProductsList";
import { ProductDetail } from "./features/products/ProductDetail";
import { Signup } from "./features/auth/Signup";
import { Login } from "./features/auth/Login";
import { WishlistPage } from "./features/wishlist/WishlistPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products">
            <Route index element={<ProductsList />} />
            <Route path=":slug" element={<ProductDetail />} />
          </Route>
          <Route path="wishlist">
            <Route index element={<WishlistPage />} />
          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
