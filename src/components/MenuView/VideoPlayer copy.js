import React, { useEffect } from 'react'
import ReactPlayer from 'react-player';


const VideoPlayer = ({ playerRefs, isActive, currentItemIndex, index, item}) => {

//    const [playing, setPlaying] = React.useState(true);


    const pauseVideo = (player) => {
        player.getInternalPlayer().pause();
        
    }

    const handleVideoClick = () => {
        const player = playerRefs.current[index];
        
        
        player.player.isPlaying ? pauseVideo(player) : player.getInternalPlayer().play();
}

    return (
        <div className="player-wrapper">
        <ReactPlayer
          url={item.item_video.url}
          className="react-player"
          ref={(element) => {
            playerRefs.current[index] = element;
          }}
          playing={playerRefs.current[index].player.isPlaying && isActive && currentItemIndex === index}
          loop
          muted
          playsinline
          onPlay={() => setTimeout(() => playerRefs.current[index].player.seekTo(0), 1000)}
          onPause={() => playerRefs.current[index].player.seekTo(0) }
         width="100%"
         height="100%"
         onClick={handleVideoClick}
         config={{
           file: {
             attributes: {
               poster: item.content_image.url,
               style: { 
                 objectFit: "cover",
                 height: "100%",
                 width: "100%",
                 display: "flex",
                 overflow: "hidden",
               }
             }
           }
         }}
        />
      </div>
    )
}

export default VideoPlayer

