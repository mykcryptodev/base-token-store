import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { type FC,useEffect, useState } from 'react';

interface Props {
  toggle?: boolean;
}

const ThemeSwitch: FC<Props> = ({ toggle }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) {
    return null
  }

  if (toggle) {
    return (
      <input 
        type="checkbox" 
        className="toggle toggle-lg" checked={theme === "winter"}
        onChange={() => setTheme(theme === "dark" ? "winter" : "dark")}
      />
    )
  }

  return (
    <div className="mx-auto w-full justify-center flex">
      <label className="swap swap-rotate">
        <input type="checkbox" checked={theme === "winter"} onChange={() => setTheme(theme === "dark" ? "winter" : "dark")} />
        <div className="swap-on h-12 w-12 bg-gradient-to-b from-yellow-100 to-transparent rounded-full relative">
          <SunIcon className="h-4 w-4 text-yellow-500 absolute -top-.5 right-0 opacity-80" />
          <Image
            src="/images/light.png"
            alt="light"
            className="mx-auto"
            width={42}
            height={42}
          />
        </div>
        <div className="swap-off h-12 w-12 bg-gradient-to-b from-blue-900 to-transparent rounded-full relative">
          <MoonIcon className="h-3 w-3 text-yellow-400 absolute -top-.5 right-0 opacity-80" />
          <Image
            src="/images/dark.png"
            className="mx-auto"
            alt="dark"
            width={42}
            height={42}
          />
        </div>
      </label>
    </div>
  )
}

export default ThemeSwitch;