import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { NotesContext } from '../../context';

const DeleteNotes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notes, setNotes } = useContext(NotesContext);

    useEffect(() => {
        const onDeleteNote = async () => {
            let deleteUrl = `https://notes-manager-c0tj.onrender.com/notes/${id}`;
            let deleteOptions = {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                },
            };

            try {
                const response = await fetch(deleteUrl, deleteOptions);
                const responseText = await response.text();
                console.log(responseText, "responsetext from deleteNote");
                const notesAfterDelete = notes.filter(each => each.id !== id);
                setNotes(notesAfterDelete);
                navigate('/'); 
            } catch (error) {
                console.error("Error deleting notes:", error);
            }
        };

        onDeleteNote(); 

    }, [id, notes, setNotes, navigate]); 

    return (
        <center>
            <h1>{`Note with id ${id} has been deleted`}</h1>
        </center>
    );
};

export default DeleteNotes;
