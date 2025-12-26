"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, Github, Zap } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import CharacterSelector from "@/components/CharacterSelector";
import RoastResult from "@/components/RoastResult";
import FloatingParticles from "@/components/FloatingParticles";

interface RoastData {
  roast: string;
  severity: number;
  characterId: string;
}

const SAMPLE_CODE = `// Try roasting this code! 🔥
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

export default function Home() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [selectedCharacter, setSelectedCharacter] = useState("gordon");
  const [isLoading, setIsLoading] = useState(false);
  const [roastResult, setRoastResult] = useState<RoastData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRoast = async () => {
    if (!code.trim()) {
      setError("Please paste some code first!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRoastResult(null);

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          characterId: selectedCharacter,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get roast");
      }

      const data = await response.json();
      setRoastResult(data);
    } catch (err) {
      setError("Failed to roast your code. Please try again!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoastAgain = () => {
    setRoastResult(null);
  };

  return (
    <main className="min-h-screen relative">
      <FloatingParticles />

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <Flame className="w-12 h-12 text-[var(--neon-orange)] fire-text" />
              <h1
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[var(--neon-pink)] via-[var(--neon-orange)] to-[var(--neon-cyan)] bg-clip-text text-transparent"
                style={{ fontFamily: "Orbitron" }}
              >
                CodeRoast.ai
              </h1>
              <Flame className="w-12 h-12 text-[var(--neon-orange)] fire-text" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-2"
            >
              Where bad code meets <span className="text-[var(--neon-pink)]">brutal honesty</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-500"
            >
              <Sparkles size={14} className="text-[var(--neon-cyan)]" />
              <span>Powered by AI • 100% Savage • 0% Mercy</span>
              <Sparkles size={14} className="text-[var(--neon-cyan)]" />
            </motion.div>
          </motion.header>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Step 1: Code Editor */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl font-bold" style={{ fontFamily: "Orbitron" }}>
                  Paste Your Code
                </h2>
              </div>
              <CodeEditor code={code} onChange={setCode} />
            </motion.section>

            {/* Step 2: Character Selection */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-green)] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-xl font-bold" style={{ fontFamily: "Orbitron" }}>
                  Choose Your Roaster
                </h2>
              </div>
              <CharacterSelector
                selected={selectedCharacter}
                onSelect={setSelectedCharacter}
              />
            </motion.section>

            {/* Step 3: Roast Button */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center py-8"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--neon-orange)] to-[var(--neon-pink)] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="text-xl font-bold" style={{ fontFamily: "Orbitron" }}>
                  Get Roasted
                </h2>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRoast}
                disabled={isLoading}
                className="neon-button rounded-xl text-xl px-12 py-5 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap size={24} />
                    </motion.div>
                    Roasting...
                  </span>
                ) : (
                  <span className="flex items-center gap-3 fire-text">
                    <Flame size={24} />
                    ROAST MY CODE
                    <Flame size={24} />
                  </span>
                )}
              </motion.button>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Result */}
            <AnimatePresence>
              {roastResult && (
                <RoastResult
                  roast={roastResult.roast}
                  severity={roastResult.severity}
                  characterId={roastResult.characterId}
                  onRoastAgain={handleRoastAgain}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 pt-8 border-t border-white/10 text-center"
          >
            <div className="flex items-center justify-center gap-6 mb-4">
              <a
                href="https://github.com/melihceyhan/coderoast"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
                <span>Star on GitHub</span>
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              Made with 🔥 and questionable coding practices
            </p>
            <p className="text-gray-600 text-xs mt-2">
              No code was harmed in the making of this roast (your code, however...)
            </p>
          </motion.footer>
        </div>
      </div>
    </main>
  );
}
