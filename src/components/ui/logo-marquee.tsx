"use client";

import React, { memo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "framer-motion";
import useMeasure from "react-use-measure";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const size = direction === "horizontal" ? width : height;
    if (!size) return;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    let controls;

    if (isTransitioning) {
      const travelDistance = contentSize / 2;
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration:
          currentDuration * Math.abs((translation.get() - to) / travelDistance),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prev) => prev + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  return (
    <div className="flex items-center gap-3 sm:gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-black border border-zinc-800 hover:border-sky-400/60 hover:bg-zinc-950 transition-all duration-200 group/logo shadow-md">
      <div className="w-6 sm:w-7 h-6 sm:h-7 shrink-0 flex items-center justify-center">
        <img
          alt={logo.alt}
          src={logo.src}
          width={28}
          height={28}
          loading="lazy"
          className="pointer-events-none w-full h-full object-contain select-none transition-transform duration-200 group-hover/logo:scale-110"
        />
      </div>
      <span className="text-sm sm:text-base font-mono text-zinc-200 font-semibold select-none whitespace-nowrap group-hover/logo:text-sky-300 transition-colors">
        {logo.alt}
      </span>
    </div>
  );
});

export const LogoMarquee = memo(function LogoMarquee({
  logos,
  className,
  duration = 24,
  durationOnHover = 45,
  gap = 20,
  reverse = false,
}: {
  logos: Logo[];
  className?: string;
  duration?: number;
  durationOnHover?: number;
  gap?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden py-1.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <InfiniteSlider gap={gap} reverse={reverse} duration={duration} durationOnHover={durationOnHover}>
        {logos.map((logo, i) => (
          <LogoImage key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";
export default LogoMarquee;

