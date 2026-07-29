// BlurText Component
// Word-by-word blur-in entrance animation triggered by IntersectionObserver

const BlurText = ({ text, className }) => {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Only animate once when entering view
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer && ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  const words = text.split(' ');
  const motion = window.Motion?.motion || window.Motion;

  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: '0.1em'
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={
            isInView
              ? {
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0]
                }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          transition={
            isInView
              ? {
                  duration: 0.7,
                  times: [0, 0.5, 1],
                  ease: 'easeOut',
                  delay: (i * 100) / 1000
                }
              : undefined
          }
          style={{
            display: 'inline-block',
            marginRight: '0.28em'
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

window.BlurText = BlurText;
