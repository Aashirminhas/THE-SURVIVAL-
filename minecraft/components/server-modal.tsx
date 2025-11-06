"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Copy } from "lucide-react"

interface ServerStatus {
  online: boolean
  players: number
  motd?: string
  error?: string
}

interface Server {
  id: string
  name: string
  ip: string
  description: string
  maxPlayers: number
  color: string
  glowColor: string
}

interface ServerModalProps {
  server: Server
  status: ServerStatus
  isOpen: boolean
  onClose: () => void
  onRefresh: () => void
  onCopyIP: () => void
  copied: boolean
}

export default function ServerModal({
  server,
  status,
  isOpen,
  onClose,
  onRefresh,
  onCopyIP,
  copied,
}: ServerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 max-w-md w-full mx-4 z-50 border border-slate-700"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-slate-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} className="text-slate-400" />
            </motion.button>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{server.name}</h2>
                <p className="text-slate-400">{server.description}</p>
              </div>

              {/* Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="text-sm text-slate-400 mb-2">Status</div>
                  <div
                    className={`text-lg font-bold flex items-center gap-2 ${
                      status.online ? "text-emerald-400" : "text-slate-400"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full ${status.online ? "bg-emerald-400" : "bg-slate-400"}`}
                    ></span>
                    {status.online ? "Online" : "Offline"}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="text-sm text-slate-400 mb-2">Players</div>
                  <div className="text-lg font-bold text-cyan-400">
                    {status.players} / {server.maxPlayers}
                  </div>
                </div>
              </div>

              {/* IP Address */}
              <div>
                <div className="text-sm text-slate-400 mb-2">Server IP</div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 flex items-center justify-between group">
                  <code className="text-emerald-300 font-mono text-sm">{server.ip}</code>
                  <motion.button
                    onClick={onCopyIP}
                    className="ml-2 p-1.5 hover:bg-slate-800 rounded transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Copy
                      size={16}
                      className={copied ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}
                    />
                  </motion.button>
                </div>
                {copied && (
                  <motion.p className="text-xs text-emerald-400 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    ✓ Copied to clipboard!
                  </motion.p>
                )}
              </div>

              {/* MOTD */}
              {status.motd && (
                <div>
                  <div className="text-sm text-slate-400 mb-2">Server Message</div>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700 text-slate-300 italic">
                    "{status.motd}"
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={onRefresh}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all border border-slate-600 hover:border-slate-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Refresh
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
