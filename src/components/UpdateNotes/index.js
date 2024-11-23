import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles
import './index.css';

const UpdateNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Others');

    useEffect(() => {
        const fetchNote = async () => {
            const response = await fetch(`http://localhost:4000/notes/${id}`);
            const data = await response.json();
            console.log("data from update ", data);
            if (data) {
                setTitle(data.title);
                setDescription(data.description);
                setCategory(data.category);
            }
        };

        fetchNote();
    }, [id]);

    const handleUpdateNote = async (e) => {
        e.preventDefault();

        const updatedNote = {
            title,
            description,
            category,
        };

        const response = await fetch(`http://localhost:4000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedNote),
        });

        if (response.ok) {
            // Show success notification
            toast.success('Note updated successfully!');
           navigate('/');
        } else {
            // Show error notification
            toast.error('Failed to update note.');
        }
    };

    return (
        <div className="edit-note-container">
            {/* Toast Container to show toasts */}
            <ToastContainer />

            <h1>Edit Note</h1>
            <form onSubmit={handleUpdateNote}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    required
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Others">Others</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>
                <button type="submit">Update Note</button>
            </form>
        </div>
    );
};

export default UpdateNote;
