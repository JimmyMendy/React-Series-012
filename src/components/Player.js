import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faAngleLeft, 
  faAngleRight,
  faPause 
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying, songs, setCurrentSong }) => {
  useEffect(() => {
    if(isPlaying && audioRef.current.paused) {
      audioRef.current.play()
    }
  }, [isPlaying, currentSong])
  //State 
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });

  //Song Range
  const animationPercentage = (Math.round(songInfo.currentTime) / Math.round(songInfo.duration)) * 100;
  console.log(Math.round(animationPercentage))

  //Ref
  const audioRef = useRef(null);

  //Event Handler
  const playSongHandler = () => {
    //console.log(audioRef.current)
    if(isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying)
    } else { 
      audioRef.current.play();
      setIsPlaying(!isPlaying)
    }
  }

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration })
  }

  const getTime = (time) => {
    return(
      Math.floor(time / 60) + ':' + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const dragHandler = (e) => {
    //console.log(e.target.value);
    setSongInfo({...songInfo, currentTime: e.target.value});
    audioRef.current.currentTime = e.target.value;
  }

  const skipTrackHandler = (direction) => {
    // or let currentIndex = songs.indexOf(currentSong)
    // let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // if (direction === 'skip-forward') {
    //   setCurrentSong(songs[(currentIndex + 1) % songs.length] )
    //   //console.log(`next index ${currentIndex + 1}` );
    //   //console.log(`songs length ${songs.length}` );
    // } else if (direction === 'skip-back') {
    //   setCurrentSong(songs(currentIndex - 1) || songs[songs.length - 1] )
    // }art
    // //console.log(currentIndex + 1);
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newIndex = currentIndex + direction

      if(newIndex < 0) {
        newIndex = songs.length - 1
      } else if (newIndex >= songs.length) {
        newIndex = 0
      }

      setCurrentSong(songs[newIndex])
  }

  const songEndHandler = async() => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div 
          className="track"
          style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}
        >
          <input 
            min={0} 
            max={songInfo.duration || 0} 
            value={songInfo.currentTime} 
            onChange={dragHandler}
            type="range"
          />
          <div 
            className="animate-track" 
            style={{transform: `translateX(${animationPercentage}%)`}}
          ></div>
        </div>
      <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon 
          onClick={() => skipTrackHandler(-1)}
          className="skip-back" 
          size="2x" 
          icon={faAngleLeft} 
        />
        <FontAwesomeIcon 
          onClick={playSongHandler}
          className="play" 
          size="2x" 
          icon={isPlaying ? faPause : faPlay} 
        />
        <FontAwesomeIcon 
        onClick={() => skipTrackHandler(1)}
          className="skip-forward" 
          size="2x" 
          icon={faAngleRight} 
        />
      </div>
      <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} // load time
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      >
      </audio>
    </div>
  );
};

// const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;

// style={{
//     transform: `translateX(${animationPercentage}%)`
// }}

export default Player;
