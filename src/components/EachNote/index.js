import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import { useContext } from 'react';
import { NotesContext } from '../../context';
import './index.css';

const EachNote = (props) => {
  const { notes, setNotes } = useContext(NotesContext);
  const { eachNote } = props;
  const { id, title, description, category,is_checked } = eachNote;
  const toggle = is_checked ? 'checked':'notChecked'



  const onChangeCheckbox = async (event) => {
    try {
      const response = await fetch(`http://localhost:4000/notes/toggle/${id}`, {
        method: 'PUT', 
      });

      if (!response.ok) {
        throw new Error("Failed to update note status");
      }

      const data = await response.json();
      console.log(data,"from eachnote toggle")
      const updatedNotes = notes.map(note => 
        note.id === id ? { ...note, is_checked: data.is_checked } : note
      );
      setNotes(updatedNotes); 
    } catch (error) {
      console.error("Error updating note:", error);
  }
};

  return (
    <li className="todo-item-container">
      <input 
        type="checkbox" 
        id={id} 
        className="checkbox-input" 
        checked={is_checked} 
        onChange={onChangeCheckbox} 
      />
      <div className="label-container">
        <label htmlFor={id} className="checkbox-label">{title}</label>
        <p className={`note-description ${toggle}`}>{description}</p>
        <p className="note-category">Category: {category}</p>
      </div>
      <div className="delete-update-con">
        <div className="delete-icon-container">
          <Link to={`/deleteNote/${id}`}>
            <RiDeleteBin6Line className="delete-icon" />
          </Link>
        </div>
        <div className="delete-icon-container">
          <Link to={`/updatenote/${id}`}>
            <FaPenToSquare className="delete-icon" />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default EachNote;
