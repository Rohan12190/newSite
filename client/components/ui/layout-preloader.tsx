import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PRELOADER_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1595777712933-a3f0b06755c9?w=1000&h=800&fit=crop&q=80",
    alt: "Designer Collection",
  },
  {
    src: "https://images.unsplash.com/photo-1550274455-11107a72e8a8?w=1000&h=800&fit=crop&q=80",
    alt: "Elegant Fashion",
  },
  {
    src: "https://images.unsplash.com/photo-1558769187-a2e14e5fa5b8?w=1000&h=800&fit=crop&q=80",
    alt: "Premium Styling",
  },
  {
    src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&h=800&fit=crop&q=80",
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
    }, 800);

    return () => clearTimeout(timer);
  }, [currentImageIndex, isLastImage, isZooming]);

  const containerVariants = {
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 0.9,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  const zoomVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    zoom: {
      scale: 1.5,
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

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 },
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
      {/* Image Container with Zoom Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        variants={isZooming ? zoomVariants : undefined}
        initial={isZooming ? "initial" : undefined}
        animate={isZooming ? "zoom" : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`image-${currentImageIndex}`}
            src={currentImage.src}
            alt={currentImage.alt}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </motion.div>

      {/* Content - Only show if not zooming */}
      {!isZooming && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-12 z-10 pointer-events-none"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.3,
              },
            },
          }}
        >
          {/* Hero text - only on final image */}
          {isLastImage && (
            <motion.div
              className="text-center mb-8"
              variants={textVariants}
            >
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-3"
                style={{ color: "#C79E8E" }}
              >
                Fashion Designer
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-1">
                KHUSHI
              </h1>
              <h1 className="text-5xl md:text-6xl font-serif font-bold" style={{ color: "#C79E8E" }}>
                LOHCHAB
              </h1>
            </motion.div>
          )}

          {/* Progress indicators */}
          <motion.div
            className="flex items-center gap-2"
            variants={textVariants}
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
        </motion.div>
      )}

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none animate-noise mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0%" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
        </svg>
      </div>
    </motion.div>
  );
};
