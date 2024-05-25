import React from "react";
import { ModeToggle } from "@/components/dark-mode-toggle";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-between items-center text-center text-xs">
      <p className="relative justify-center">Made with ❤️ by CampusCompass</p>
      <div className="relative justify-end">
        <ModeToggle />
      </div>
    </footer>
  );
};

export default Footer;
