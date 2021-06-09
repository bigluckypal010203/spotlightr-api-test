import { useEffect } from "react";

export default function IndexPage() {
  const videoID = "MTExMjc4Nw==";
  let videoProgress = 0;
  let videoDuration = 0;

  const getTime = (time) => {
    const currentVideoProgress = Math.trunc((time / videoDuration) * 100);
    if (videoProgress !== currentVideoProgress) {
      videoProgress = currentVideoProgress;
      console.log("Video progress: ", `${videoProgress}%`);
    }
  };

  const getDurationCallback = (duration) => {
    console.log("Video duration:", duration);
    videoDuration = duration;
    const array = Array.from({ length: Math.trunc(duration) }, (_, i) => i + 1);
    window.vooAPI(videoID, "getTime", array, getTime);
  };

  const vooPlayerReady = (event) => {
    console.log("Spotlightr ready");
    window.vooAPI(videoID, "getDuration", null, getDurationCallback);
  };

  useEffect(() => {
    const spotlightrScript = document.createElement("script");
    spotlightrScript.id = "spotlightrScript";
    spotlightrScript.src =
      "https://bigluckypal.cdn.spotlightr.com/assets/vooplayer.js";

    document.head.append(spotlightrScript);
    document.addEventListener("vooPlayerReady", vooPlayerReady, false);

    return () => {
      document.getElementById("spotlightrScript").remove();
      document.removeEventListener("vooPlayerReady", vooPlayerReady, false);
      console.log("Reporting video progress", videoProgress);
    };
  });

  return (
    <div>
      <h2>Old player</h2>
      <iframe
        title="spotlightrIframe"
        allow="autoplay"
        className="video-player-container spotlightr"
        data-playerid={videoID}
        style={{ maxWidth: "100%", height: "100%" }}
        name="videoPlayerframe"
        allowFullScreen={true}
        src={`https://bigluckypal.cdn.spotlightr.com/publish/${videoID}`}
        watch-type=""
        url-params=""
        frameBorder="0"
        scrolling="no"
      />
      <div>
        <a href="/old-player">
          <button>Old player</button>
        </a>
        <a href="/new-player">
          <button>New player</button>
        </a>
      </div>
    </div>
  );
}
