import {createContext,useState} from 'react'

const NotesContext = createContext();


const NotesProvider=({children})=>{
    const [ notes,setNotes] = useState([])
    return (
        <NotesContext.Provider value={{notes,setNotes}}>
            {children}
        </NotesContext.Provider>
    )
}

export {NotesContext,NotesProvider}