import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import editorImage from "../assets/Frontimage.png.png";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

const HomePage = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    // GSAP floating code background animation
    const container = bgRef.current;
    if (!container) return;

    const chars = ["{ }", "< >", "=>", "()", "[]", "++", "===", "!=", "&&", "||", "01", "42", "run", "compile"];
    const elements = [];

    for (let i = 0; i < 40; i++) {
      const el = document.createElement("div");
      el.className = "absolute text-emerald-500/20 font-mono text-xl md:text-3xl font-bold select-none";
      el.innerText = chars[Math.floor(Math.random() * chars.length)];
      container.appendChild(el);
      elements.push(el);

      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });

      gsap.to(el, {
        y: "-=150",
        x: "+=" + (Math.random() * 100 - 50),
        rotation: Math.random() * 360,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      elements.forEach((el) => el.remove());
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="bg-[#0f172a] min-h-screen overflow-hidden text-slate-300 font-sans selection:bg-emerald-500/30 relative">
      {/* Animated Motion Background Container */}
      <div ref={bgRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen" />
      
      {/* Dark overlay gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#0f172a]/80 to-[#0f172a]" />

      <div className="relative z-10 w-full h-full">
        <Navbar />

        {/* HERO SECTION */}
        <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-6 min-h-[85vh]">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 text-center md:text-left z-10 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-2"
            >
              Ultimate Coding Platform
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Master Code With
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                CodeQuest
              </span>
            </h1>

            <p className="text-slate-400 text-xl mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              Practice algorithm challenges, improve your problem-solving skills, and prepare for top tech interviews — in a blazing fast environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/login">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-900 px-8 py-4 rounded-xl text-lg font-bold shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
                >
                  Start Solving 🚀
                </motion.button>
              </Link>

              <Link to="/about">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto border border-slate-700 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-md px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image/Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ y: yOffset }}
            className="md:w-1/2 mt-16 md:mt-0 flex justify-center z-10"
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
              <motion.img
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src={editorImage}
                alt="Code Editor Representation"
                className="relative shadow-2xl shadow-emerald-900/20 w-full h-auto drop-shadow-[0_0_25px_rgba(16,185,129,0.1)]"
              />
            </div>
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-[#0b1120] py-24 px-6 relative border-t border-slate-800/50">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Why Choose <span className="text-emerald-500">CodeQuest?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 container mx-auto">
            {[
              {
                title: "Curated Problems",
                desc: "Solve industry-standard coding questions carefully categorized from easy to hard.",
                icon: "📋"
              },
              {
                title: "Fast Execution",
                desc: "Run and test your code instantly with our integrated Judge0 compiler system.",
                icon: "⚡"
              },
              {
                title: "Detailed Analytics",
                desc: "Monitor your submissions closely and track your continuous improvement over time.",
                icon: "📈"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl shadow-xl backdrop-blur-sm group hover:border-emerald-500/30 transition-all"
              >
                <div className="text-4xl mb-6 bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 bg-slate-900/50 border-t border-slate-800/50 text-center relative z-10 overflow-hidden">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-6">
            {[
              { value: "150+", label: "Algorithms" },
              { value: "25K+", label: "Submissions" },
              { value: "8+", label: "Languages" },
              { value: "99%", label: "Uptime" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="p-6"
              >
                <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400 mb-2 drop-shadow-md">
                  {stat.value}
                </h3>
                <p className="text-slate-400 font-semibold tracking-wide uppercase text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-90 mix-blend-color-burn" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container mx-auto text-center px-6 relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
              Ready to Shift Gears?
            </h2>
            <p className="mb-10 text-xl text-emerald-50 max-w-2xl mx-auto drop-shadow-md">
              Join thousands of developers leveling up their coding prowess on CodeQuest every day.
            </p>

            <Link to="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-900 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-slate-100 transition-all shadow-2xl"
              >
                Create Free Account
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0b1120] text-slate-500 py-12 border-t border-slate-800">
          <div className="container mx-auto px-6 text-center md:flex md:justify-between md:text-left">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-slate-300 mb-2">Code<span className="text-emerald-500">Quest</span></h3>
              <p className="text-sm">Elevating your coding journey.</p>
            </div>
            <div className="flex justify-center md:justify-end gap-6 text-sm">
              <Link to="/about" className="hover:text-emerald-400 transition">About</Link>
              <Link to="/contact" className="hover:text-emerald-400 transition">Contact Us</Link>
              <a href="#" className="hover:text-emerald-400 transition">Terms</a>
              <a href="#" className="hover:text-emerald-400 transition">Privacy</a>
            </div>
          </div>
          <div className="text-center mt-12 text-xs">
            <p>© {new Date().getFullYear()} CodeQuest. Built with passion.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;