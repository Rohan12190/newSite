import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const PRELOADER_IMAGES = [
  "https://images.unsplash.com/photo-1595777712933-a3f0b06755c9?w=500&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550274455-11107a72e8a8?w=500&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558769187-a2e14e5fa5b8?w=500&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop&q=80",
];

const FINAL_IMAGE = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&h=800&fit=crop";

export const LayoutPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Start scroll animation
    const scrollDuration = 2300;

    const scrollTimer = setTimeout(() => {
      // Scroll animation ends - start zoom
      setIsZooming(true);

      if (zoomImageRef.current) {
        zoomImageRef.current.src = FINAL_IMAGE;
      }

      // Show hero after zoom starts
      const heroTimer = setTimeout(() => {
        setShowHero(true);
      }, 900);

      // Remove preloader
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1400);

      return () => {
        clearTimeout(heroTimer);
        clearTimeout(removeTimer);
      };
    }, scrollDuration);

    return () => clearTimeout(scrollTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Preloader Square */}
      {!showHero && (
        <motion.div
          className="fixed top-1/2 left-1/2 w-80 h-80 md:w-96 md:h-96 transform -translate-x-1/2 -translate-y-1/2 z-[9999] rounded-2xl overflow-hidden bg-black"
          style={{
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Image scroll container */}
          <motion.div
            ref={wrapperRef}
            className="absolute w-full"
            animate={{ y: -1500 }}
            transition={{ duration: 2.3, ease: "linear" }}
          >
            {/* Carousel images */}
            {PRELOADER_IMAGES.map((src, idx) => (
              <div key={idx} className="w-full h-80 md:h-96 overflow-hidden">
                <img
                  src={src}
                  alt={`Carousel ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Final image */}
            <div className="w-full h-80 md:h-96 overflow-hidden">
              <img
                id="finalImage"
                src={FINAL_IMAGE}
                alt="Final"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Zoom image overlay */}
      {isZooming && (
        <motion.img
          ref={zoomImageRef}
          src={FINAL_IMAGE}
          alt="Zoom"
          className="fixed top-1/2 left-1/2 w-80 h-80 md:w-96 md:h-96 z-[9998] rounded-2xl transform -translate-x-1/2 -translate-y-1/2 object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 4 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      )}

      {/* Hero background */}
      {showHero && (
        <motion.div
          className="fixed inset-0 z-[9997] w-full h-full"
          style={{
            backgroundImage: `url(${FINAL_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}

      {/* Background overlay to prevent page scroll during preload */}
      {isVisible && (
        <div className="fixed inset-0 bg-black z-[9995]" />
      )}
    </>
  );
};
