"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, RefreshCw, Zap } from "lucide-react"
import ServerModal from "./server-modal"

interface Server {
  id: string
  name: string
  ip: string
  description: string
  maxPlayers: number
  apiUrl: string
  color: string
  glowColor: string
}

interface ServerStatus {
  online: boolean
  players: number
  motd?: string
  error?: string
}

export default function ServerCard({ server }: { server: Server }) {
  const [status, setStatus] = useState<ServerStatus>({ online: false, players: 0 })
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const fetchServerStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch(server.apiUrl)
      const data = await response.json()
      setStatus({
        online: data.online,
        players: data.players?.online || 0,
        motd: data.motd?.clean?.[0] || "Welcome to the server!",
      })
    } catch (error) {
      setStatus({
        online: false,
        players: 0,
        error: "Failed to fetch status",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServerStatus()
    const interval = setInterval(fetchServerStatus, 30000) // Fetch every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const copyIP = () => {
    navigator.clipboard.writeText(server.ip)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <motion.div
        onClick={() => setIsModalOpen(true)}
        className={`relative group cursor-pointer p-6 rounded-2xl bg-gradient-to-br ${server.color} bg-opacity-10 border border-slate-700 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-emerald-400/50 shadow-lg ${server.glowColor} h-96 flex flex-col`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, transparent, rgba(52, 211, 153, 0.3), transparent)`,
            pointerEvents: "none",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        ></motion.div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{server.name}</h3>
              <p className="text-slate-300 text-sm">{server.description}</p>
            </div>
            <motion.div
              className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
                status.online ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-500/20 text-slate-300"
              }`}
              animate={{ scale: status.online ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className={`w-2 h-2 rounded-full ${status.online ? "bg-emerald-400" : "bg-slate-400"}`}></span>
              {status.online ? "Online" : "Offline"}
            </motion.div>
          </div>

          {/* Player count and MOTD */}
          <div className="space-y-3 mb-4 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Players Online</span>
              <span className="text-lg font-semibold text-emerald-400">
                {loading ? "..." : `${status.players} / ${server.maxPlayers}`}
              </span>
            </div>
            {status.motd && <div className="text-sm text-slate-400 italic">"{status.motd}"</div>}
          </div>

          {/* Server IP display */}
          <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-slate-700 flex items-center justify-between">
            <code className="text-sm text-emerald-300 font-mono">{server.ip}</code>
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                copyIP()
              }}
              className="ml-2 p-1.5 hover:bg-slate-700 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Copy size={16} className={copied ? "text-emerald-400" : "text-slate-400"} />
            </motion.button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto">
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                fetchServerStatus()
              }}
              className="flex-1 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-emerald-400 rounded-lg transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-400/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsModalOpen(true)
              }}
              className="flex-1 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-lg transition-all flex items-center justify-center gap-2 border border-emerald-500/50 hover:border-emerald-400/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={16} />
              Details
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <ServerModal
        server={server}
        status={status}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchServerStatus}
        onCopyIP={copyIP}
        copied={copied}
      />
    </>
  )
}
