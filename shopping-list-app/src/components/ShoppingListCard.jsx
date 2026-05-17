import "./ShoppingListCard.css";

function ShoppingListCard({ id, title, description, state = "active", onDetailClick }) {
    return (
        <div className="shoppingListCard">
            <div className="cardHeader">
                <h3>{title}</h3>
                <span className={`statusBadge ${state}`}>
                    {state === "active" ? "ACTIVE" : "ARCHIVED"}
                </span>
            </div>
            
            <p className="cardDescription">{description}</p>
            
            <button 
                className="detailButton"
                onClick={() => onDetailClick(id)}
            >
                View Details
            </button>
        </div>
    );
}

export default ShoppingListCard;