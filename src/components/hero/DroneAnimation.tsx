import { motion } from "framer-motion";

export function DroneAnimation() {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "calc(100vw + 100%)" }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute top-[35%] z-20 pointer-events-none"
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Drone Body */}
        <svg
          width="80"
          height="50"
          viewBox="0 0 80 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Main Body */}
          <ellipse cx="40" cy="28" rx="16" ry="10" className="fill-foreground/90" />
          
          {/* Camera */}
          <circle cx="40" cy="32" r="4" className="fill-drone-accent" />
          <circle cx="40" cy="32" r="2" className="fill-foreground/60" />
          
          {/* Arms */}
          <rect x="10" y="24" width="60" height="4" rx="2" className="fill-foreground/80" />
          <rect x="36" y="10" width="8" height="20" rx="2" className="fill-foreground/80" />
          
          {/* Propeller Guards */}
          <circle cx="10" cy="26" r="8" className="stroke-foreground/60" strokeWidth="2" fill="none" />
          <circle cx="70" cy="26" r="8" className="stroke-foreground/60" strokeWidth="2" fill="none" />
          <circle cx="40" cy="10" r="6" className="stroke-foreground/60" strokeWidth="2" fill="none" />
          
          {/* Propellers (animated) */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "10px 26px" }}
          >
            <rect x="4" y="25" width="12" height="2" rx="1" className="fill-foreground/40" />
          </motion.g>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "70px 26px" }}
          >
            <rect x="64" y="25" width="12" height="2" rx="1" className="fill-foreground/40" />
          </motion.g>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "40px 10px" }}
          >
            <rect x="35" y="9" width="10" height="2" rx="1" className="fill-foreground/40" />
          </motion.g>
          
          {/* LED Lights */}
          <motion.circle
            cx="24"
            cy="26"
            r="2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="fill-success"
          />
          <motion.circle
            cx="56"
            cy="26"
            r="2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
            className="fill-destructive"
          />
          
          {/* Landing Gear */}
          <rect x="30" y="36" width="4" height="8" rx="1" className="fill-foreground/60" />
          <rect x="46" y="36" width="4" height="8" rx="1" className="fill-foreground/60" />
          <rect x="26" y="42" width="12" height="3" rx="1" className="fill-foreground/50" />
          <rect x="42" y="42" width="12" height="3" rx="1" className="fill-foreground/50" />
        </svg>
        
        {/* Drone Shadow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/10 rounded-full blur-sm"
        />
      </motion.div>
    </motion.div>
  );
}
