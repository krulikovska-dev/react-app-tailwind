import "./ListDetail.css";
import ShoppingItem from "./ShoppingItem";
import Member from "./Member";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShoppingLists } from "./useShoppingLists";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

function ListDetail() {
    const { listId } = useParams();
    const navigate = useNavigate();
    const { shoppingLists, loading, updateList, deleteList } = useShoppingLists();

    const currentList = shoppingLists.find(list => list.id === listId);

    
    const [titleDraft, setTitleDraft] = useState("");
    const [descriptionDraft, setDescriptionDraft] = useState("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const [listState, setListState] = useState(currentList ? currentList.listState || "active" : "active");
    const [showMembers, setShowMembers] = useState(false);

    const [newItem, setNewItem] = useState({ title: "", amount: "", unit: "" });
    const [filter, setFilter] = useState("all");

    if (loading) {
        return <div className="detailCard"><div className="loadingSpinner">Loading list details...</div></div>;
    }

    if (!currentList) {
        return (
            <div className="detailCard">
                <h2>Shopping List Not Found</h2>
                <p>The list you're looking for doesn't exist.</p>
                <button onClick={() => navigate("/")}>Back to Overview</button>
            </div>
        );
    }

    const items = currentList.items || [];

    
    const syncList = (updatedFields) => {
        updateList(currentList.id, { ...currentList, ...updatedFields });
    };

    const syncItems = (updatedItems) => {
        updateList(currentList.id, { ...currentList, items: updatedItems });
    };

    
    function toggleItemState(id, newState) {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, state: newState } : item
        );
        syncItems(updatedItems);
    }

    const filteredItems = items.filter(item =>
        filter === "all" || item.state === filter
    );

    const listItems = filteredItems.map(item => (
        <li key={item.id}>
            <ShoppingItem
                id={item.id}
                title={item.title}
                amount={item.amount}
                unit={item.unit}
                state={item.state}
                onDelete={deleteItem}
                onStateChange={toggleItemState}
            />
        </li>
    ));

    const listMembers = (currentList.members || []).map(member => (
        <li key={member.id}>
            <Member
                id={member.id}
                nick={member.nick}
                onDelete={() => {}}
                isOwner={member.nick === currentList.owner}
            />
        </li>
    ));



    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    }

    function addItem() {
        if (!newItem.title.trim()) return;
        const newId = (items.length + 1).toString();
        const updatedItems = [...items, {
            id: newId,
            title: newItem.title.trim(),
            amount: newItem.amount || 1,
            unit: newItem.unit.trim() || "pcs",
            state: "waiting"
        }];
        syncItems(updatedItems);
        setNewItem({ title: "", amount: "", unit: "" });
    }

    function deleteItem(idToDelete) {
        const updatedItems = items.filter(item => item.id !== idToDelete);
        syncItems(updatedItems);
    }

    function handleDeleteList() {
        if (!window.confirm(`Delete "${currentList.title}" permanently?`)) return;
        deleteList(listId);
        navigate("/");
    }

   function toggleArchive() {
    const newState = listState === "active" ? "archived" : "active";
    setListState(newState);
    syncList({ listState: newState });  
}



   
    function handleTitleClick() {
        setTitleDraft(currentList.title);
        setIsEditingTitle(true);
    }
    function handleTitleSave() {
        if (titleDraft.trim()) syncList({ title: titleDraft.trim() });
        setIsEditingTitle(false);
    }
    function handleTitleKeyDown(e) {
        if (e.key === "Enter") handleTitleSave();
        if (e.key === "Escape") setIsEditingTitle(false);
    }

   
    function handleDescriptionClick() {
        setDescriptionDraft(currentList.description || "");
        setIsEditingDescription(true);
    }
    function handleDescriptionSave() {
        syncList({ description: descriptionDraft.trim() });
        setIsEditingDescription(false);
    }
    function handleDescriptionKeyDown(e) {
        if (e.key === "Enter") handleDescriptionSave();
        if (e.key === "Escape") setIsEditingDescription(false);
    }

    return (
        <div className="detailCard">
            <div className="listHeader">
                {isEditingTitle ? (
                    <input
                        type="text"
                        value={titleDraft}
                        onChange={(e) => setTitleDraft(e.target.value)}
                        onBlur={handleTitleSave}
                        onKeyDown={handleTitleKeyDown}
                        autoFocus
                        className="editable-title-input"
                    />
                ) : (
                    <h2 onClick={handleTitleClick} style={{ cursor: "pointer" }}>
                        {currentList.title}
                        <span style={{
                            marginLeft: "12px", padding: "2px 10px", borderRadius: "12px",
                            fontSize: "0.8em", fontWeight: "600",
                            backgroundColor: listState === "active" ? "#e8f5e9" : "#ffebee",
                            color: listState === "active" ? "#2e7d32" : "#c62828"
                        }}>
                            {listState === "active" ? "ACTIVE" : "ARCHIVED"}
                        </span>
                    </h2>
                )}

                {isEditingDescription ? (
                    <textarea
                        value={descriptionDraft}
                        onChange={(e) => setDescriptionDraft(e.target.value)}
                        onBlur={handleDescriptionSave}
                        onKeyDown={handleDescriptionKeyDown}
                        autoFocus
                        className="editable-description-input"
                        rows="3"
                    />
                ) : (
                    <p
                        className="listDescription"
                        onClick={handleDescriptionClick}
                        style={{ cursor: "pointer", fontStyle: "italic", color: "#555" }}
                    >
                        {currentList.description || "Click to add a description..."}
                    </p>
                )}
            </div>

            <div className="addItemForm">
                <input type="text" name="title" placeholder="Enter a new item..." value={newItem.title} onChange={handleInputChange} />
                <input type="text" name="amount" placeholder="Amount" value={newItem.amount} onChange={handleInputChange} />
                <input type="text" name="unit" placeholder="unit (e.g. bottle, liter, kgs)" value={newItem.unit} onChange={handleInputChange} />
                <button className="addButton" onClick={addItem}>Add</button>
            </div>

            <div className="filterContainer">
                <button className={`filterBtn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
                <button className={`filterBtn ${filter === "waiting" ? "active" : ""}`} onClick={() => setFilter("waiting")}>
                    Waiting ({items.filter(i => i.state === "waiting").length})
                </button>
                <button className={`filterBtn ${filter === "done" ? "active" : ""}`} onClick={() => setFilter("done")}>
                    Done ({items.filter(i => i.state === "done").length})
                </button>
            </div>

            <div className="items">
                <ul>{listItems}</ul>
                {filteredItems.length === 0 && <p className="noItems">No items found in this filter.</p>}
            </div>

            <div className="listFooter">
                <div className="info">
                    <p>Created by: {currentList.owner}</p>
                </div>
                <div className="buttons">
                    <button>Edit</button>
                    <button 
    onClick={toggleArchive}
    style={{
        backgroundColor: listState === "active" ? "#0e0909" : "#4CAF50",
        color: "white",
        fontWeight: "500"
    }}
>
    {listState === "active" ? "Archive" : "Make Active"}
</button>
                    <button onClick={handleDeleteList} style={{ backgroundColor: "#d32f2f", color: "white" }}>
                        Delete
                    </button>
                </div>
            </div>

            <div className="membersSection">
                <div className="membersHeader" onClick={() => setShowMembers(!showMembers)}>
                    Members &nbsp;
                    <span className="toggleArrow">{showMembers ? "↑" : "↓"}</span>
                </div>
                {showMembers && <ul className="membersList">{listMembers}</ul>}
            </div>
            <div className="chartContainer">
    <h3>The number of bought items:</h3>
    <PieChart width={250} height={250}>
        <Pie
            data={[
                { name: "Waiting", value: items.filter(i => i.state === "waiting").length },
                { name: "Done", value: items.filter(i => i.state === "done").length },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
        >
            <Cell fill="#f59e0b" />
            <Cell fill="#4ade80" />
        </Pie>
        <Tooltip />
        <Legend />
    </PieChart>
</div>
        </div>
    );
}

export default ListDetail;