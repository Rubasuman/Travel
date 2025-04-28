import { Link, useLocation } from "wouter";
import { Home, MapPin, Route, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 px-6 py-2">
      <div className="flex justify-between items-center">
        <NavItem
          href="/"
          icon={<Home className="size-5" />}
          label="Home"
          active={isActive("/")}
        />
        <NavItem
          href="/destinations"
          icon={<MapPin className="size-5" />}
          label="Explore"
          active={isActive("/destinations")}
        />
        <NavItem
          href="/trips"
          icon={<Route className="size-5" />}
          label="Trips"
          active={isActive("/trips")}
        />
        <NavItem
          href="/notifications"
          icon={<Bell className="size-5" />}
          label="Alerts"
          active={isActive("/notifications")}
        />
        <NavItem
          href="/profile"
          icon={<User className="size-5" />}
          label="Profile"
          active={isActive("/profile")}
        />
      </div>
    </div>
  );
}

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
};

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link href={href}>
      <a className="flex flex-col items-center">
        <div className={cn(
          "flex items-center justify-center",
          active ? "text-primary" : "text-gray-500"
        )}>
          {icon}
        </div>
        <span className={cn(
          "text-xs mt-1",
          active ? "text-primary" : "text-gray-500"
        )}>
          {label}
        </span>
      </a>
    </Link>
  );
}

export default MobileNav;
