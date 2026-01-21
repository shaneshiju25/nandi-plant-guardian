import { motion } from "framer-motion";

function GrassBlade({ 
  delay = 0, 
  height = 60, 
  x = 0 
}: { 
  delay?: number; 
  height?: number; 
  x?: number;
}) {
  return (
    <motion.div
      animate={{ rotate: [-3, 3, -3] }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="absolute bottom-0 origin-bottom"
      style={{ 
        left: `${x}%`,
        height: `${height}px`,
        width: "4px",
      }}
    >
      <div 
        className="w-full h-full rounded-t-full"
        style={{
          background: `linear-gradient(to top, hsl(120 45% 30%), hsl(95 65% ${45 + Math.random() * 15}%))`,
        }}
      />
    </motion.div>
  );
}

export function GrassAnimation() {
  // Generate random grass positions
  const grassBlades = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: (i / 100) * 100 + Math.random() * 1 - 0.5,
    height: 40 + Math.random() * 60,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
      {/* Grass Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: "linear-gradient(to top, hsl(120 45% 30%) 0%, hsl(95 60% 40%) 60%, transparent 100%)" 
        }}
      />
      
      {/* Individual Grass Blades */}
      <div className="relative h-full">
        {grassBlades.map((blade) => (
          <GrassBlade
            key={blade.id}
            x={blade.x}
            height={blade.height}
            delay={blade.delay}
          />
        ))}
      </div>
      
      {/* Grass Highlights */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-50">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className="absolute bottom-0 w-6 h-8 rounded-t-full"
            style={{
              left: `${(i / 20) * 100}%`,
              background: "linear-gradient(to top, transparent, hsl(95 80% 60% / 0.3))",
            }}
          />
        ))}
      </div>
    </div>
  );
}
