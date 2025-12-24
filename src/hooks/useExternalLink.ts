import { useCallback } from "react"

/**
 * Small helper hook for opening external-ish links (http(s), mailto:, tel:, and internal /paths).
 *
 * Note: browsers generally won't "open mailto/tel in a new tab" the way they do for http(s).
 * For those schemes we just delegate to `window.location.href`.
 */
export default function useExternalLink(href?: string) {
  const isSpecialScheme = (value: string) => /^(mailto:|tel:)/i.test(value)

  const openLinkInThisTab = useCallback((e: MouseEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!href) return
    if (typeof window === "undefined") return

    e.preventDefault()

    // mailto:/tel: should be handled by the OS / browser handler
    if (isSpecialScheme(href)) {
      window.location.href = href
      return
    }

    // Works for absolute URLs and relative paths like "/about".
    window.location.assign(href)
  }, [href])

  const openLinkInNewTab = useCallback((e: MouseEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!href) return
    if (typeof window === "undefined") return

    e.preventDefault()

    // Opening mailto:/tel: "in a new tab" isn't really a thing; just trigger the handler.
    if (isSpecialScheme(href)) {
      window.location.href = href
      return
    }

    // Use noopener/noreferrer to avoid giving the new page access to window.opener.
    window.open(href, "_blank", "noopener,noreferrer")
  }, [href])

  return { openLinkInThisTab, openLinkInNewTab }
}