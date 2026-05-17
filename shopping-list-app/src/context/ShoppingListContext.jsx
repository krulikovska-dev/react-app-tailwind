import { createContext, useState, useEffect } from "react";
import { Api } from "../Api";

const ShoppingListContext = createContext();

export function ShoppingListProvider({ children }) {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLists = async () => {
    try {
        setError(null);
        const data = await Api.getLists();
        setShoppingLists(data);
    } catch (err) {
        setError("Failed to load shopping lists. Please try again.");
        console.error(err);
    } finally {
        setLoading(false);
    }
};
        loadLists();
    }, []);

    const addList = async (newListData) => {
        try {
            const created = await Api.createList(newListData);
            setShoppingLists(prev => [created, ...prev]);
        } catch (error) {
            console.error("Failed to create list", error);
        }
    };

    const updateList = async (id, updatedData) => {
        try {
            const updated = await Api.updateList(id, updatedData);
            setShoppingLists(prev =>
                prev.map(list => list.id === id ? updated : list)
            );
        } catch (error) {
            console.error("Failed to update list", error);
        }
    };

    const deleteList = async (id) => {
        try {
            await Api.deleteList(id);
            setShoppingLists(prev => prev.filter(list => list.id !== id));
        } catch (error) {
            console.error("Failed to delete list", error);
        }
    };

    return (
        <ShoppingListContext.Provider value={{
            shoppingLists,
            loading,
            error,
            addList,
            updateList,
            deleteList
        }}>
            {children}
        </ShoppingListContext.Provider>
    );
}

export { ShoppingListContext}