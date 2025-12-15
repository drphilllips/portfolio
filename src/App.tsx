import Page from "./components/ui/Page"
import Text from "./components/ui/Text"
import View from "./components/ui/View"
import { useResponsiveDesign } from "./contexts/useResponsiveDesign"

export default function App() {
  const { onMobile, onMobileSideways } = useResponsiveDesign()

  return (
    <Page className="gap-6">
      <Text className="text-4xl font-bold">
        Color-inheritance is working 🚀
      </Text>
      <View>
        {onMobile && <Text>On Mobile</Text>}
        {onMobileSideways && <Text>sideways</Text>}
      </View>
    </Page>
  )
}