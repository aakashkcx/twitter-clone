"use client";

import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { setTheme, theme } = useTheme();
  const current = mounted && (theme ?? "system");

  return (
    <div className="flex flex-row rounded-full border">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full transition-colors",
          current === "light" && "bg-accent text-accent-foreground border",
        )}
        aria-label="Light theme"
        onClick={() => setTheme("light")}
      >
        <Sun />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full transition-colors",
          current === "system" && "bg-accent text-accent-foreground border",
        )}
        aria-label="System theme"
        onClick={() => setTheme("system")}
      >
        <Computer />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full transition-colors",
          current === "dark" && "bg-accent text-accent-foreground border",
        )}
        aria-label="Dark theme"
        onClick={() => setTheme("dark")}
      >
        <Moon />
      </Button>
    </div>
  );
}
