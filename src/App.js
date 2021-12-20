import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [hitAux, setHitAux] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <p>Pass me the aux</p>
        <button className="spotifyButton" onClick={() => setHitAux(true)}>
          {hitAux ? "Again!" : "Hit it!"}
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
