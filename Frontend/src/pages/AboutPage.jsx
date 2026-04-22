import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-300 font-sans selection:bg-emerald-500/30">
      <Navbar />
      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight"
          >
            About <span className="text-emerald-500">CodeQuest</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg leading-relaxed text-slate-400"
          >
            <p>
              Welcome to CodeQuest, the ultimate platform for aspiring and professional developers to hone their coding skills. Our mission is to provide an accessible, intuitive, and challenging environment where you can practice algorithmic problem-solving and prepare for technical interviews.
            </p>
            <p>
              Founded by a group of passionate developers, CodeQuest aims to bridge the gap between theoretical computer science concepts and practical, real-world coding. Whether you're a beginner learning your first loops or an experienced engineer optimizing graph algorithms, we have curated a diverse set of challenges tailored for all skill levels.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Empowerment", desc: "Equipping developers with the skills they need to succeed in the tech industry." },
              { title: "Community", desc: "Fostering a collaborative environment where coders can learn from each other." },
              { title: "Excellence", desc: "Providing a top-tier coding experience with fast execution and robust test cases." }
            ].map((value, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-md">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3">{value.title}</h3>
                <p className="text-sm text-slate-400">{value.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
