/*
 * pass me the aux (V1)
 * A web app to fetch songs from one of my playlists
 * Author: Evan Sciancalepore - Feb 9, 2022
 */

import "./App.css";
import { useState, useEffect } from "react";

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

  /* Grab a song from Spotify */
  const grabSong = async () => {
    const playlistId = "33dmyEtq8zLFOE264vUDIU"; // kickin it by evanscianc (me)
    let offset = Math.floor(Math.random() * 150); // 150 songs in my playlist

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
      console.error(err);
      if (err.message === "Request failed with status code 401") {
        getToken(); // 401 Authorization Error - get a new token (lasts for one hour)
        grabSong();
      }
    }
  };
  /* Grab a song from Spotify - end */

  let embedLink = `https://open.spotify.com/embed/track/${songId}`;

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      {token !== "" ? (
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
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          )}
        </header>
      ) : (
        <header className="App-header">
          <div class="loadingio-spinner-ellipsis-boeiszt6ipa">
            <div class="ldio-15p6k5bcweh">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <p>Token loading</p>
        </header>
      )}

      <div className="App-footer">
        A project by @evanscianc {"   "}{" "}
        <a href="https://github.com/evanscianc">
          <i className="fa">&#xf09b;</i>
        </a>
        {"   "}
        <a href="https://www.linkedin.com/in/evan-sciancalepore-08660a1b4/">
          <i className="fa">&#xf08c;</i>
        </a>
        {"   "}
        <a href="https://open.spotify.com/playlist/33dmyEtq8zLFOE264vUDIU?si=85fa34c254904c2b">
          <i className="fa">&#xf1bc;</i>
        </a>
      </div>
    </div>
  );
}

export default App;
