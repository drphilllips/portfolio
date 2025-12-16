import { useEffect, useRef, useState } from "react"
import { useColorPalette } from "../../contexts/useColorPalette"

type Size = {
  wCss: number
  hCss: number
  dpr: number
}

const DURATION_MS = 1300
const DPR_CAP = 2
const NUM_BANDS = 8

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

// Tailwind-like timing function: cubic-bezier(0.4, 0, 0.2, 1)
// Implementation uses a small Bezier solver (Newton + bisection fallback).
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x
  const bx = 3 * (p2x - p1x) - cx
  const ax = 1 - cx - bx

  const cy = 3 * p1y
  const by = 3 * (p2y - p1y) - cy
  const ay = 1 - cy - by

  function sampleX(t: number) {
    return ((ax * t + bx) * t + cx) * t
  }
  function sampleY(t: number) {
    return ((ay * t + by) * t + cy) * t
  }
  function sampleXDeriv(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx
  }

  function solveX(x: number) {
    // First try Newton-Raphson.
    let t = x
    for (let i = 0; i < 8; i++) {
      const xEst = sampleX(t) - x
      const d = sampleXDeriv(t)
      if (Math.abs(xEst) < 1e-6) return t
      if (Math.abs(d) < 1e-6) break
      t -= xEst / d
    }

    // Fall back to bisection.
    let lo = 0
    let hi = 1
    t = x
    for (let i = 0; i < 12; i++) {
      const xEst = sampleX(t)
      if (Math.abs(xEst - x) < 1e-6) return t
      if (xEst < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return t
  }

  return (x: number) => {
    const t = solveX(clamp(x, 0, 1))
    return sampleY(t)
  }
}

const easeTailwind = cubicBezier(0.4, 0, 0.2, 1)

function paintBandMask(
  maskCtx: CanvasRenderingContext2D,
  bandIndex: number,
  p: number,
  wCss: number,
  hCss: number
) {
  // Use a base band height but intentionally OVERLAP adjacent strokes.
  // The diagonal tilt can otherwise create tiny triangular gaps between bands.
  const baseBandH = hCss / NUM_BANDS

  // Overlap/thickness knob in CSS pixels (scaled with band height, clamped for stability).
  // This makes strokes a bit thicker AND ensures no seams between adjacent bands.
  const overlapPx = clamp(baseBandH * 0.18, 4, 22)

  // Expand each band vertically and shift upward so overlaps are symmetric.
  // (First/last bands will safely clip at canvas edges.)
  const bandH = baseBandH + overlapPx * 2
  const y0 = bandIndex * baseBandH - overlapPx

  const t = clamp(p, 0, 1)
  const even = bandIndex % 2 === 0

  maskCtx.globalCompositeOperation = "source-over"
  maskCtx.strokeStyle = "rgba(255,255,255,1)"

  // Slight diagonal tilt to make the stroke feel more natural.
  // Even bands tilt down in the sweep direction (L→R), odd bands tilt down in the sweep direction (R→L).
  const tiltPx = clamp(bandH * 0.12, 3, 20)
  const slope = even ? tiltPx : -tiltPx

  // Draw as a thick stroke with round caps, so the band has fully-rounded ends.
  // We extend the sweep distance by the cap radius on both sides so the rounded ends
  // start and finish fully off-screen.
  const capR = bandH / 2
  const sweepW = wCss + capR * 2

  const xStart = even ? -capR : wCss + capR
  const xEnd = even ? xStart + t * sweepW : xStart - t * sweepW

  // Centerline y positions (allow extrapolation beyond [0, wCss] so off-screen caps stay aligned).
  const yCenterStart = y0 + (xStart / wCss) * slope + bandH / 2
  const yCenterEnd = y0 + (xEnd / wCss) * slope + bandH / 2

  // If no progress, draw nothing (avoids a visible dot at the edge).
  if (t <= 0) return

  maskCtx.lineWidth = bandH
  maskCtx.lineCap = "round"
  maskCtx.lineJoin = "round"

  maskCtx.beginPath()
  maskCtx.moveTo(xStart, yCenterStart)
  maskCtx.lineTo(xEnd, yCenterEnd)
  maskCtx.stroke()
}

function resolveTailwindBgToCssColor(bgClass: string): string | null {
  if (typeof window === "undefined" || typeof document === "undefined") return null

  const probe = document.createElement("div")
  probe.className = `${bgClass} fixed -z-50 opacity-0 pointer-events-none`
  // Ensure the element is measurable and uses the intended background.
  probe.style.width = "1px"
  probe.style.height = "1px"
  document.body.appendChild(probe)

  const color = window.getComputedStyle(probe).backgroundColor
  document.body.removeChild(probe)

  // Computed backgroundColor should be something like `rgb(...)` or `rgba(...)`.
  return color && color !== "transparent" ? color : null
}

function setupCanvasSize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size: Size) {
  const { wCss, hCss, dpr } = size

  canvas.style.width = `${wCss}px`
  canvas.style.height = `${hCss}px`

  canvas.width = Math.floor(wCss * dpr)
  canvas.height = Math.floor(hCss * dpr)

  // Draw in CSS pixels.
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function clearCanvas(ctx: CanvasRenderingContext2D, wCss: number, hCss: number) {
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, wCss, hCss)
}

