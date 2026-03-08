import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  ArrowRight,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Layout,
  Database,
  Cloud,
  Layers,
  Wrench,
  Sparkles,
  Zap,
  Server,
  Shield,
  BarChart,
  Send,
  Smartphone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Bot
} from "lucide-react";
import { cn } from "./lib/utils";

// --- Background Effects ---

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.05), transparent 40%)`,
      }}
    />
  );
};

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 mask-radial-faded" />
      {/* Soft animated gradient beam - Emerald tinted */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
    </div>
  );
};

const ParticleDrift = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-500/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [null, Math.random() * -500],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// --- UI Components ---

const Button = ({
  children,
  className,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "primary" | "outline" }) => {
  const variants = {
    default: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] text-white",
    primary: "bg-emerald-500 border-emerald-400 hover:bg-emerald-400 hover:border-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] text-black font-semibold",
    outline: "bg-transparent border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50 text-emerald-400"
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 text-sm transition-all duration-300 border rounded-full group",
        variants[variant],
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "default" && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </button>
  );
};

const SpotlightCard = ({
  children,
  className,
  delay = 0,
  spotlightColor = "rgba(16, 185, 129, 0.15)"
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  spotlightColor?: string;
  key?: React.Key;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-black/60",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Border beam effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      <CursorGlow />
      <GridBackground />
      <ParticleDrift />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pt-6 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-6 px-6 py-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full">
          {[
            { id: 'hero', label: 'Home' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Work' },
            { id: 'experience', label: 'Experience' },
            { id: 'services', label: 'Services' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm px-2 py-1 text-white/60 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-32 md:py-40">
        {/* 1. Hero Section (The Hook) */}
        <motion.section
          id="hero"
          className="flex flex-col items-start gap-8 mb-40"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono text-emerald-400/80 border border-emerald-500/20 rounded-full bg-emerald-500/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AI-Forward Solution Architect
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
            Engineering the <br />
            <span className="text-gradient">Intelligent Web</span> <br />
            of 2026.
          </h1>

          <p className="max-w-2xl text-xl text-white/50 leading-relaxed font-light">
            Architecting real-time, AI-driven solutions that transform complex data into actionable insights.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Button variant="primary" onClick={() => scrollToSection('projects')}>
              View My Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" onClick={() => scrollToSection('contact')}>
              Schedule a Strategy Call <Calendar className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-4 px-4 ml-2">
              <a
                href="https://github.com/VaibhavTaragi"
                target="_blank"
                rel="noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/vaibhav-taragi/"
                target="_blank"
                rel="noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* 2. Skills Bento Grid */}
        <section id="skills" className="mb-40 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight">Master Stack</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/20 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
            {/* Tier 1: Large Tiles */}
            <SpotlightCard delay={0.1} className="col-span-2 md:col-span-6 flex flex-col justify-center p-8 min-h-[160px]">
              <Layout className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold">React 19 & Next.js 15</h3>
              <p className="text-white/50 text-sm mt-2">App Router, Server Components, Server Actions</p>
            </SpotlightCard>
            
            <SpotlightCard delay={0.15} className="col-span-2 md:col-span-3 flex flex-col justify-center p-8 min-h-[160px]">
              <Server className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold">NodeJS</h3>
              <p className="text-white/50 text-sm mt-2">Scalable Backend</p>
            </SpotlightCard>

            <SpotlightCard delay={0.2} className="col-span-2 md:col-span-3 flex flex-col justify-center p-8 min-h-[160px] border-emerald-500/30 bg-emerald-500/5">
              <Bot className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold">AI Integration</h3>
              <p className="text-white/50 text-sm mt-2">Gemini, RAG, Agents</p>
            </SpotlightCard>

            {/* Tier 2: Medium Tiles */}
            <SpotlightCard delay={0.25} className="col-span-1 md:col-span-3 flex flex-col items-center text-center p-6">
              <Code2 className="w-6 h-6 text-white/70 mb-3" />
              <span className="font-medium">TypeScript</span>
            </SpotlightCard>
            <SpotlightCard delay={0.3} className="col-span-1 md:col-span-3 flex flex-col items-center text-center p-6">
              <Wrench className="w-6 h-6 text-white/70 mb-3" />
              <span className="font-medium">Tailwind CSS</span>
            </SpotlightCard>
            <SpotlightCard delay={0.35} className="col-span-1 md:col-span-2 flex flex-col items-center text-center p-6">
              <Shield className="w-6 h-6 text-white/70 mb-3" />
              <span className="font-medium">Clerk Auth</span>
            </SpotlightCard>
            <SpotlightCard delay={0.4} className="col-span-1 md:col-span-2 flex flex-col items-center text-center p-6">
              <Zap className="w-6 h-6 text-white/70 mb-3" />
              <span className="font-medium">Ingest</span>
            </SpotlightCard>
            <SpotlightCard delay={0.45} className="col-span-2 md:col-span-2 flex flex-col items-center text-center p-6">
              <Layers className="w-6 h-6 text-white/70 mb-3" />
              <span className="font-medium">Shadcn UI</span>
            </SpotlightCard>

            {/* Tier 3: Small Tiles */}
            <SpotlightCard delay={0.5} className="col-span-1 md:col-span-2 flex items-center justify-center gap-2 p-4">
              <Cloud className="w-4 h-4 text-white/50" /> <span className="text-sm">Vercel</span>
            </SpotlightCard>
            <SpotlightCard delay={0.55} className="col-span-1 md:col-span-2 flex items-center justify-center gap-2 p-4">
              <Github className="w-4 h-4 text-white/50" /> <span className="text-sm">Git/GitHub</span>
            </SpotlightCard>
            <SpotlightCard delay={0.6} className="col-span-1 md:col-span-3 flex items-center justify-center gap-2 p-4">
              <BarChart className="w-4 h-4 text-white/50" /> <span className="text-sm">Recharts</span>
            </SpotlightCard>
            <SpotlightCard delay={0.65} className="col-span-1 md:col-span-2 flex items-center justify-center gap-2 p-4">
              <Send className="w-4 h-4 text-white/50" /> <span className="text-sm">Resend</span>
            </SpotlightCard>
            <SpotlightCard delay={0.7} className="col-span-2 md:col-span-3 flex items-center justify-center gap-2 p-4">
              <Database className="w-4 h-4 text-white/50" /> <span className="text-sm">AWS Amplify</span>
            </SpotlightCard>
          </div>
        </section>

        {/* 3. Featured Project: Splitr (The Showstopper) */}
        <section id="projects" className="mb-40 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight">Featured Project</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/20 to-transparent" />
          </motion.div>

          <SpotlightCard delay={0.1} className="p-0 overflow-hidden border-emerald-500/30 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-12 flex flex-col justify-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 rounded-full bg-emerald-500/10 w-fit mb-6">
                  <Sparkles className="w-3 h-3" /> The Showstopper
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Splitr <span className="text-white/40 font-light">| AI Expense Ecosystem</span>
                </h3>
                
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  A real-time platform for tracking shared expenses with AI-driven financial insights.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white/90">Real-time Sync</h4>
                      <p className="text-xs text-white/50">Instant data synchronization across clients using Convex.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white/90">AI Analytics</h4>
                      <p className="text-xs text-white/50">Personalized spending patterns and saving insights generated by Gemini AI.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Code2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white/90">Algorithmic Complexity</h4>
                      <p className="text-xs text-white/50">Implemented a Debt Simplification Algorithm to resolve circular debts and minimize transaction volume.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white/90">Automation</h4>
                      <p className="text-xs text-white/50">Automated background cron jobs via Ingest for payment reminders and monthly reports via Resend.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Next.js 15", "Convex", "Gemini AI", "Clerk", "Ingest", "Resend"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-mono text-white/60 bg-black/50 rounded-md border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a href="https://splitr-rosy.vercel.app/" target="_blank" rel="noreferrer">
                    <Button variant="primary" className="p-3 px-3 md:px-6">
                      <ExternalLink className="w-5 h-5" />
                      <span className="hidden md:inline">View Live App</span>
                    </Button>
                  </a>
                  <a href="https://github.com/VaibhavTaragi/splitr" target="_blank" rel="noreferrer">
                    <Button variant="default" className="p-3 px-3 md:px-6">
                      <Github className="w-5 h-5" />
                      <span className="hidden md:inline">Source Code</span>
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* Abstract Visual Representation of the App */}
              <div className="relative hidden lg:block bg-gradient-to-br from-emerald-900/20 to-black border-l border-white/5">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="w-full h-full max-h-[400px] bg-black/40 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col overflow-hidden relative group">
                    {/* Mock UI Header */}
                    <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      <div className="ml-4 h-4 w-32 bg-white/5 rounded-full border border-white/5" />
                    </div>
                    {/* App Content - Image Placement */}
                    <div className="flex-1 relative overflow-hidden">
                      <img 
                        src="/SplitrDashboard.png" 
                        alt="Splitr Dashboard" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Secondary Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard delay={0.2} className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex gap-3">
                  <a href="https://namastedev-youtube.netlify.app/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-emerald-400 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/VaibhavTaragi/NamasteDEV-Youtube" target="_blank" rel="noreferrer" className="text-white/40 hover:text-emerald-400 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Video Streamer</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                A highly scalable video streaming web application replicating YouTube with advanced performance features.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/50"><span className="text-white/80 font-medium">Performance:</span> Reduced API calls by 91% via custom debouncing and caching.</p>
                </div>
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/50"><span className="text-white/80 font-medium">Real-Time:</span> Engineered a seamless real-time chat interface using API polling.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Layers className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/50"><span className="text-white/80 font-medium">Data:</span> Developed N-level nested comments for improved scalability.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["React", "Redux", "TailwindCSS", "YouTube API"].map((tech) => (
                  <span key={tech} className="px-2 py-1 text-[10px] font-mono text-white/40 bg-white/5 rounded border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </SpotlightCard>

            {/* Client-Focused CTA Card */}
            <SpotlightCard delay={0.3} className="p-8 flex flex-col h-full border-emerald-500/20 bg-emerald-500/5">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Your Next Big Innovation</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                Have a visionary idea for an AI-SaaS or a high-performance platform? Let’s architect your custom application using the same cutting-edge tech behind Splitr, including AI integration and real-time infrastructure.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/50"><span className="text-white/80 font-medium">Scalability:</span> Built to handle growth from day one.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Bot className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/50"><span className="text-white/80 font-medium">Intelligence:</span> Seamlessly integrated AI capabilities.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/50"><span className="text-white/80 font-medium">Performance:</span> Optimized for sub-second response times and minimal API costs.</p>
                </div>
              </div>

              <a href="#contact">
                <Button variant="primary" className="w-full">
                  Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </SpotlightCard>
          </div>
        </section>

        {/* 4. Experience Recap (Performance Focus) */}
        <section id="experience" className="mb-40 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight">Experience & Impact</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/20 to-transparent" />
          </motion.div>

          <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 pb-8">
            {/* FinOptSys */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-bold">FinOptSys <span className="text-white/50 font-normal">| SDE</span></h3>
                <span className="text-emerald-400 text-sm font-mono mt-1 md:mt-0">Oct 2024 - Present</span>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mt-4 mb-4 inline-block">
                <h4 className="flex items-center gap-2 font-semibold text-emerald-400 text-sm">
                  <Zap className="w-4 h-4" /> Major Win
                </h4>
                <p className="text-white/80 text-sm mt-1">Slashed render times by 92% and accelerated CI/CD pipelines by 40% via module federation.</p>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-3xl">
                Led end-to-end development of a Secure Financing MVP app from ideation to production. Architected full app foundation with 20+ reusable components, WebSockets for real-time updates, and AWS Amplify authentication.
              </p>
            </div>

            {/* Acidaes */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-bold">Acidaes Solutions <span className="text-white/50 font-normal">| Engineer</span></h3>
                <span className="text-white/40 text-sm font-mono mt-1 md:mt-0">Jul 2023 - Oct 2024</span>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mt-4 mb-4 inline-block">
                <h4 className="flex items-center gap-2 font-semibold text-emerald-400 text-sm">
                  <Bot className="w-4 h-4" /> Major Win
                </h4>
                <p className="text-white/80 text-sm mt-1">Engineered GenAI MoM Dashboard, reducing review time by 80% via actionable one-click steps.</p>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-3xl">
                Engineered the GenAI Response Interface for real-time customer query handling, achieving a 65-68% reduction in user navigation time. Developed flexible card designing UI feature with 17+ templates.
              </p>
            </div>

            {/* Accenture */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-bold">Accenture <span className="text-white/50 font-normal">| Associate Software Engineer</span></h3>
                <span className="text-white/40 text-sm font-mono mt-1 md:mt-0">Jul 2021 - Jul 2023</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-3xl mt-4">
                Developed a comprehensive web app for facilitating the delivery order process. Implemented UI for order validation, auto-approval, and discrepancy handling.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Services Offered (Freelance Packages) */}
        <section id="services" className="mb-40 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight">Services & Packages</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/20 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard delay={0.1} className="flex flex-col h-full border-t-4 border-t-emerald-500/50">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Integrated SaaS MVPs</h3>
              <p className="text-white/50 text-sm leading-relaxed flex-grow">
                Building intelligent platforms from ideation to production in record time. Integrating LLMs, RAG pipelines, and automated workflows.
              </p>
            </SpotlightCard>

            <SpotlightCard delay={0.2} className="flex flex-col h-full border-t-4 border-t-emerald-500/50">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Performance Modernization</h3>
              <p className="text-white/50 text-sm leading-relaxed flex-grow">
                Slashing load times and optimizing legacy React/Node stacks for 2026 standards. Implementing Server Components and Edge computing.
              </p>
            </SpotlightCard>

            <SpotlightCard delay={0.3} className="flex flex-col h-full border-t-4 border-t-emerald-500/50">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Ecosystems</h3>
              <p className="text-white/50 text-sm leading-relaxed flex-grow">
                Engineering instant-sync financial or data platforms using Convex, WebSockets, and Serverless technologies.
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* 6. High-Conversion CTA (The Lead Magnet) */}
        <section id="contact" className="pt-20">
          <SpotlightCard className="p-0 overflow-hidden border-emerald-500/30 bg-gradient-to-b from-emerald-900/10 to-black">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Side: Copy & Direct Chat */}
              <div className="p-10 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Ready to build the <br/> <span className="text-emerald-400">future?</span>
                </h2>
                <p className="text-white/60 text-lg mb-10 max-w-md">
                  Whether you need a high-performance MVP, a complex AI integration, or a complete stack modernization, let's discuss your architecture.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://www.linkedin.com/in/vaibhav-taragi/" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                    <Button variant="primary" className="w-full">
                      <Linkedin className="w-4 h-4 mr-2" /> Book Strategy Call
                    </Button>
                  </a>
                  <a href="https://wa.me/919980713246?text=Hi%20Vaibhav,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20potential%20project." target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" /> Direct Chat
                    </Button>
                  </a>
                </div>

                <div className="mt-12 flex items-center gap-4 text-sm text-white/40 font-mono">
                  <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Available for freelance</div>
                  <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Remote worldwide</div>
                </div>
              </div>

              {/* Right Side: Large Email CTA */}
              <div className="p-10 md:p-16 bg-black/20 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold mb-6">Prefer Email?</h3>
                <p className="text-white/60 mb-10 max-w-xs">
                  Drop me a line directly. I usually respond within 24 hours for new project inquiries.
                </p>
                <a 
                  href="mailto:vaibhavtaragi67@gmail.com?subject=New%20Inquiry%20from%20Portfolio&body=Hi%20Vaibhav,%0D%0AI'm%20interested%20in%20working%20with%20you%20on..."
                  className="w-full"
                >
                  <Button variant="primary" className="w-full py-5 md:py-8 text-sm md:text-lg shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" /> Send me an Email
                  </Button>
                </a>
              </div>

            </div>
          </SpotlightCard>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-20 text-center text-white/30 text-sm font-mono">
        <p>© 2026 Vaibhav Singh Taragi. Engineered for the Intelligent Web.</p>
      </footer>
    </div>
  );
}
