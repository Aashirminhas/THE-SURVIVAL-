"use client"

import { useEffect } from "react"

export default function MinecraftSwordViewer() {
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* @ts-ignore */}
      <model-viewer
        src="/minecraft_swords.glb"
        alt="Minecraft Swords"
        auto-rotate
        camera-controls
        shadow-intensity="1"
        exposure="1"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
        environment-image="neutral"
      />
    </div>
  )
}
