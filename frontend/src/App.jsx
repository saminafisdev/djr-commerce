import { Routes, Route } from "react-router";
import { Home } from "./components/Home";
import { MainLayout } from "./layout/MainLayout";
import { ProductsList } from "./features/products/ProductsList";
import { ProductDetail } from "./features/products/ProductDetail";
import { Signup } from "./features/auth/Signup";
import { Login } from "./features/auth/Login";
import { WishlistPage } from "./features/wishlist/WishlistPage";
import { CheckoutSuccess } from "./features/checkout/pages/CheckoutSuccess";
import { CheckoutCancel } from "./features/checkout/pages/CheckoutCancel";
import { AccountLayout } from "./features/auth/pages/AccountLayout";
import { AccountPage } from "./features/auth/AccountPage";
import { UserOrdersPage } from "./features/auth/pages/UserOrdersPage";

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
          <Route path="/success" element={<CheckoutSuccess />} />
          <Route path="/cancel" element={<CheckoutCancel />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountPage />} />
            <Route path="order" element={<UserOrdersPage />} />
          </Route>
        </Route>

        {/* Auth routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
