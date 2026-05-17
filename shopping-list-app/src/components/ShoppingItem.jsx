import styles from "./ShoppingItem.module.css"

function ShoppingItem({ 
    id, 
    title, 
    amount, 
    unit, 
    onDelete, 
    state = "waiting",     
    onStateChange           
}) {

    const isDone = state === "done";

    const handleCheckboxChange = () => {
        
        const newState = isDone ? "waiting" : "done";
        onStateChange(id, newState);
    };

    return (
        <div className={styles.item}>
            <h3>{title}</h3>
            <p>{amount} {unit}</p>
            
            <input 
                type="checkbox" 
                checked={isDone}
                onChange={handleCheckboxChange}
            />
            
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
}

export default ShoppingItem;