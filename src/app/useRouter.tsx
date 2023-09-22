import { useMemo } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Categories from "./pages/Categories/Categories";

export function useRouter() {
    return useMemo(() => {
        const routes = createRoutesFromElements(
            <Route element={<Layout />}>
                <Route index element={<div>Main page</div>} />
                <Route path="orders" element={<div>orders</div>} />
                <Route path="manufactoring" element={<div>manufactoring</div>} />
                <Route path="techcards" element={<div>techcards</div>} />
                <Route path="components" element={<div>components</div>} />
                <Route path="categories" element={<Categories />} />
            </Route>
        )
        return createBrowserRouter(routes);
    }, [])
}