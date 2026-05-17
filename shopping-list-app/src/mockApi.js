import { mockLists } from "./mockData.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    getLists: async () => {
        await delay(300);
        return [...mockLists];
    },

    getList: async (id) => {
        await delay(200);
        const list = mockLists.find(l => l.id === id);
        if (!list) throw new Error("List not found");
        return list;
    },

    createList: async (newList) => {
        await delay(300);
        const listWithId = {
            ...newList,
            id: Date.now().toString()
        };
        mockLists.push(listWithId);
        return listWithId;
    },

    updateList: async (id, updatedList) => {
        await delay(300);
        const index = mockLists.findIndex(l => l.id === id);
        if (index === -1) throw new Error("List not found");
        mockLists[index] = { ...mockLists[index], ...updatedList };
        return mockLists[index];
    },

    deleteList: async (id) => {
        await delay(300);
        const index = mockLists.findIndex(l => l.id === id);
        if (index !== -1) {
            mockLists.splice(index, 1);
        }
        return true;
    }
};