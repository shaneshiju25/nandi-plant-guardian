import { motion } from "framer-motion";

export function SunAnimation() {
  return (
    <div className="relative pointer-events-none">
      {/* Outer Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(45 100% 75% / 0.4) 0%, hsl(38 100% 60% / 0.2) 40%, transparent 70%)",
        }}
      />
      
      {/* Middle Glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(45 100% 80% / 0.5) 0%, hsl(38 100% 65% / 0.3) 50%, transparent 70%)",
        }}
      />
      
      {/* Sun Core */}
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-[180px] h-[180px] rounded-full shadow-2xl"
        style={{
          background: "radial-gradient(circle at 30% 30%, hsl(50 100% 85%), hsl(45 100% 65%) 50%, hsl(38 100% 55%))",
          boxShadow: "0 0 60px hsl(45 100% 60% / 0.6), 0 0 120px hsl(38 100% 50% / 0.4)",
        }}
      />
      
      {/* Sun Rays */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          className="absolute top-1/2 left-1/2 w-1 h-24 origin-bottom"
          style={{
            background: "linear-gradient(to top, hsl(45 100% 70% / 0.6), transparent)",
            transform: `translate(-50%, -100%) rotate(${i * 30}deg) translateY(-90px)`,
          }}
        />
      ))}
    </div>
  );
}
