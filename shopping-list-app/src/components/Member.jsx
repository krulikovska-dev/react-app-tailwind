import styles from "./Member.module.css"
import { useLanguage } from "../context/useLanguage";
import { t } from "../translations";

function Member({ id, nick, onDelete, isOwner = false }) {

        const { language } = useLanguage();
    const tr = t[language]; 
    return (
        <div className={styles.member}>
            <div className="memberCard">
            <p>
                {nick}
                {isOwner && <span className={styles.ownerBadge}> (Owner)</span>}
            </p>
            
            {!isOwner && (
                <button onClick={() => onDelete(id)}>{tr.delete}</button>
            )}
            </div>
        </div>
    )
}

export default Member;