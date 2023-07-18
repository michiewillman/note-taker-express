const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

// GET Route for /api/notes
notes.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route to store new data in db.json
notes.post("/notes", (req, res) => {
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

module.exports = notes;
