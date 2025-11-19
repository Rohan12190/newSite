"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [entryRefs, setEntryRefs] = useState<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="w-full bg-background dark:bg-background font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-foreground dark:text-foreground max-w-4xl">
          Professional Experience
        </h2>
        <p className="text-foreground/70 dark:text-foreground/70 text-sm md:text-base max-w-sm">
          A journey through design, craftsmanship, and creative excellence.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-0"
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
              ref={(el) => {
                const refs = [...entryRefs];
                refs[index] = el;
                setEntryRefs(refs);
              }}
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background dark:bg-background flex items-center justify-center border-2" style={{ borderColor: "#C79E8E" }}>
                  <div className="h-4 w-4 rounded-full p-2" style={{ backgroundColor: "#C79E8E" }} />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-serif font-bold" style={{ color: "#C79E8E" }}>
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-serif font-bold" style={{ color: "#C79E8E" }}>
                  {item.title}
                </h3>
                {item.content}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border dark:via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
            style={{
              background: `linear-gradient(to top, #C79E8E, rgba(199, 158, 142, 0.3), transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
