
type TextProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3"
  ic?: boolean
}

/**
 * Text
 * ----
 * A lightweight, semantic text component that mirrors native HTML text behavior
 * while integrating cleanly with the app’s design system.
 *
 * By default, `Text` applies the `text-primary` color. If `ic` (Inherit Color)
 * is set to `true`, the component will NOT apply any text color and will instead
 * inherit the `color` value from its nearest parent container — matching how
 * native elements like `<p>` and `<span>` behave.
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
 *
 * - `ic?` (boolean)
 *   Stands for **Inherit Color**.
 *   When `true`, the component will inherit its text color from a parent container
 *   instead of applying `text-primary`.
 *   Defaults to `false`.
 */
export default function Text({
  children,
  className="",
  style,
  as: Component="p",
  ic=false,
}: TextProps) {
  return (
    <Component
      className={`${!ic && "text-primary"} ${className}`}
      style={style}
    >
      {children}
    </Component>
  )
}