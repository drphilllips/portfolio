
type TextProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3"
}

/**
 * Text
 * ----
 * Standalone text that defaults to text-primary for text color
 */
export default function Text({
  children,
  className="",
  style,
  as: Component="p",
}: TextProps) {
  return (
    <Component
      className={`text-primary ${className}`}
      style={style}
    >
      {children}
    </Component>
  )
}