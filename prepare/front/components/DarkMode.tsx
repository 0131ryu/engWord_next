import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const DarkMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="grid justify-items-end">
        <div className="flex grid ">
          {currentTheme === "dark" ? (
            <SunIcon
              className="w-8 h-8 cursor-pointer bg-white text-black rounded-full"
              onClick={() => setTheme("light")}
            />
          ) : (
            <MoonIcon
              className="w-8 h-8 cursor-pointer text-white bg-black rounded-full"
              onClick={() => setTheme("dark")}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default DarkMode;
