import { useState } from "react";
import { Button } from "@/components/ui/button";
// Create or import your navbar component
import { ReactNode } from "react";

const Navbar = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => <nav className={className}>{children}</nav>;
import Link from "next/link";

const TransparentNavbar = () => {
  return (
    <div>
      {/* Transparent Navbar */}
      <Navbar className="navbar-glass fixed top-20 left-20 right-20 lg:right-48 lg:left-48 z-50">
        <div className="flex justify-between items-center z-50 px-6  py-6">
          <h1 className="text-white font-bold ">PixArt</h1>
          <div className="space-x-4">
            <Link
              href={"/"}
              className="bg-transparent hover:text-primary/90 text-muted-foreground border-none"
            >
              Home
            </Link>
            <Link
              href={"#features"}
              className="bg-transparent hover:text-primary/90 text-muted-foreground border-none"
            >
              Features
            </Link>
            <Link
              href={"#home"}
              className="bg-primary hover:text-primary/90 py-2 px-4 rounded-full text-white border-none"
            >
              Generate
            </Link>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default TransparentNavbar;
