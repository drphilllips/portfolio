
// Extend Navigator to include optional standalone property for iOS PWA detection
export type NavigatorWithStandalone = Navigator & {
  standalone?: boolean
}

// Minimal User-Agent Client Hints typing (Chromium-based browsers)
// We only need the `mobile` boolean for our detection logic.
export type NavigatorWithUAData = Navigator & {
  userAgentData?: {
    mobile?: boolean
  }
}

export type ViewportDimensions = {
  width: number
  height: number
}