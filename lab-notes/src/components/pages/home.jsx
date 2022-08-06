/* eslint-disable no-unused-vars */
import { onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
//importando el hook personalizado
import { useAuth } from '../../context/authContext';
import {
    updateData
} from '../../services/firestore';

export const Home = () => {

    const { user } = useAuth();
    console.log(user);
    const [notes, setNotes] = useState([]);
    const [ form, setForm ] = useState({
        title:'',
        desc: '',
        tasks: ['']
    }); 

    const [ popupActive, setPopupActive ] = useState(false);

    useEffect(() => {
        updateData(setNotes);

    }, []);

    const handleView = id => {
        const notesClone = [...notes];
        notesClone.forEach( note => {
            if(note.id === id) {
                note.viewing = !note.viewing
            } else {
                note.viewing = false
            }
        })
        setNotes[notesClone];
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleTask = (e,i) => {
        const tasksClone = [...form.tasks];
        tasksClone[i] = e.target.value;
        setForm({
            ...form,
            tasks:tasksClone
        });
    } 

    return (
        <div>
            homeeee { user.email}
            <h1>My notes</h1>
            <button onClick={() => setPopupActive(!popupActive)}>Add Note</button>
            <div className = 'notes'>
                { notes.map((note,i) => (
                    <div className='note' key={note.id}>
                        <h3>{note.title}</h3>
                        <p dangerouslySetInnerHTML={{__html: note.desc}}></p>
                        { note.viewing && <div>
                            <h4>Task</h4>
                            <ul>
                                { note.tasks.map((task,i) => (
                                    <li key={i}>{task}</li>
                                ))}
                            </ul>
                        </div>
                        }
                        <div className='buttons'>
                           <button onClick={() => handleView(note.id) }>view {note.viewing ? 'less' : 'more'}</button>
                           <button className='remove'>Remove</button>
                        </div>
                    </div>
                ))}

            </div>

        {popupActive && <div className='popup'>
            <div className='popup-inner'>
                <h2>Add a new note</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Title</label>
                        <input 
                            type= 'text' 
                            value={form.title}
                            onChange={e => setForm({...form, title: e.target.value})}
                        ></input>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <input 
                            type= 'text' 
                            value={form.desc}
                            onChange={e => setForm({...form, desc: e.target.value})}
                        ></input>
                    </div>
                    <div className='form-group'>
                        <label>Tasks</label>
                        {
                            form.tasks.map((task,i) => (
                              <input 
                              type= 'text' 
                              key={i}
                              value={task}
                              onChange={e => handleTask(e,i)}
                              ></input>
                            ))
                        }

                    </div>
                </form>
                {JSON.stringify(form)}
            </div>
        </div>}

        </div>
    );
}

export default Home;
