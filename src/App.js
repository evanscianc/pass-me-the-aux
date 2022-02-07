import "./App.css";
import { useState, useEffect } from "react";
// import axios from "axios";

function App() {
  const [hitAux, setHitAux] = useState(false);
  const [token, setToken] = useState("");
  const [songId, setSongId] = useState("38Yamwrtcc9Niupl3kH8pH"); // Aries - BOUNTY HUNTER

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

    const playlistId = "33dmyEtq8zLFOE264vUDIU"; // kickin it by evanscianc (me)
    let offset = Math.floor(Math.random() * 150); // 150 songs in my playlist
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
      setHitAux(true);

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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
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
        A project by @evanscianc {"   "} <i className="fa">&#xf09b;</i>{" "}
        <i className="fa">&#xf08c;</i>
      </div>
    </div>
  );
}

export default App;
