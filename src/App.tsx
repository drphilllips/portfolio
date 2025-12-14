import ColorPalette from "./components/ColorPalette"
import Page from "./components/ui/Page"
import Text from "./components/ui/Text"

export default function App() {

  return (
    <Page className="gap-6">
      <Text className="text-4xl font-bold">
        Color-inheritance is working 🚀
      </Text>
      <ColorPalette />
    </Page>
  )
}