import { useState, useRef } from 'react';
//Import Styles
import './styles/app.scss'
//Adding Component
import Player from './components/Player';
import Song from './components/Songs';
import Library from './components/Library';
import Nav from './components/Nav';
//Import Utils
import data from './utils';


function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[6]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav 
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
       />
      <Song currentSong={currentSong} />
      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <Library 
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
