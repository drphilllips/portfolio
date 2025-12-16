import Page from "./components/Page"
import View from "./components/View"
import Text from "./components/Text"
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