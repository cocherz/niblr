import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ playerRefs, isActive, currentItemIndex, index, item }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTouching, setIsTouching] = useState(false);

    const handleTouchStart = () => {
        setIsTouching(true);
        setIsPlaying(!isPlaying);
    };

    const handleTouchEnd = () => {
        setIsTouching(false);
        // setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        let timer;
        if (isActive && currentItemIndex === index && !isTouching) {
            timer = setTimeout(() => {
                setIsPlaying(true);
            }, 2000); // 2 second delay before playing
        } else {
            setIsPlaying(false);
        }

        return () => clearTimeout(timer); // Cleanup the timer on unmount or if the index changes
    }, [isActive, currentItemIndex, index, isTouching]);

    return (
        <div className="player-wrapper" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <ReactPlayer
                url={item.item_video.url}
                className="react-player"
                ref={(element) => {
                    playerRefs.current[index] = element;
                }}
                playing={isActive && currentItemIndex === index && isPlaying}
                loop
                muted
                fallback={item.content_image.url}
                playsinline
                width="100%"
                height="100%"
                onPause={() => playerRefs.current[index].player.seekTo(0)}
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
    );
}

export default VideoPlayer;