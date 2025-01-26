import { Routes, Route } from "react-router";
import { Home } from "./components/Home";
import { MainLayout } from "./layout/MainLayout";
import { ProductsList } from "./features/products/ProductsList";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
