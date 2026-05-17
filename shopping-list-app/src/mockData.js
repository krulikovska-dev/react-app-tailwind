export const mockLists = [
    {
        id: "1",
        title: "Weekly Groceries",
        description: "Everything we need for this week's meals",
        owner: "@luis1",
        listState: "active",
        items: [
            { id: "1", title: "Snacks", amount: 1, unit: "package", state: "waiting" },
            { id: "2", title: "Milk", amount: 1, unit: "liter", state: "waiting" },
            { id: "3", title: "Beef", amount: 3, unit: "kg", state: "waiting" }
        ],
        members: [
            { id: "1", nick: "@luis1" },
            { id: "2", nick: "@miki" },
            { id: "3", nick: "@john" }
        ]
    },
    {
        id: "2",
        title: "Birthday Party",
        description: "Snacks and drinks for the party on Saturday",
        owner: "@miki",
        listState: "active",
        items: [
            { id: "1", title: "Coke", amount: 6, unit: "bottles", state: "waiting" },
            { id: "2", title: "Chips", amount: 3, unit: "bags", state: "waiting" }
        ],
        members: [
            { id: "1", nick: "@luis1" },
            { id: "2", nick: "@miki" }
        ]
    },
    {
        id: "3",
        title: "Christmas List",
        description: "Everything we need for Christmas",
        owner: "@john",
        listState: "active",
        items: [
            { id: "1", title: "Fish", amount: 6, unit: "kgs", state: "waiting" },
            { id: "2", title: "Chocolate", amount: 3, unit: "bars", state: "waiting" }
        ],
        members: [
            { id: "1", nick: "@luis1" },
            { id: "2", nick: "@miki" },
            { id: "2", nick: "@john" }
        ]
    }
];