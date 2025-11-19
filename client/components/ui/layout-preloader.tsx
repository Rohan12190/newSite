import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LayoutPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  };

  const contentVariants = {
    animate: {
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 3,
        times: [0, 0.3, 0.7, 1],
      },
    },
  };

  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        ease: "linear",
      },
    },
  };

  const scaleVariants = {
    animate: {
      scale: [0.8, 1, 1, 0.8],
      transition: {
        duration: 3,
        times: [0, 0.3, 0.7, 1],
      },
    },
  };

  const shimmerVariants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="visible"
      exit="exit"
      className="fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)",
      }}
    >
      {/* Animated background noise overlay */}
      <div className="absolute inset-0 opacity-20 animate-noise">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0%" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
        </svg>
      </div>

      {/* Main content */}
      <motion.div
        variants={contentVariants}
        animate="animate"
        className="relative z-10 flex flex-col items-center gap-12"
      >
        {/* Animated background elements */}
        <div className="relative w-40 h-40">
          {/* Outer ring */}
          <motion.div
            variants={rotateVariants}
            animate="animate"
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#C79E8E",
              borderRightColor: "#C79E8E",
            }}
          />

          {/* Middle ring */}
          <motion.div
            variants={rotateVariants}
            animate="animate"
            className="absolute inset-6 rounded-full border border-transparent"
            style={{
              borderBottomColor: "#C79E8E",
              borderLeftColor: "#C79E8E",
              animationDirection: "reverse",
              animationDuration: "4s",
            }}
          />

          {/* Inner pulsing circle */}
          <motion.div
            variants={scaleVariants}
            animate="animate"
            className="absolute inset-12 rounded-full"
            style={{
              background: `linear-gradient(135deg, #C79E8E, rgba(199, 158, 142, 0.3))`,
            }}
          />

          {/* Center dot with shimmer */}
          <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: "#C79E8E",
              backgroundImage: "linear-gradient(90deg, #C79E8E, rgba(255,255,255,0.3), #C79E8E)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>

        {/* Loading text */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl font-serif font-bold"
            style={{ color: "#C79E8E" }}
          >
            Loading
          </motion.h2>

          {/* Animated dots */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#C79E8E" }}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: "#C79E8E" }}
        >
          Please wait while we prepare your portfolio
        </motion.p>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl opacity-10" style={{ backgroundColor: "#C79E8E" }} />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full blur-3xl opacity-10" style={{ backgroundColor: "#C79E8E" }} />
    </motion.div>
  );
};
