import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="border-t py-4">
      <div className="container flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div>Built by Aakash Kc</div>
        <ThemeToggle />
      </div>
    </footer>
  );
}
