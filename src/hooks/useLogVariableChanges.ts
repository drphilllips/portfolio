import { useEffect } from "react"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useLogVariableChanges(vars: Record<string, any>) {

  Object.entries(vars).forEach(([key, value]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      console.log(`${key}:`, value)
    }, [value, key])
  })

}