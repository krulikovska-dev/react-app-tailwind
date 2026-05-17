import { useState } from "react";
import "./NewListModal.css";

function NewListModal({ isOpen, onClose, onCreateList }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
                    <h2>Create New Shopping List</h2>
                    <button className="closeButton" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="title">List Title *</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Vacation Shopping"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What is this list for?"
                            rows="3"
                        />
                    </div>

                    <div className="modalFooter">
                        <button type="button" className="cancelButton" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="createButton">
                            Create List
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewListModal;