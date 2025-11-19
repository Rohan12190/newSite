import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PRELOADER_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1595777712933-a3f0b06755c9?w=500&h=500&fit=crop&q=80",
    alt: "Designer Collection",
  },
  {
    src: "https://images.unsplash.com/photo-1550274455-11107a72e8a8?w=500&h=500&fit=crop&q=80",
    alt: "Elegant Fashion",
  },
  {
    src: "https://images.unsplash.com/photo-1558769187-a2e14e5fa5b8?w=500&h=500&fit=crop&q=80",
    alt: "Premium Styling",
  },
  {
    src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop&q=80",
    alt: "Luxury Design",
  },
  // Final hero image
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&h=800&fit=crop",
    alt: "Khushi Lohchab",
    isHero: true,
  },
];

export const LayoutPreloader = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);

  const isLastImage = currentImageIndex === PRELOADER_IMAGES.length - 1;
  const currentImage = PRELOADER_IMAGES[currentImageIndex];

  useEffect(() => {
    if (isZooming) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (isLastImage) {
      const timer = setTimeout(() => {
        setIsZooming(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, 600);

    return () => clearTimeout(timer);
  }, [currentImageIndex, isLastImage, isZooming]);

  const containerVariants = {
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    enter: {
      y: 400,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      y: -400,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const squareContainerVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    zoom: {
      scale: 2,
      opacity: 0,
      transition: {
        duration: 1.2,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };

  const dotVariants = {
    inactive: {
      opacity: 0.4,
      width: "8px",
    },
    active: {
      opacity: 1,
      width: "24px",
      transition: {
        width: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="visible"
      exit="exit"
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-background overflow-hidden"
    >
      {/* Background blur elements */}
      <div className="absolute inset-0 opacity-20 animate-noise">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0%" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: "#C79E8E" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: "#C79E8E" }} />

      {/* Main carousel square container */}
      <motion.div
        variants={isZooming ? squareContainerVariants : undefined}
        initial={isZooming ? "initial" : undefined}
        animate={isZooming ? "zoom" : undefined}
        className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: `
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(0, 0, 0, 0.05),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Image carousel */}
        <AnimatePresence mode="wait">
          {!isZooming && (
            <motion.img
              key={`image-${currentImageIndex}`}
              src={currentImage.src}
              alt={currentImage.alt}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
        </AnimatePresence>

        {/* Overlay gradient on carousel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

        {/* Content overlay - only on final image */}
        {isLastImage && !isZooming && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end pb-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#C79E8E" }}>
                Fashion Designer
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">KHUSHI</h1>
              <h1 className="text-4xl md:text-5xl font-serif font-bold" style={{ color: "#C79E8E" }}>
                LOHCHAB
              </h1>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Progress indicators below carousel */}
      {!isZooming && (
        <motion.div
          className="absolute bottom-24 flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {PRELOADER_IMAGES.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 rounded-full bg-white/60"
              variants={dotVariants}
              initial="inactive"
              animate={index === currentImageIndex ? "active" : "inactive"}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
