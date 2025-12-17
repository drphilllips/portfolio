import Text from "../components/Text"
import View from "../components/View"
import { useResponsiveDesign } from "../contexts/useResponsiveDesign"

export default function HomePage() {
  const { onMobile, onMobileSideways } = useResponsiveDesign()

  return (
    <>
      <Text className="text-4xl font-bold">
        Dylan Phillips
      </Text>
      <Text className="text-4xl font-bold">
        Porfolio 🚀
      </Text>

      <View>
        {onMobile && <Text>On Mobile</Text>}
        {onMobileSideways && <Text>sideways</Text>}
      </View>
    </>
  )
}