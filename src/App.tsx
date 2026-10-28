import { Navigate, Route, Routes } from "react-router";
import { IconSprite } from "./components/IconSprite";
import { ScrollManager } from "./components/ScrollManager";
import { StoreLayout } from "./components/layout/StoreLayout";
import { CartProvider } from "./context/CartProvider";
import { ToastProvider } from "./context/ToastProvider";
import { DesignSystemPage } from "./pages/DesignSystemPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { ShopPage } from "./pages/ShopPage";

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <IconSprite />
        <Routes>
          <Route element={<StoreLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop/:port?" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductPage />} />
          </Route>
          <Route path="design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ScrollManager />
      </CartProvider>
    </ToastProvider>
  );
}
