import "./ShoppingListCard.css";

function ShoppingListCard({ id, title, description, state = "active", onDetailClick }) {
    return (
        <div className="shoppingListCard w-[200px] h-[200px] rounded-3xl border border-border 
                bg-card text-card-foreground shadow-sm hover:shadow-md 
                dark:border-gray-700 dark:bg-zinc-900 p-4 flex flex-col">
            <div className="cardHeader">
                <h3 className="text-card-foreground">{title}</h3>
                <span className={`statusBadge ${state} 
                    ${state === "active" 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" 
                      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
                    {state === "active" ? "ACTIVE" : "ARCHIVED"}
                </span>
            </div>
            
            <p className="cardDescription text-muted-foreground">{description}</p>
            
            <button 
                className="detailButton bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 
                           border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                onClick={() => onDetailClick(id)}
            >
                View Details
            </button>
        </div>
    );
}

export default ShoppingListCard;