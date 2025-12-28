import Text from "../components/basic/Text"
import View from "../components/basic/View"
import { useResponsiveDesign } from "../contexts/useResponsiveDesign"
import colorPaletteHelperIcon from "../../src/assets/color_palette_helper.svg"
import { BOARD_CLOSED_SIZE } from "../features/color-palette/constants/colorPalette"
import useNavigationUtils from "../hooks/useNavigationUtils"

export default function HomePage() {
  const { onMobile, onMobileSideways } = useResponsiveDesign()
  const { isFirstMount } = useNavigationUtils()

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

      {isFirstMount && (
        <img
          src={colorPaletteHelperIcon}
          alt="Color Palette Helper Text"
          className="fixed bottom-4 right-4"
          style={{ width: BOARD_CLOSED_SIZE*2, height: BOARD_CLOSED_SIZE*2 }}
        />
      )}
    </>
  )
}