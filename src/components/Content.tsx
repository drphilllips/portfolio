import type { ContentType } from "../content/schemas/content.schema"
import View from "./View"
import Text from "./Text"
import Image from "./Image"
import type { ImageType } from "../content/schemas/image.schema"
import Button from "./Button"
import type { LinkType } from "../content/schemas/link.schema"

export default function Content({
  title,
  shortText,
  longText,
  images,
  links,
}: ContentType) {
  return (
    <View>
      {title && <Text className="lg:text-2xl text-xl">{title}</Text>}
      {(images && images.length > 0) && (
        <Image label={images[0].label} src={images[0].src} />
      )}
      {shortText && <Text>{shortText}</Text>}
      {longText && <Text>{longText}</Text>}
      {(images && images.length > 1) && images.slice(1).map(
        ({label, src}: ImageType, i) => (
          <Image key={i} label={label} src={src} />
        )
      )}
      {links && links.map(
        ({label, href}: LinkType, i) => (
          <Button key={i} label={label} href={href} />
        )
      )}
    </View>
  )
}