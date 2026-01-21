import { motion } from "framer-motion";
import { Upload, FileBarChart, MessageSquare, Leaf, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Upload,
    title: "Upload Drone Images",
    description: "Easily upload high-resolution drone-captured crop images for instant AI analysis.",
    link: "/upload",
    color: "bg-sky-medium/10 text-sky-medium",
  },
  {
    icon: FileBarChart,
    title: "Get AI Reports",
    description: "Receive detailed disease detection reports with confidence scores and recommendations.",
    link: "/report",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageSquare,
    title: "Chat with AI",
    description: "Get personalized agricultural guidance from our AI assistant trained on crop science.",
    link: "/chat",
    color: "bg-accent/10 text-accent-foreground",
  },
];

const benefits = [
  {
    icon: Leaf,
    title: "Early Detection",
    description: "Identify diseases before visible symptoms appear",
  },
  {
    icon: Shield,
    title: "Crop Protection",
    description: "Prevent spread with targeted treatment recommendations",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get results in seconds with our advanced AI models",
  },
];

export function FeatureSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform makes crop disease detection simple and effective
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={feature.link}>
                <div className="group h-full bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-primary-foreground mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-primary-foreground/70 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
