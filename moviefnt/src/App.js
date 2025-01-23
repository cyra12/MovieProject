import React, { useState } from "react";
import {enterMovie, enterGenre, tester} from "./Command.js"
import './App.css';

function App() {
    var val;
    const [text, setText] = useState("");
    const [genre, setGenre] = useState("");
    const [movies, setMovies] = useState("")
    async function submitMovie() {
      let input = text;
      if(input === undefined) {
        val = "invalid Command!";
      } else {
        enterMovie(input);
      }
      setText("");
    }
    async function submitGenre() {
      let input = genre;
      var movieMatches;
      setGenre("");
      movieMatches = await enterGenre(input);
      console.log("yo dog");
      console.log(movieMatches);
      setMovies(movieMatches);
    } 

    return (
      <div className="App">
        <link rel="stylesheet" href="App.css"/>
        <h2 id="topTitle">{"Movie Recommendation Bank!"}</h2>
        <input
         className="movie"
          id = "MovieButton"
          value={text}
          type="text"
          placeholder="Enter Movie Title Here!"
          onChange={(e) => setText(e.target.value)}
          />
          <button className="movie" type="button" onClick={submitMovie}>
            Submit
          </button>
        <input
          className="genre"
          id = "GenreButton"
          value={genre}
          type="text"
          placeholder="Which Genre would you like to see?"
          onChange={(e) => setGenre(e.target.value)}
          />
          <button className="genre" type="button" onClick={submitGenre}>
            Submit
          </button>
          <button id="ebutton" type="button" onClick={tester}>
            DONT TOUCH
          </button>
          <div className="text-box">
            {movies}
          </div>
      </div>
    )
}

export default App;
