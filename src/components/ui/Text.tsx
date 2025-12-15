
type TextProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3"
}

/**
 * Text
 * ----
 * A lightweight, semantic text component that mirrors native HTML text behavior
 * while integrating cleanly with the app’s design system.
 *
 * Props:
 * - `children` (ReactNode)
 *   The text or elements to be rendered inside the component.
 *
 * - `className?` (string)
 *   Optional Tailwind / CSS classes applied to the underlying element.
 *   If `ic` is `false` (default), `text-primary` is prepended unless overridden.
 *
 * - `style?` (CSSProperties)
 *   Optional inline styles applied directly to the underlying element.
 *
 * - `as?` ("p" | "span" | "div" | "h1" | "h2" | "h3")
 *   The semantic HTML element to render. Defaults to `"p"`.
 *   Use this to control document structure and accessibility
 *   without affecting visual styling.
 */
export default function Text({
  children,
  className="",
  style,
  as: Component="p",
}: TextProps) {
  return (
    <Component
      className={`transition-colors duration-300 ${className}`}
      style={style}
    >
      {children}
    </Component>
  )
}