import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-border rounded-full bg-background/80 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative text-foreground items-center flex space-x-1 hover:text-accent transition-colors duration-300"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm font-semibold">
              {navItem.name}
            </span>
          </a>
        ))}
        <a
          href="#archives"
          className="border text-sm font-semibold relative border-border text-foreground px-4 py-2 rounded-full hover:bg-foreground/5 transition-colors inline-block"
        >
          <span>Portfolio</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-accent to-transparent h-px" />
        </a>
      </motion.nav>
    </AnimatePresence>
  );
};
