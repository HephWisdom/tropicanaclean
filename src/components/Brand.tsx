import { Children, cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { Star } from "lucide-react";

export function Motif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      className={`motif ${className}`}
    >
      <path d="M32 30C8 27 8 3 22 5c11 1 10 17 10 25ZM34 32C37 8 61 8 59 22c-1 11-17 10-25 10ZM32 34c24 3 24 27 10 25-11-1-10-17-10-25ZM30 32C27 56 3 56 5 42c1-11 17-10 25-10Z" />
    </svg>
  );
}

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#home" className={`logo ${footer ? "logo-footer" : ""}`}>
      <Motif />
      <span>
        Tropicana<span className="logo-light">Clean</span>
        <span className="logo-tagline">THE ART OF A CLEANER SPACE</span>
      </span>
    </a>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.65em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function revealWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((word, index) =>
        word.trim() ? (
          <motion.span
            className="animated-word"
            variants={wordVariants}
            key={index}
          >
            {word}
          </motion.span>
        ) : (
          word
        ),
      );
    }
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === "span"
    ) {
      return cloneElement(child, undefined, revealWords(child.props.children));
    }
    return child;
  });
}

export function AnimatedHeading({
  children,
  as = "h2",
  id,
}: {
  children: ReactNode;
  as?: "h1" | "h2";
  id: string;
}) {
  const reduced = useReducedMotion();
  const Heading = as === "h1" ? motion.h1 : motion.h2;
  return (
    <Heading
      id={id}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        staggerChildren: reduced ? 0 : 0.045,
        delayChildren: reduced ? 0 : 0.08,
      }}
    >
      {reduced ? children : revealWords(children)}
    </Heading>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
export function Stars() {
  return (
    <span className="stars" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}
