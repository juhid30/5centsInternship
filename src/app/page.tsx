"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Pen, Users, Shield, ArrowRight } from "lucide-react";
interface FeatureCardProps {
  icon: React.ElementType; // The type for the icon is a component (like Lucide's icon components)
  title: string;
  description: string;
  index: number;
}
const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {
  const cardRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // Ensures the animation happens once when the element comes into view
    amount: 0.2, // The element will trigger when 20% is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
      <div className="card p-8 bg-white/80 backdrop-blur-sm relative z-10 h-full border border-gray-100 hover:border-primary/20 transition-colors duration-300">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true); // Track loading state

  const router = useRouter();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  // Simulate loading by delaying the content rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-solid rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        ref={targetRef}
        style={{ opacity, scale, y }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Share Your Story with the World
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join our community of writers, thinkers, and storytellers. Create,
              share, and discover amazing content.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Link
                href="/register"
                className="group relative px-8 py-4 bg-white text-gray-900 rounded-full overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <span className="relative z-10 font-semibold flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
              <Link
                href="/explore"
                className="group px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors duration-300 font-semibold"
              >
                Explore Posts
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Why Choose PostHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of content creation with our powerful
              platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Pen}
              title="Easy to Write"
              description="Our intuitive editor makes it simple to create beautiful posts with rich formatting and media support."
              index={0}
            />
            <FeatureCard
              icon={Users}
              title="Growing Community"
              description="Connect with readers and writers who share your interests and passions in our vibrant community."
              index={1}
            />
            <FeatureCard
              icon={Shield}
              title="Secure Platform"
              description="Your content is protected with enterprise-grade security and regular backups for peace of mind."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[#74280bcd]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Start Writing?
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Join thousands of writers who have already found their home on
            PostHub.
          </p>
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full overflow-hidden transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            Create Your Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-30" />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 bg-primary/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                PostHub
              </h3>
              <p className="text-gray-600">
                Share your stories with the world.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                {["Explore", "Trending", "Write"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {["About", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-center text-gray-500">
              &copy; {new Date().getFullYear()} PostHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
