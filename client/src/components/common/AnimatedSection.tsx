
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationVariant = 
  | "fade-in"
  | "fade-in-left" 
  | "fade-in-right" 
  | "scale-in" 
  | "slide-up" 
  | "slide-down";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  variant = "fade-in",
  delay = 0,
  threshold = 0.2,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: threshold
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "transition-opacity duration-700 ease-out",
        isVisible
          ? `animate-${variant}`
          : "opacity-0",
        delay > 0 && `animation-delay-${delay}`,
        className
      )}
      style={{ 
        animationDelay: delay > 0 ? `${delay}ms` : undefined,
        animationPlayState: isVisible ? "running" : "paused"
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
