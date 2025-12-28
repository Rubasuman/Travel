import { Link, useLocation } from "wouter";
import { logOut } from '@/lib/supabase';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, MapPin, Route, Image, Bell, LogOut } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";

// Top Header Component
export function TopHeader() {
  const { user } = useAuthContext();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await logOut();
      toast({
        title: "Signed out successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to sign out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="hidden lg:flex fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
      <div className="flex items-center justify-between w-full px-8 h-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold font-heading text-primary">Wanderlust</h1>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-6">
          <Link href="/profile">
            <a className="flex items-center hover:opacity-80 transition-opacity gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.photoURL || user?.user_metadata?.avatar_url || ""} />
                <AvatarFallback className="text-sm">{(user?.displayName || user?.user_metadata?.full_name || user?.email)?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm leading-none">{user?.displayName || user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User"}</p>
              </div>
            </a>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center text-gray-600 hover:text-gray-800 text-sm whitespace-nowrap"
          >
            <LogOut className="size-4 mr-2" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// Bottom Navigation Component
export function Sidebar() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <aside className="hidden lg:flex fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-16">
      <div className="flex items-center justify-center w-full px-8 h-full">
        {/* Navigation */}
        <nav className="flex gap-2 items-center">
          <NavItem
            href="/"
            icon={<Home className="size-5" />}
            label="Dashboard"
            active={isActive("/")}
          />
          <NavItem
            href="/destinations"
            icon={<MapPin className="size-5" />}
            label="Destinations"
            active={isActive("/destinations")}
          />
          <NavItem
            href="/trips"
            icon={<Route className="size-5" />}
            label="Itineraries"
            active={isActive("/trips")}
          />
          <NavItem
            href="/gallery"
            icon={<Image className="size-5" />}
            label="Travel Gallery"
            active={isActive("/gallery")}
          />
          <NavItem
            href="/notifications"
            icon={<Bell className="size-5" />}
            label="Notifications"
            active={isActive("/notifications")}
          />
        </nav>
      </div>
    </aside>
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
      <a className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm",
        active
          ? "text-gray-800 bg-indigo-50"
          : "text-gray-600 hover:bg-gray-100"
      )}>
        <div className={cn(
          "w-5 flex-shrink-0",
          active ? "text-primary" : "text-gray-500"
        )}>
          {icon}
        </div>
        <span className={cn(
          active && "font-medium"
        )}>
          {label}
        </span>
      </a>
    </Link>
  );
}

export default Sidebar;
