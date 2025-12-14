import Page from "./components/ui/Page"
import Text from "./components/ui/Text"
import { useResponsiveDesign } from "./contexts/useResponsiveDesign"

export default function App() {
  const { onMobile } = useResponsiveDesign()

  return (
    <Page className="gap-6">
      <Text className="text-4xl font-bold">
        Color-inheritance is working 🚀
      </Text>
      {onMobile && (
        <Text>On Mobile</Text>
      )}
    </Page>
  )
}