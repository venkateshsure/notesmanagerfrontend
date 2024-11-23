import { Routes,BrowserRouter,Route } from 'react-router-dom';

import Notes from './components/Notes';
import CreateNotes from './components/CreateNotes'
import UpdateNotes from './components/UpdateNotes'
import DeleteNotes from './components/DeleteNotes'

import './App.css'

const App=()=>(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Notes/>} />
            <Route path="createNote" element={<CreateNotes />}/>
            <Route path="updateNote/:id" element={<UpdateNotes />}/>
            <Route path="deleteNote/:id" element={<DeleteNotes />}/>
        </Routes>
    </BrowserRouter>
)

export default App