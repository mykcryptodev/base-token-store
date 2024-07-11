import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const useIsDarkTheme = () => {
  const { theme } = useTheme();
  // force theme refresh
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  useEffect(() => {
    if (theme === 'dark') {
      return setIsDarkTheme(true);
    }
    if (theme === 'system') {
      // find out if the user prefers dark or light
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
      if (darkQuery.matches) {
        return setIsDarkTheme(true)
      } else {
        return setIsDarkTheme(false)
      }
    }
    setIsDarkTheme(false);
  }, [theme]);
  
  return isDarkTheme;
}

export default useIsDarkTheme;