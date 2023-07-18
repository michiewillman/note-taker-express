const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// GET Route for /api/notes
notes.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route to store new data in db.json
notes.post("/notes", (req, res) => {
  const { title, text } = req.body;

  // Create object for the user's input + generate random id for each note
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // --- STORE NEW NOTE IN DB ---
    // Obtain existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string of notes to JSON object
        const parsedNotes = JSON.parse(data);

        // Add the new note to the object
        parsedNotes.push(newNote);

        // Write to file the combined notes
        fs.writeFile("./db/db.json", JSON.stringify(), (error) =>
          error
            ? console.log(error)
            : console.log("Successfully updated notes in db.")
        );
      }
    });

    const response = {
      status: "success",
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in saving note");
  }
});

module.exports = notes;
