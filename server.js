const express = require("express");
const path = require("path");
// Import the api router
const api = require("./routes/index");
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware - Parse JSON and urlencoded form data (boilerplate)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware - Locate/use everything in 'public' dir
app.use(express.static("public"));

// Middleware - Send all the requests that begin with /api to the index.js in the routes folder
app.use("/api", api);

// GET Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET Route for wildcard route / unreserved characters
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
