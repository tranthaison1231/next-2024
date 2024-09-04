"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  {
    label: "Settings",
    link: "/settings",
  },
];

export default function Header() {
  const pathname = usePathname();

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
