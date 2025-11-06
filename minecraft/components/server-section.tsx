"use client"

import { motion } from "framer-motion"
import ServerCard from "./server-card"

const servers = [
  {
    id: "korangpvp",
    name: "KorangPVP!",
    ip: "KorangPVP.aternos.me:35910",
    description: "Fast-paced PvP battles in a survival arena. Team up or fight solo!",
    maxPlayers: 6,
    apiUrl: "https://api.mcsrvstat.us/2/KorangPVP.aternos.me:35910",
    color: "from-red-600 to-orange-600",
    glowColor: "shadow-red-500/50",
  },
  {
    id: "korangsurvival",
    name: "KorangSurvival!",
    ip: "korang1.aternos.me:58736",
    description: "Classic survival world — gather, build, and thrive together!",
    maxPlayers: 6,
    apiUrl: "https://api.mcsrvstat.us/2/korang1.aternos.me:58736",
    color: "from-emerald-600 to-cyan-600",
    glowColor: "shadow-emerald-500/50",
  },
]

export default function ServerSection() {
  return (
    <section id="servers" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Choose Your World
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Select your server and join the survival adventure. Check live player counts and server status in real-time.
          </p>
        </motion.div>

        {/* Server cards grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {servers.map((server, index) => (
            <motion.div
              key={server.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ServerCard server={server} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
