import { useMemo } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Categories from "./pages/Categories/Categories";
import Components from "./pages/Components/Components";
import TechCards from "./pages/TechCards/TechCards";
import Warehouse from "./pages/Warehouse/Warehouse";
import Manufactoring from "./pages/Manufactoring/Manufactoring";
import Customers from "@app/pages/Customers/Customers";

export function useRouter() {
  return useMemo(() => {
    const routes = createRoutesFromElements(
      <Route element={<Layout />}>
        <Route index element={<div>Main page</div>} />
        <Route path="orders" element={<div>orders</div>} />
        <Route path="manufactoring" element={<Manufactoring />} />
        <Route path="techcards" element={<TechCards />} />
        <Route path="components" element={<Components />} />
        <Route path="categories" element={<Categories />} />
        <Route path="warehouse" element={<Warehouse />} />
        <Route path="customers" element={<Customers />} />
      </Route>
    );
    return createBrowserRouter(routes);
  }, []);
}
