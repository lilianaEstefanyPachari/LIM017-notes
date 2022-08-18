/* eslint-disable no-unused-vars */
import { onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  updateData,
  setDataInFirestore,
  deleteDocFirestore,
} from "../../../services/firestore";

export const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    tasks: [],
  });

  const [popupActive, setPopupActive] = useState(false);

  const handleClose = () => {
    setPopupActive(false);
    setForm({
      title: "",
      desc: "",
      tasks: [],
    });
  };

  useEffect(() => {
    console.log("uy un efecto secundario");
    updateData(setNotes);
  }, []);

  const handleView = (id) => {
    const notesClone = [...notes];
    notesClone.forEach((note) => {
      if (note.id === id) {
        note.viewing = !note.viewing;
      } else {
        note.viewing = false;
      }
    });
    setNotes(notesClone);
  };

  const handleSubmitNewNote = (e) => {
    e.preventDefault();
    if (!form.title || !form.desc || !form.tasks || form.tasks.includes("")) {
      alert("please fill out all fields");
    } else {
      setDataInFirestore(form);
      setForm({
        title: "",
        desc: "",
        tasks: [],
      });
      setPopupActive(false);
    }
  };

  const handleTask = (e, i) => {
    const tasksClone = [...form.tasks];
    tasksClone[i] = e.target.value;
    setForm({
      ...form,
      tasks: tasksClone,
    });
  };
  const handleAddTaskCount = () => {
    if (!form.tasks.includes("")) {
      setForm({
        ...form,
        tasks: [...form.tasks, ""],
      });
    }
  };

  const handleRemoveTask = (i) => {
    const tasksClone = [...form.tasks];
    setForm({
      ...form,
      tasks: tasksClone.filter((task) => task !== tasksClone[i]),
    });
  };

  const removeNote = (id) => {
    deleteDocFirestore(id);
  };

  return (
    <div>
      <h1>My notes</h1>
      <button onClick={() => setPopupActive(!popupActive)}>Add Note</button>
      <div className="notes">
        {notes.map((note, i) => (
          <div className="note" key={note.id}>
            <h3>{note.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: note.desc }}></p>
            {note.viewing && (
              <div>
                <h4>Task</h4>
                {note.tasks.length === 0 ? (
                  <p>No tasks</p>
                ) : (
                  <ul>
                    {note.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <div className="buttons">
              <button onClick={() => handleView(note.id)}>
                view {note.viewing ? "less" : "more"}
              </button>
              <button className="remove" onClick={() => removeNote(note.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={popupActive}
        onClose={() => {
          setPopupActive(false);
        }}
      >
        <DialogTitle>Add a new note</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitNewNote}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </Box>
            <Box mb={2}>
              {form.tasks.map((task, i) => (
                <>
                  <TextField
                    key={i}
                    fullWidth
                    id="outlined-basic"
                    label="Tasks"
                    variant="outlined"
                    value={task}
                    onChange={(e) => handleTask(e, i)}
                  />
                  <Button onClick={(e) => handleRemoveTask(i)}>
                    Remove task
                  </Button>
                </>
              ))}
              <Button onClick={handleAddTaskCount}>Add task</Button>
            </Box>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
          {JSON.stringify(form)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Homepage;
