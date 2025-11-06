"use client"

import { motion } from "framer-motion"
import { Sword } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 bg-gradient-to-t from-emerald-950/20 via-slate-950 to-transparent border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Left side - Branding */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sword className="text-emerald-400" size={24} />
            </motion.div>
            <span className="text-slate-300 font-semibold">THE SURVIVAL GAMES</span>
          </div>

          {/* Center - Links */}
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Home
            </a>
            <a href="#servers" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Servers
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Right side - Copyright */}
          <div className="text-sm text-slate-500 flex items-center gap-2">
            © 2025 THE SURVIVAL GAMES — Built by Minecraft fans for Minecraft fans.
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
