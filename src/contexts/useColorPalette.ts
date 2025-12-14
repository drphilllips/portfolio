import { useContext } from "react";
import ColorPaletteContext from "./ColorPaletteContext";

export function useColorPalette() {
  const ctx = useContext(ColorPaletteContext);
  if (!ctx) {
    throw new Error("useColorPalette must be used inside <ColorPaletteProvider />");
  }
  return ctx;
}