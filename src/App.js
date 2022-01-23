import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [hitAux, setHitAux] = useState(false);
  const [token, setToken] = useState("");

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
      console.log(`response.data.access_token: ${response.data.access_token}`);

      setToken(response.data.access_token);
      return response.data.access_token;
    } catch (err) {
      console.log(err);
    }
  };
  /* Spotify TOKEN request code - end */

  /* Spotify API request code */
  const getSimilar = async () => {
    const artistId = "3hOdow4ZPmrby7Q1wfPLEy";

    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        // token stored as global variable
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        { headers }
      );

      // data.artists.forEach(() => console.log(`this.name: ${this.name}`));

      console.log(`data.artists.genres: ${data.artists[2].name}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  /* Spotify API request code - end */

  return (
    <div className="App">
      <header className="App-header">
        <p>Pass me the aux</p>
        <button className="spotifyButton" onClick={() => setHitAux(true)}>
          {hitAux ? "Again!" : "Hit it!"}
        </button>
        <button className="spotifyButton" onClick={() => getSimilar()}>
          "test"
        </button>
        {hitAux && (
          <iframe
            title="song"
            src="https://open.spotify.com/embed/track/38Yamwrtcc9Niupl3kH8pH"
            width="300"
            height="80"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        )}
      </header>
    </div>
  );
}

export default App;
