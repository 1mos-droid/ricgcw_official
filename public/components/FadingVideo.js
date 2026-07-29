// FadingVideo Component
// Custom JS crossfade using requestAnimationFrame (no CSS transitions)

const FadingVideo = ({ src, className, style }) => {
  const videoRef = React.useRef(null);
  const rafIdRef = React.useRef(null);
  const fadingOutRef = React.useRef(false);

  const fadeTo = (target, duration) => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    const video = videoRef.current;
    if (!video) return;

    const startOpacity = parseFloat(video.style.opacity) || 0;
    const opacityDiff = target - startOpacity;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + opacityDiff * progress;
      video.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    fadingOutRef.current = false;
    video.style.opacity = '0';

    const handleLoadedData = () => {
      video.style.opacity = '0';
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          fadeTo(1, 500);
        }).catch(err => {
          console.log("Play interrupted or blocked:", err);
        });
      } else {
        fadeTo(1, 500);
      }
    };

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      if (duration && !fadingOutRef.current) {
        const remaining = duration - currentTime;
        if (remaining <= 0.55 && remaining > 0) {
          fadingOutRef.current = true;
          fadeTo(0, 500);
        }
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        const startPlay = () => {
          fadingOutRef.current = false;
          fadeTo(1, 500);
        };
        if (playPromise !== undefined) {
          playPromise.then(startPlay).catch(err => {
            console.log("Loop play failed:", err);
          });
        } else {
          startPlay();
        }
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      muted
      playsInline
      preload="auto"
    />
  );
};

window.FadingVideo = FadingVideo;
