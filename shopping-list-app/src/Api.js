const BASE_URL = "http://localhost:3001";

export const Api = {
    getLists: async () => {
        const res = await fetch(`${BASE_URL}/shoppingLists`);
        if (!res.ok) throw new Error("Failed to fetch lists");
        return res.json();
    },

    getList: async (id) => {
        const res = await fetch(`${BASE_URL}/shoppingLists/${id}`);
        if (!res.ok) throw new Error("List not found");
        return res.json();
    },

    createList: async (newList) => {
        const res = await fetch(`${BASE_URL}/shoppingLists`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newList),
        });
        if (!res.ok) throw new Error("Failed to create list");
        return res.json();
    },

    updateList: async (id, updatedList) => {
        const res = await fetch(`${BASE_URL}/shoppingLists/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedList),
        });
        if (!res.ok) throw new Error("Failed to update list");
        return res.json();
    },

    deleteList: async (id) => {
        const res = await fetch(`${BASE_URL}/shoppingLists/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete list");
        return true;
    },
};