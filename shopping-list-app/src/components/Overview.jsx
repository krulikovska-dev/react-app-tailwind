import "./Overview.css";
import ShoppingListCard from "./ShoppingListCard";
import NewListModal from "./NewListModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useShoppingLists } from "./useShoppingLists";
import { useLanguage } from "../context/useLanguage";
import { t } from "../translations";

function Overview() {
    
    const navigate = useNavigate();
    const { language } = useLanguage();
    const tr = t[language]; 
    
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
        <div className="detailCard bg-card border border-border rounded-2xl p-8 mt-6 shadow-sm">
            <div className="ListHeader">
                <h1 className="text-3xl font-bold text-card-foreground">{tr.overview}</h1>
                <button 
                    className="newListButton px-5 py-2.5 bg-blue-600 hover:bg-blue-700 
                               text-white rounded-xl font-medium"
                    onClick={() => setIsModalOpen(true)}
                >
                    {tr.newList}
                </button>

                {/* Filter buttons - improved */}
                <div className="filterContainer flex gap-2">
                    <button className={`filterBtn px-4 py-2 rounded-xl ${filter === "all" ? "bg-zinc-800 text-white dark:bg-white dark:text-zinc-900" : "bg-muted hover:bg-zinc-200 dark:hover:bg-zinc-700"}`} 
                            onClick={() => setFilter("all")}>{tr.all}</button>
                    {/* Add other filter buttons similarly with dark classes */}
                </div>
            </div>

            <div className="shoppingCardsGrid">
                {shoppingLists.length === 0 ? (
                    <p className="text-center py-12 text-muted-foreground">{tr.noLists}</p>
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