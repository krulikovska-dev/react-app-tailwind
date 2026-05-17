import { useState } from "react";
import "./NewListModal.css";
import { useLanguage } from "../context/useLanguage";
import { t } from "../translations";

function NewListModal({ isOpen, onClose, onCreateList }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { language } = useLanguage();
    const tr = t[language]; 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newList = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            owner: "@luis1",
            items: [],
            members: [{ id: "1", nick: "@luis1" }]
        };

        onCreateList(newList);
        setTitle("");
        setDescription("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2 className="text-card-foreground">{tr.createNewList}</h2>
                    <button className="closeButton" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="title" className="text-card-foreground">{tr.listTitle}</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={tr.titlePlaceholder}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="description" className="text-card-foreground">{tr.description}</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={tr.decriptionPlaceholder}
                            rows="3"
                        />
                    </div>

                    <div className="modalFooter">
                        <button type="button" className="cancelButton" onClick={onClose}>
                            {tr.cancel}
                        </button>
                        <button type="submit" className="createButton">
                            {tr.createList}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewListModal;