import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [hitAux, setHitAux] = useState(false);
  const [token, setToken] = useState("");
  const [songId, setSongId] = useState("38Yamwrtcc9Niupl3kH8pH");

  useEffect(() => {
    getToken();
  }, []);

  /* Spotify TOKEN request code */
  const axios = require("axios");

  const getToken = async () => {
    const url = "https://spotify-proxy-server-heroku.herokuapp.com/auxv1token";
    fetch(url)
      .then((response) => response.json())
      .then((response) => setToken(response.access_token))
      .catch((err) => console.error("error of " + err));
  };
  /* Spotify TOKEN request code - end */

  /* Grab a song */
  const grabSong = async () => {
    console.log(`token: ${token}`);
    setHitAux(true);
    const playlistId = "33dmyEtq8zLFOE264vUDIU";
    let offset = Math.floor(Math.random() * 150);
    console.log(`offset: ${offset}`);

    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        // token stored as global variable
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=1&offset=${offset}`,
        { headers }
      );

      setSongId(data.items[0].track.id);

      return data;
    } catch (err) {
      getToken(); // Include in case token runs out?
      console.log(err);
    }
  };
  /* Grab a song - end */

  let embedLink = `https://open.spotify.com/embed/track/${songId}`;

  return (
    <div className="App">
      <header className="App-header">
        <p>Pass me the aux</p>
        <button className="spotifyButton" onClick={() => grabSong()}>
          {hitAux ? "Again!" : "Hit it!"}
        </button>
        {hitAux && (
          <iframe
            title="song"
            src={embedLink}
            width="300"
            height="80"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        )}
      </header>
      <div className="App-footer">
        <p>A project by @evanscianc</p>
        {/* <img src="github-logo.png" alt="GitHub" /> */}
      </div>
    </div>
  );
}

export default App;
