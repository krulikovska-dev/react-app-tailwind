import "./Overview.css";
import ShoppingListCard from "./ShoppingListCard";
import NewListModal from "./NewListModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useShoppingLists } from "./useShoppingLists";
import { useLanguage } from "../context/useLanguage";
import { t } from "../translations";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function Overview() {
    
    const navigate = useNavigate();
    const { language } = useLanguage();
    const tr = t[language]; 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("all");
    const { shoppingLists, loading, addList, error } = useShoppingLists();  

    const chartData = shoppingLists.map(list => ({
    name: list.title,
    items: list.items?.length || 0
}));

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
                <div className="loadingSpinner">{tr.loadingSpinner}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detailCard">
                <h2>{tr.errorLoading}</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>{tr.retry}</button>
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
            <div className="chartWrapper">
                <h3 className="graphHeading">{tr.itemCount}</h3>
    <ResponsiveContainer width="100%" height={250}>
        
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="name"
                angle={-35}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="items" fill="rgba(93, 138, 161, 0.4)" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
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