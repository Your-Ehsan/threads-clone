import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { logout } from "@/public/assets";
import { dark } from "@clerk/themes";

const Topbar = () => {
  return (
    <nav className="topbar ">
      <Link href={`/`} className="flex items-center gap-4">
        <Image src={logo} width={28} height={28} alt="alt text" />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src={logout}
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Topbar;
