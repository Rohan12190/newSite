import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number) => void;
  /**
   * Whether to pause marquee animation on hover (mobile only)
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Number of times to repeat the content in marquee (mobile only)
   * @default 4
   */
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  title = "Browse my collection",
  archiveButton = {
    text: "View gallery",
    href: "#",
  },
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4,
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const defaultImages = [
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
      alt: "Fashion Design",
    },
    {
      src: "https://images.unsplash.com/photo-1595777712933-a3f0b06755c9?w=800&h=600&fit=crop&q=80",
      alt: "Designer Collection",
    },
    {
      src: "https://images.unsplash.com/photo-1550274455-11107a72e8a8?w=800&h=600&fit=crop&q=80",
      alt: "Elegant Fashion",
    },
    {
      src: "https://images.unsplash.com/photo-1558769187-a2e14e5fa5b8?w=800&h=600&fit=crop&q=80",
      alt: "Premium Styling",
    },
    {
      src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop&q=80",
      alt: "Luxury Design",
    },
    {
      src: "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=800&h=600&fit=crop&q=80",
      alt: "Fashion Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1539008588199-487012d95a81?w=800&h=600&fit=crop&q=80",
      alt: "Creative Design",
    },
    {
      src: "https://images.unsplash.com/photo-1551028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      alt: "Studio Work",
    },
    {
      src: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=600&fit=crop&q=80",
      alt: "Fashion Forward",
    },
    {
      src: "https://images.unsplash.com/photo-1595614535368-6b4ee3b999b3?w=800&h=600&fit=crop&q=80",
      alt: "Signature Pieces",
    },
  ];

  const images = customImages || defaultImages;

  return (
    <section
      aria-label={title}
      className={`relative min-h-screen py-20 px-4 bg-background ${className}`}
      id="archives"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto bg-background/50 backdrop-blur-sm rounded-3xl border border-border overflow-hidden relative">
        {/* Header Section */}
        <div className="relative z-10 text-center pt-16 pb-8 px-8">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-8 text-balance">
            {title}
          </h2>

          <a
            href={archiveButton.href}
            className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors group mb-20"
          >
            <span>{archiveButton.text}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Desktop 3D overlapping layout - hidden on mobile */}
        <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[200px]">
          <div
            className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}
          >
            {images.map((image, index) => {
              // Calculate stagger height - peak in middle, descending to edges
              const totalImages = images.length;
              const middle = Math.floor(totalImages / 2);
              const distanceFromMiddle = Math.abs(index - middle);
              const staggerOffset = maxHeight - distanceFromMiddle * 20;

              const zIndex = totalImages - index;
              const isHovered = hoveredIndex === index;
              const isOtherHovered =
                hoveredIndex !== null && hoveredIndex !== index;

              // When hovering: hovered card moves to consistent top position, others move to baseline
              const yOffset = isHovered
                ? -120
                : isOtherHovered
                  ? 0
                  : -staggerOffset;

              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer flex-shrink-0"
                  style={{
                    zIndex: zIndex,
                  }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    onImageClick?.(index);
                  }}
                >
                  <div
                    className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                        rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                        rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                        rgba(0, 0, 0, 0.15) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover object-left-top group-hover:brightness-110 transition-all duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Decorative border */}
                    <div className="absolute inset-0 rounded-xl border border-accent/0 group-hover:border-accent/50 transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile marquee layout */}
        <div className="block md:hidden relative pb-8">
          <div
            className={cn(
              "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
              "flex-row",
            )}
          >
            {Array(marqueeRepeat)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)]",
                    "animate-marquee flex-row",
                    {
                      "group-hover:[animation-play-state:paused]": pauseOnHover,
                    },
                  )}
                >
                  {images.map((image, index) => (
                    <div
                      key={`${i}-${index}`}
                      className="group cursor-pointer flex-shrink-0"
                      onClick={() => {
                        setSelectedImageIndex(index);
                        onImageClick?.(index);
                      }}
                    >
                      <div
                        className="relative aspect-video w-64 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                        style={{
                          boxShadow: `
                            rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                            rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                            rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                            rgba(0, 0, 0, 0.15) 20px 0px 20px 0px
                          `,
                        }}
                      >
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-full object-cover object-left-top group-hover:brightness-110 transition-all duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Modal content */}
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image container - 3/4 of screen */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50">
                <img
                  src={images[selectedImageIndex]?.src || "/placeholder.svg"}
                  alt={images[selectedImageIndex]?.alt || "Selected image"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute -top-12 right-0 md:-top-16 md:right-0 p-2 text-white hover:text-accent transition-colors"
                aria-label="Close"
              >
                <X className="w-8 h-8 md:w-10 md:h-10" />
              </button>

              {/* Image title and info section */}
              <motion.div
                className="mt-6 p-4 md:p-6 bg-card rounded-lg border border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">
                  {images[selectedImageIndex]?.title ||
                    images[selectedImageIndex]?.alt}
                </h3>
                <p className="text-foreground/70 text-sm md:text-base">
                  Click the close button or click outside to dismiss
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
