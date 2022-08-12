import { useRef, useState } from "react";

function LatestGame(props) {
  let [showControls, updateShowControls] = useState(false);
  const video = useRef(null);

  function onClickPlay() {
    updateShowControls(true);
    video.current.play();
  }

  return (
    <div className="latest-game">
      <div className="video">
      <video 
        {...showControls && {controls: true}} 
        src={"/img/videos/" + props.latestGame.details.videoUrl} 
        type="video/mp4" 
        poster={"/img/images/" + props.latestGame.images[0]}
        ref={video}
        />
        {!showControls && (
          <div className="layer">
            <p className="description"><span>Watch</span> the <br/>video</p>
            <img src="/play.png" onClick={() => onClickPlay()} />
          </div>
        )}
      </div>
      <div className="content">
        <p className="title">{props.latestGame.name}</p>
        <p className="description">{props.latestGame.details.description}</p>
        <div className="divider" />
        <div className="genres">
          {props.latestGame.genres.map(item => (
            <p className="item" key={item}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LatestGame;