import type { ImageType } from "../content/schemas/image.schema";


export default function Image({
  label,
  src,
}: ImageType) {
  return (
    <img
      src={src}
      alt={label}
      aria-label={label}
      title={label}
      className="w-40 h-40 rounded-xl"
    />
  )
}