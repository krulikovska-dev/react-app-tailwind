import "./Overview.css";
import ShoppingListCard from "./ShoppingListCard";
import NewListModal from "./NewListModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useShoppingLists } from "./useShoppingLists";

function Overview() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("all");
    const { shoppingLists, loading, addList, error } = useShoppingLists();  

    const handleDetailClick = (listId) => {
        navigate(`/detail/${listId}`);
    };

    const handleCreateList = async (newListData) => {
    await addList(newListData);   
    setIsModalOpen(false);
};

    if (loading) {
        return (
            <div className="detailCard">
                <div className="loadingSpinner">Loading shopping lists...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detailCard">
                <h2>Error loading lists</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <>
            <div className="detailCard">
                <div className="ListHeader">
                    <h1>Overview</h1>
                    <button 
                        className="newListButton" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New List
                    </button>
                    <div className="filterContainer">
                <button className={`filterBtn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
                <button className={`filterBtn ${filter === "active" ? "archived" : ""}`} onClick={() => setFilter("waiting")}>
                    Active ({shoppingLists.filter(i => i.state === "active").length})
                </button>
                <button className={`filterBtn ${filter === "archived" ? "active" : ""}`} onClick={() => setFilter("done")}>
                    Archived ({shoppingLists.filter(i => i.state === "archived").length})
                </button>
            </div>
                </div>

                <div className="shoppingCardsGrid">
                    {shoppingLists.length === 0 ? (
                        <p>No shopping lists yet. Create your first one!</p>
                    ) : (
                        shoppingLists.map((list) => (
                            <ShoppingListCard
                                key={list.id}
                                id={list.id}
                                title={list.title}
                                description={list.description}
                                state={list.listState || "active"}
                                onDetailClick={handleDetailClick}
                            />
                        ))
                    )}
                </div>
            </div>

            <NewListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateList={handleCreateList}
            />
        </>
    );
}

export default Overview;