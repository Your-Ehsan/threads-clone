"use client";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/src/constants";
import Image from "next/image";
import Link from "next/link";

const Bottombar = () => {
  const _pathName = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (_pathName.includes(link.route) && link.route.length > 1) ||
            _pathName === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`bottombar_link ${isActive && "bg-primary-500 "}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
              />
              <p className="text-subtle-medium max-sm:hidden text-light-1">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
