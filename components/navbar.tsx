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
import { ThemeToggle } from "./theme-toggle";

const TransparentNavbar = () => {
  return (
    <div>
      {/* Transparent Navbar */}
      <Navbar className="navbar-glass fixed top-10 left-20 right-20 lg:right-48 lg:left-48 z-50">
        <div className="flex justify-between items-center z-50 px-6  py-6">
          <h1 className="text-white font-bold ">PixArt</h1>
          <div className="space-x-4">
            <Link
              href={"/"}
              className="bg-transparent hover:text-primary/90  border-none"
            >
              Blogs
            </Link>
            <Link
              href={"#features"}
              className="bg-transparent hover:text-primary/90  border-none"
            >
              Tools{" "}
            </Link>
            <Link
              href={"/"}
              className="bg-transparent hover:text-primary/90  border-none"
            >
              Sign In
            </Link>

            <Link
              href={"#home"}
              className="bg-primary  py-2 px-4 text-sm rounded-full text-white border-none hover:bg-primary/90"
            >
              Lanuch App
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default TransparentNavbar;
