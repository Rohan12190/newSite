import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const PageLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  const loaderCircleVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="visible"
      exit="exit"
      className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-[9999]"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Outer rotating ring */}
        <motion.div
          variants={loaderCircleVariants}
          animate="animate"
          className="relative w-24 h-24"
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#C79E8E",
              borderRightColor: "#C79E8E",
            }}
          />

          {/* Inner pulsing circle */}
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute inset-4 rounded-full"
            style={{ backgroundColor: "#C79E8E", opacity: 0.2 }}
          />

          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: "#C79E8E" }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div variants={textVariants} animate="animate" className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#C79E8E" }}>
            Loading
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