export default function CanvasBackgroundTransition() {
  const { pendingPaletteChange, commitPendingPaletteChange } = useColorPalette()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const displayCtxRef = useRef<CanvasRenderingContext2D | null>(null)

  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const maskCtxRef = useRef<CanvasRenderingContext2D | null>(null)

  const rafRef = useRef<number | null>(null)
  const activeRequestIdRef = useRef<number | null>(null)
  const lastTsRef = useRef<number>(0)

  const sizeRef = useRef<Size>({
    wCss: 0,
    hCss: 0,
    dpr: 1,
  })

  const [resizeNonce, setResizeNonce] = useState(0)

  // Cancel any in-flight animation.
  function cancelRaf() {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    lastTsRef.current = 0
  }

  // Ensure we have both contexts and a correctly sized backing store.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const displayCtx = canvas.getContext("2d")
    if (!displayCtx) return
    displayCtxRef.current = displayCtx

    const maskCanvas = document.createElement("canvas")
    const maskCtx = maskCanvas.getContext("2d")
    if (!maskCtx) return
    maskCanvasRef.current = maskCanvas
    maskCtxRef.current = maskCtx

    function handleResize() {
      const canvasEl = canvasRef.current
      const displayCtxEl = displayCtxRef.current
      const maskCanvasEl = maskCanvasRef.current
      const maskCtxEl = maskCtxRef.current

      if (!canvasEl || !displayCtxEl || !maskCanvasEl || !maskCtxEl) return

      const wCss = window.innerWidth
      const hCss = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)

      sizeRef.current = { wCss, hCss, dpr }

      setupCanvasSize(canvasEl, displayCtxEl, sizeRef.current)
      setupCanvasSize(maskCanvasEl, maskCtxEl, sizeRef.current)

      // Clear both buffers on resize.
      displayCtxEl.clearRect(0, 0, wCss, hCss)
      maskCtxEl.clearRect(0, 0, wCss, hCss)

      // If a transition is in-flight, restart it for the new size.
      if (activeRequestIdRef.current != null) {
        cancelRaf()
        activeRequestIdRef.current = null
        // Force the main effect to re-run for the same pending request.
        setResizeNonce((n) => n + 1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
      displayCtxRef.current = null
      maskCanvasRef.current = null
      maskCtxRef.current = null
    }
  }, [])

  function renderOverlay(colorCss: string) {
    const displayCtx = displayCtxRef.current
    const maskCanvas = maskCanvasRef.current
    const size = sizeRef.current
    if (!displayCtx || !maskCanvas) return

    const { wCss, hCss } = size

    // Clear display.
    displayCtx.clearRect(0, 0, wCss, hCss)

    // 1) Fill with next color.
    displayCtx.globalCompositeOperation = "source-over"
    displayCtx.fillStyle = colorCss
    displayCtx.fillRect(0, 0, wCss, hCss)

    // 2) Keep only where the mask is painted.
    displayCtx.globalCompositeOperation = "destination-in"
    displayCtx.drawImage(maskCanvas, 0, 0, wCss, hCss)

    // Reset for safety.
    displayCtx.globalCompositeOperation = "source-over"
  }

  useEffect(() => {
    const req = pendingPaletteChange
    if (!req) return

    const canvas = canvasRef.current
    const displayCtx = displayCtxRef.current
    const maskCtx = maskCtxRef.current
    const maskCanvas = maskCanvasRef.current
    if (!canvas || !displayCtx || !maskCtx || !maskCanvas) {
      // Canvas not available: snap commit.
      commitPendingPaletteChange(req.requestId)
      return
    }

    // Reduced motion: skip animation entirely.
    if (prefersReducedMotion()) {
      commitPendingPaletteChange(req.requestId)
      return
    }

    const size = sizeRef.current
    const { wCss, hCss } = size

    const nextCss = resolveTailwindBgToCssColor(req.pageColor)
    if (!nextCss) {
      // If we can't resolve a color, fall back to committing.
      commitPendingPaletteChange(req.requestId)
      return
    }

    // Cancel previous animation and mark this request active.
    cancelRaf()
    activeRequestIdRef.current = req.requestId

    // Reset mask & display.
    maskCtx.clearRect(0, 0, wCss, hCss)
    displayCtx.clearRect(0, 0, wCss, hCss)

    // Ensure canvas is visible while active.
    canvas.style.opacity = "1"

    let startTs: number | null = null

    const drawMaskForProgress = (t01: number) => {
      // Option B: re-render mask from scratch each frame.
      maskCtx.clearRect(0, 0, wCss, hCss)

      const eased = easeTailwind(clamp(t01, 0, 1))
      const bandFloat = eased * NUM_BANDS
      const activeBand = Math.floor(bandFloat)
      const bandP = bandFloat - activeBand

      // Completed bands.
      const completed = clamp(activeBand, 0, NUM_BANDS)
      for (let i = 0; i < completed; i++) {
        paintBandMask(maskCtx, i, 1, wCss, hCss)
      }

      // Active band (if any remaining).
      if (activeBand >= 0 && activeBand < NUM_BANDS) {
        paintBandMask(maskCtx, activeBand, bandP, wCss, hCss)
      }

      return { activeBand, bandP }
    }

    // Initial frame.
    drawMaskForProgress(0)
    renderOverlay(nextCss)

    const step = (ts: number) => {
      // Abort if a newer request took over.
      if (activeRequestIdRef.current !== req.requestId) return

      if (startTs == null) startTs = ts
      const totalT = clamp((ts - startTs) / DURATION_MS, 0, 1)

      drawMaskForProgress(totalT)
      renderOverlay(nextCss)

      if (totalT >= 1) {
        // Ensure fully revealed.
        maskCtx.clearRect(0, 0, wCss, hCss)
        for (let i = 0; i < NUM_BANDS; i++) {
          paintBandMask(maskCtx, i, 1, wCss, hCss)
        }
        renderOverlay(nextCss)

        // Commit DOM palette.
        commitPendingPaletteChange(req.requestId)

        // Hide overlay after commit.
        displayCtx.clearRect(0, 0, wCss, hCss)
        canvas.style.opacity = "0"

        cancelRaf()
        activeRequestIdRef.current = null
        return
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      cancelRaf()
    }
  }, [pendingPaletteChange, commitPendingPaletteChange, resizeNonce])

  // Clear the display when unmounting.
  useEffect(() => {
    return () => {
      cancelRaf()
      const ctx = displayCtxRef.current
      const size = sizeRef.current
      if (ctx) clearCanvas(ctx, size.wCss, size.hCss)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0, transition: "opacity 120ms linear" }}
    />
  )
}
