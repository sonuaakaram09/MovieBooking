const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const db = require('./models');

// Require routes
const movieRoutes = require('./routes/movie.routes');
const userRoutes = require('./routes/user.routes');
const artistRoutes = require('./routes/artist.routes');
const genreRoutes = require('./routes/genre.routes');

// Routes
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/artists', artistRoutes);
app.use('/genres', genreRoutes);

// Database connection setup
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
  });

// Start server
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});