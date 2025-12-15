let activeRafId: number | null = null
let activeProbe: HTMLDivElement | null = null
let activeCleanup: (() => void) | null = null

// Tailwind defaults (matches `transition-colors` timing by default)
const TAILWIND_DEFAULT_EASING = "cubic-bezier(0.4, 0, 0.2, 1)"
// Tailwind's `transition-colors` property list (includes background-color)
const TAILWIND_TRANSITION_COLORS_PROPERTY_LIST =
  "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to"

type TransitionSpec = {
  transitionProperty: string
  durationMs: number
  delayMs: number
  timingFunction: string
}

function getOrCreateThemeColorMeta(): HTMLMetaElement {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement("meta")
    meta.name = "theme-color"
    document.head.appendChild(meta)
  }
  return meta
}

function prefersReducedMotion(): boolean {
  // Safe for browsers that don't support matchMedia.
  try {
    return !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

function clampMs(n: number): number {
  return Number.isFinite(n) ? Math.max(0, n) : 0
}

function parseTimeToMs(time: string): number {
  // Supports `ms` and `s`.
  const t = time.trim()
  if (!t) return 0
  if (t.endsWith("ms")) {
    const n = Number.parseFloat(t.slice(0, -2))
    return clampMs(n)
  }
  if (t.endsWith("s")) {
    const n = Number.parseFloat(t.slice(0, -1))
    return clampMs(n * 1000)
  }
  // Fallback: treat as ms-like number
  const n = Number.parseFloat(t)
  return clampMs(n)
}

function splitCssList(value: string): string[] {
  // Splits comma-separated CSS lists, but does NOT split commas inside parentheses
  // (e.g. cubic-bezier(0.4, 0, 0.2, 1)).
  const out: string[] = []
  let buf = ""
  let depth = 0

  for (let i = 0; i < value.length; i++) {
    const ch = value[i]
    if (ch === "(") depth++
    if (ch === ")") depth = Math.max(0, depth - 1)

    if (ch === "," && depth === 0) {
      out.push(buf.trim())
      buf = ""
      continue
    }
    buf += ch
  }

  if (buf.trim()) out.push(buf.trim())
  return out.length ? out : [value.trim()]
}

function pickFromCssList(listValue: string, index: number): string {
  const items = splitCssList(listValue)
  const safeIndex = Math.max(0, index)
  // Per CSS, if fewer items are provided than properties, the list repeats.
  // In computed styles, browsers often expand/repeat to match, but to be safe:
  const item = items[safeIndex] ?? items[items.length - 1] ?? ""
  return item
}

function getBackgroundColorTransitionIndex(transitionProperty: string): number {
  const props = transitionProperty
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)

  if (!props.length) return 0

  // If `all` is present, background-color will be covered by the first entry.
  const allIndex = props.findIndex((p) => p === "all")
  if (allIndex !== -1) return allIndex

  const bgIndex = props.findIndex((p) => p === "background-color")
  if (bgIndex !== -1) return bgIndex

  // Some UAs may report just `background`.
  const backgroundIndex = props.findIndex((p) => p === "background")
  if (backgroundIndex !== -1) return backgroundIndex

  return 0
}

function readTransitionSpecFromElement(element: HTMLElement): TransitionSpec {
  const style = getComputedStyle(element)

  const transitionProperty = style.transitionProperty || TAILWIND_TRANSITION_COLORS_PROPERTY_LIST
  const bgIndex = getBackgroundColorTransitionIndex(transitionProperty)

  const timingFunction =
    pickFromCssList(style.transitionTimingFunction || TAILWIND_DEFAULT_EASING, bgIndex) ||
    TAILWIND_DEFAULT_EASING

  const durationMs = parseTimeToMs(
    pickFromCssList(style.transitionDuration || "0s", bgIndex)
  )

  const delayMs = parseTimeToMs(pickFromCssList(style.transitionDelay || "0s", bgIndex))

  return {
    transitionProperty,
    durationMs,
    delayMs,
    timingFunction,
  }
}

function cleanupActiveAnimation() {
  if (activeRafId != null) {
    cancelAnimationFrame(activeRafId)
    activeRafId = null
  }

  if (activeCleanup) {
    activeCleanup()
    activeCleanup = null
  }

  if (activeProbe) {
    activeProbe.remove()
    activeProbe = null
  }
}

function createProbe(fromBgClass: string, spec: TransitionSpec): HTMLDivElement {
  const probe = document.createElement("div")

  // Tailwind bg-* class is provided via className keep it offscreen and non-interactive.
  probe.className = `${fromBgClass}`
  probe.setAttribute("aria-hidden", "true")

  // Inline styles for transition reliability and to avoid depending on Tailwind transition utilities.
  probe.style.position = "fixed"
  probe.style.left = "-9999px"
  probe.style.top = "-9999px"
  probe.style.width = "1px"
  probe.style.height = "1px"
  probe.style.pointerEvents = "none"
  probe.style.opacity = "0"

  // Match the real transition configuration.
  probe.style.transitionProperty = spec.transitionProperty || "background-color"
  probe.style.transitionDuration = `${clampMs(spec.durationMs)}ms`
  probe.style.transitionTimingFunction = spec.timingFunction || TAILWIND_DEFAULT_EASING
  probe.style.transitionDelay = `${clampMs(spec.delayMs)}ms`

  document.body.appendChild(probe)
  return probe
}

export function setThemeColorFromElement(args: {
  element: HTMLElement
  fromBgClass: string
  toBgClass: string
}) {
  const { element, fromBgClass, toBgClass } = args
  const spec = readTransitionSpecFromElement(element)
  setThemeColor(fromBgClass, toBgClass, spec.durationMs, spec.timingFunction, spec.delayMs, spec.transitionProperty)
}

/**
 * setThemeColor
 * ----
 * Smoothly animates <meta name="theme-color"> to track Tailwind background transitions.
 *
 * Approach:
 * - Create an offscreen probe element whose background-color transitions via CSS.
 * - Sample its computed backgroundColor each animation frame.
 * - Write that color into the theme-color meta tag.
 *
 * Notes:
 * - Some browsers repaint browser UI (address bar, etc.) at a lower frequency than rAF.
 * - If reduced motion is enabled, we skip animation and set the final color immediately.
 * - Defaults to Tailwind’s transition curve (cubic-bezier(0.4, 0, 0.2, 1)). Use setThemeColorFromElement(...) to stay aligned with future Tailwind changes.
 */
export function setThemeColor(
  fromBgClass: string,
  toBgClass: string,
  duration: number = 300,
  easing: string = TAILWIND_DEFAULT_EASING,
  delay: number = 0,
  transitionProperty: string = "background-color"
) {
  // Cancel any in-flight animation so rapid toggles don't leak DOM nodes.
  cleanupActiveAnimation()

  const meta = getOrCreateThemeColorMeta()

  const spec: TransitionSpec = {
    transitionProperty: transitionProperty || "background-color",
    durationMs: clampMs(duration),
    delayMs: clampMs(delay),
    timingFunction: easing || TAILWIND_DEFAULT_EASING,
  }

  // Build a probe that starts at the previous background class.
  const probe = createProbe(fromBgClass, spec)
  activeProbe = probe

  // Ensure initial styles are applied before we start the transition.
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  probe.offsetHeight

  const finish = () => {
    // Ensure we end on the exact final computed color.
    const finalColor = getComputedStyle(probe).backgroundColor
    meta.content = finalColor
    document.documentElement.style.setProperty("--app-bg", finalColor)
    cleanupActiveAnimation()
  }

  // Reduced motion: set final color instantly and cleanup.
  if (prefersReducedMotion() || duration <= 0 || fromBgClass === toBgClass) {
    // Switch class so computed style reflects final background.
    probe.className = `${toBgClass}`
    // Force style resolution before reading.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    probe.offsetHeight
    const computedColor = getComputedStyle(probe).backgroundColor
    meta.content = computedColor
    document.documentElement.style.setProperty("--app-bg", computedColor)
    cleanupActiveAnimation()
    return
  }

  let start = 0
  const total = clampMs(spec.delayMs) + clampMs(spec.durationMs)

  // Stop condition via transitionend as a backup to time-based stopping.
  const onTransitionEnd = (e: TransitionEvent) => {
    if (e.target !== probe) return
    if (e.propertyName !== "background-color" && e.propertyName !== "background") return
    finish()
  }
  probe.addEventListener("transitionend", onTransitionEnd)

  activeCleanup = () => {
    probe.removeEventListener("transitionend", onTransitionEnd)
  }

  // Start the CSS transition on the next frame, then sample via rAF.
  requestAnimationFrame(() => {
    // If another call happened before this frame, abort.
    if (activeProbe !== probe) return

    // Start the CSS transition now.
    start = performance.now()
    probe.className = `${toBgClass}`

    // Sample once immediately after switching classes so meta starts aligned.
    const computedColor = getComputedStyle(probe).backgroundColor
    meta.content = computedColor
    document.documentElement.style.setProperty("--app-bg", computedColor)

    const tick = () => {
      if (activeProbe !== probe) return

      const color = getComputedStyle(probe).backgroundColor
      meta.content = color
      document.documentElement.style.setProperty("--app-bg", color)

      const elapsed = performance.now() - start
      if (elapsed >= total) {
        finish()
        return
      }

      activeRafId = requestAnimationFrame(tick)
    }

    activeRafId = requestAnimationFrame(tick)
  })
}