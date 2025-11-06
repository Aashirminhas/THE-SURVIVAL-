"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import dynamic from "next/dynamic"

const MinecraftSwordViewer = dynamic(() => import("./minecraft-sword-viewer"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center">⚔️</div>,
})

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-slate-950"></div>

      {/* Parallax background effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2334d399' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 flex items-center gap-8 lg:gap-16">
        {/* Left side - Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            THE SURVIVAL
            <br />
            GAMES
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Join the adventure. Two worlds. Endless survival.
          </motion.p>

          <motion.div
            className="flex gap-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.a
              href="#servers"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-400/50 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.a>

            <motion.button
              onClick={() => setIsMuted(!isMuted)}
              className="px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-emerald-400 rounded-lg transition-all duration-300 border border-emerald-400/30 hover:border-emerald-400/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right side - 3D Minecraft element */}
        <motion.div
          className="hidden lg:flex flex-1 items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <MinecraftSwordViewer />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-emerald-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
