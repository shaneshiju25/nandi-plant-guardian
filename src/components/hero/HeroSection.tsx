import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DroneAnimation } from "./DroneAnimation";
import { SunAnimation } from "./SunAnimation";
import { GrassAnimation } from "./GrassAnimation";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Sky Background */}
      <div 
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Sun - positioned at top */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-0">
        <SunAnimation />
      </div>
      
      {/* Drone */}
      <DroneAnimation />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 lg:pt-40 pb-40">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Crop Protection
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hero-title text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground mb-6"
          >
            Nandi Drone
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Revolutionizing agriculture with AI-powered drone imaging. 
            Detect plant diseases early, protect your crops, and maximize your yield.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/upload">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 group"
              >
                Start Detection
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold rounded-xl border-2 group"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
          >
            {[
              { value: "99.2%", label: "Detection Accuracy" },
              { value: "50+", label: "Crop Diseases" },
              { value: "10K+", label: "Scans Completed" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-4xl font-bold font-display text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Grass */}
      <GrassAnimation />
    </section>
  );
}
