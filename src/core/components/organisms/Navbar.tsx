"use client";
import type { User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  me: User | null;
}

export default function Navbar({ me }: NavbarProps) {
  const pathname = usePathname();

  const MENUS = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "About",
      link: "/about",
    },
    {
      label: "Products",
      link: "/products",
    },
    me
      ? {
          label: me.email,
          link: "/profile",
        }
      : {
          label: "Login",
          link: "/login",
        },
    {
      label: "Register",
      link: "/register",
    },
  ];

  return (
    <nav>
      <ul className="flex gap-4 p-4">
        {MENUS.map((menu) => (
          <li
            key={menu.link}
            className={pathname === menu.link ? "text-blue-500" : "text-black"}
          >
            <Link href={menu.link}>{menu.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
