type ViewProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: "div" | "span"
  onClick?: React.MouseEventHandler<HTMLElement>
  onPressIn?: () => void
  onPressOut?: () => void
}

/**
 * View
 * ----
 * A lightweight, semantic layout container that serves as a flexible
 * building block for composition, layout, and future animation hooks.
 *
 * `View` is intentionally minimal and mirrors native HTML container behavior
 * (similar to `<div>` or `<span>`), while providing a consistent abstraction
 * layer for styling, event handling, and extensibility.
 *
 * Props:
 * - `children?` (ReactNode)
 *   Optional child elements to be rendered inside the container.
 *
 * - `className?` (string)
 *   Optional Tailwind / CSS classes applied to the underlying element.
 *   Use this to control layout, spacing, color inheritance, etc.
 *
 * - `style?` (CSSProperties)
 *   Optional inline styles applied directly to the underlying element.
 *
 * - `as?` ("div" | "span")
 *   The HTML element to render.
 *   Defaults to `"div"`.
 *   Use `"span"` when inline layout behavior is required.
 *
 * - `onClick?` (MouseEventHandler<HTMLElement>)
 *   Optional click handler for interaction.
 *   This allows `View` to act as a clickable or interactive container
 *   without changing its semantic role.
 *
 * Design notes:
 * - `View` does not apply any default styles.
 * - All layout and visual behavior is controlled externally via props.
 * - This component is a natural place to introduce animation or gesture
 *   abstractions in the future without refactoring usage sites.
 */
export default function View({
  children,
  className="",
  style,
  onClick,
  onPressIn,
  onPressOut,
  as: Component="div",
}: ViewProps) {
  return (
    <Component
      className={className}
      style={style}
      onClick={onClick}
      onMouseDown={onPressIn}
      onMouseUp={onPressOut}
      onMouseLeave={onPressOut}
      onTouchStart={onPressIn}
      onTouchEnd={onPressOut}
      onTouchCancel={onPressOut}
    >
      {children}
    </Component>
  )
}