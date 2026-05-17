import styles from "./Member.module.css"

function Member({ id, nick, onDelete, isOwner = false }) {
    return (
        <div className={styles.member}>
            <p>
                {nick}
                {isOwner && <span className={styles.ownerBadge}> (Owner)</span>}
            </p>
            
            {!isOwner && (
                <button onClick={() => onDelete(id)}>Delete</button>
            )}
        </div>
    )
}

export default Member;