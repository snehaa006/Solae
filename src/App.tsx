import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { IconSprite } from "./components/IconSprite";
import { ScrollManager } from "./components/ScrollManager";
import { StoreLayout } from "./components/layout/StoreLayout";
import { CartProvider } from "./context/CartProvider";
import { ToastProvider } from "./context/ToastProvider";
import { readLogoParams } from "./lib/logos";
import { DesignSystemPage } from "./pages/DesignSystemPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { ShopPage } from "./pages/ShopPage";

export default function App() {
  // links like /?logo=2 pick a logo, /?logos brings the logo bar back
  const { search } = useLocation();
  useEffect(() => readLogoParams(search), [search]);

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
          {/* private: not linked from the store, and vercel.json sends it home on the live site */}
          <Route path="design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ScrollManager />
      </CartProvider>
    </ToastProvider>
  );
}
