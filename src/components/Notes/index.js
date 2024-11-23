import { v4 } from 'uuid';
import { CiSearch } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import EachNote from '../EachNote';
import './index.css';
import { NotesContext } from '../../context';

const Notes = () => {
    const [title, setTitle] = useState("");
    const [searchInput, setSearchNotes] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Others");
    const { notes, setNotes } = useContext(NotesContext);

    const notify = (message) => toast(message);

    useEffect(() => {
        const fetchNotes = async () => {
            let url = "http://localhost:4000/notes";
            let options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            };
            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error("Error fetching notes:", error.message);
            }
        };
        fetchNotes();
    }, []);

    
    const addNewNote = async () => {
        if (!title || !description) {
            return notify("Title and description are required.");
        }
        let newNote = {
            unique:v4(),
            title,
            description,
            category,
        };
    
        let url = "http://localhost:4000/notes";
        let options = {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await fetch(url, options);
            const responseText = await response.text();
            if (response.ok) {
                // After adding the note, fetch the notes again from the backend
                const fetchResponse = await fetch("http://localhost:4000/notes");
                const data = await fetchResponse.json();
                setNotes(data);  // Update notes state with the latest data
                setTitle("");
                setDescription("");
                setCategory("Others");
                notify("Note added successfully!");
            } else {
                notify(`Failed to add note: ${responseText}`);
            }
        } catch (error) {
            console.error("Add note error:", error.message);
        }
    };


    const onSearchNotes = async () => {
        let url = `http://localhost:4000/notes?title=${searchInput}`;
        let options = {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Search error:", error.message);
        }
    };
    console.log(notes,"--------------------")
    return (
        <div className="todos-bg-container">
            <ToastContainer />
            <Link to="/" />
            <div className="con">
                <h1 className="todos-heading">Notes Manager</h1>
                <div className="todos-user-input-con">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="todo-user-input" placeholder="Enter title" />
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter description" className="todo-user-input" />
                    <div className="todo-select-con">
                    <label className="create-task-heading" htmlFor="category">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} id="category" className="form-control">
                        <option value="Others">Others</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
                </div>
                <button className="button" onClick={addNewNote}>Add</button>
                <div style={{width:"80%"}}>
                    <h1 className="todo-items-heading">
                        My <span className="todo-items-heading-subpart">Notes</span>
                    </h1>
                    <div className="search-con">
                        <input value={searchInput} onChange={(e) => setSearchNotes(e.target.value)} type="search" className="input-search" placeholder="Search Notes" />
                        <CiSearch className="search-icon" onClick={onSearchNotes} />
                    </div>
                    <ul className="todo-items-container">
                        {notes.length === 0 ? <h2 className="no-todos">No Notes!</h2> : notes.map((note) => (
                            <EachNote key={note.unique} eachNote={note} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notes;
