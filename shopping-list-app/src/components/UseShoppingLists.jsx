import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";

export const useShoppingLists = () => {
    const context = useContext(ShoppingListContext);
    if (!context) {
        throw new Error("useShoppingLists must be used within a ShoppingListProvider");
    }
    return context;
};