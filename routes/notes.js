const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  readAndRemove,
} = require("../helpers/fsUtils");

// GET Route for /api/notes - because /notes is included in index.js as the router, we can remove /notes from our requests
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route to store new data in db.json
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  // If title & text are submitted, create object for the new note
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // Read saved notes from db, push new note to it and then write file again
    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully to database.`);
  } else {
    res.error("Error in adding new note.");
  }
});

notes.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    readAndRemove(id, "./db/db.json");
    res.json(`Note deleted successfully from database.`);
  } else {
    res.error("Error in adding new note.");
  }
});

module.exports = notes;
