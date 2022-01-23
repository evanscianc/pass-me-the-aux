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
  const qs = require("qs");
  const getToken = async (
    clientId = "e6f7d57962df4fd890cdad3a0d3036ac",
    clientSecret = "c4fe7275e42443a0aafe0d3ace90dc03"
  ) => {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };
    const data = {
      grant_type: "client_credentials",
    };
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      );

      setToken(response.data.access_token);
      return response.data.access_token;
    } catch (err) {
      console.log(err);
    }
  };
  /* Spotify TOKEN request code - end */

  /* Grab a song */
  const grabSong = async () => {
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
