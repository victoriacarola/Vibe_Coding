"use client"

import React from "react"
import { useEffect, useRef } from "react"

const NeonIsometricMaze: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const x = canvas.getContext("2d")
    if (!x) return

    let t = 0
    let animationFrameId: number

    const r = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      d()
    }

    const d = () => {
      if (!canvas || !x) return
      const s = Math.min(canvas.width, canvas.height) / 15
      const g = Math.ceil(canvas.width / s) * 2
      const h = Math.ceil(canvas.height / (s * 0.5)) * 2
      const w = canvas.width / 2
      const v = canvas.height / 2

      for (let y = -h; y < h; y++) {
        for (let i = -g; i < g; i++) {
          const p = w + ((i - y) * s) / 2
          const q = v + ((i + y) * s) / 4
          const m = Math.sqrt(i * i + y * y)
          const n = Math.sqrt(g * g + h * h)
          const e = 1 - m / n
          // Create a cash-shaped wave pattern using a combination of sine waves
          const cashWave = Math.sin(i * 0.5 + t) * Math.cos(y * 0.3 + t * 0.7) * Math.sin(m * 0.2 - t * 0.5)
          const f = s * e * Math.abs(cashWave)

          x.beginPath()
          x.moveTo(p, q - f)
          x.lineTo(p + s / 2, q - s / 2 - f)
          x.lineTo(p + s, q - f)
          x.lineTo(p + s, q)
          x.lineTo(p + s / 2, q + s / 2)
          x.lineTo(p, q)
          x.closePath()

          const l = x.createLinearGradient(p, q - f, p + s, q)
          l.addColorStop(0, "rgba(255,165,0,.8)") // Orange
          l.addColorStop(1, "rgba(255,105,180,.8)") // Pink
          x.fillStyle = l
          x.fill()
          x.strokeStyle = "rgba(255,255,0,.5)" // Yellow
          x.stroke()

          x.beginPath()
          x.moveTo(p, q)
          x.lineTo(p, q - f)
          x.moveTo(p + s, q)
          x.lineTo(p + s, q - f)
          x.moveTo(p + s / 2, q + s / 2)
          x.lineTo(p + s / 2, q - s / 2 - f)
          x.strokeStyle = "rgba(255,255,0,.3)" // Yellow for the vertical lines
          x.stroke()
        }
      }

      // Draw the "Vibe Coding" text with trippy wave animations
      drawTrippyText(x, canvas.width, canvas.height, t)
    }

    const drawTrippyText = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const text = "Vibe Coding"
      const fontSize = Math.min(width, height) / 10
      ctx.font = `bold ${fontSize}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Create a wavy baseline for the text
      const letters = text.split("")
      const letterSpacing = fontSize * 0.8
      const totalWidth = letters.length * letterSpacing
      const startX = (width - totalWidth) / 2 + letterSpacing / 2

      letters.forEach((letter, i) => {
        // Calculate wavy position for each letter
        const waveX = Math.sin(time * 0.7 + i * 0.5) * fontSize * 0.2
        const waveY = Math.cos(time * 0.5 + i * 0.3) * fontSize * 0.2
        const x = startX + i * letterSpacing + waveX
        const y = height / 2 + waveY

        // Rotate each letter slightly for extra trippiness
        const rotation = Math.sin(time * 0.3 + i * 0.2) * 0.2

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        // Create trippy color effect with yellow, green, and dark blue
        const colorPhase = time * 0.5 + i * 0.3
        const colors = [
          "rgba(255, 255, 0, 0.9)", // Yellow
          "rgba(0, 255, 0, 0.9)", // Green
          "rgba(0, 0, 139, 0.9)", // Dark Blue
        ]
        const colorIndex = Math.floor((Math.sin(colorPhase) + 1) * 1.5) % 3

        // Add glow effect
        ctx.shadowColor = colors[colorIndex]
        ctx.shadowBlur = 15
        ctx.fillStyle = colors[colorIndex]

        // Draw the letter
        ctx.fillText(letter, 0, 0)

        ctx.restore()
      })
    }

    const a = () => {
      if (!canvas || !x) return
      x.fillStyle = "rgba(0,0,0,.1)"
      x.fillRect(0, 0, canvas.width, canvas.height)
      d()
      t += 0.05
      animationFrameId = requestAnimationFrame(a)
    }

    window.addEventListener("resize", r)
    r()
    a()

    return () => {
      window.removeEventListener("resize", r)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="block" />
}

export default NeonIsometricMaze
