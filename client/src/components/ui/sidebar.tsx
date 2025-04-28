import { Link, useLocation } from "wouter";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, MapPin, Route, Images, Bell, LogOut } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuthContext();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
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

  const isActive = (path: string) => location === path;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold font-heading text-primary">Wanderlust</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
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
          icon={<Images className="size-5" />} 
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
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={user?.photoURL || ""} />
            <AvatarFallback>{user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium">{user?.displayName || "User"}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="mt-4 flex items-center text-gray-600 hover:text-gray-800"
        >
          <LogOut className="size-4 mr-2" />
          <span>Sign out</span>
        </button>
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
        "flex items-center px-4 py-3 rounded-lg transition-colors",
        active
          ? "text-gray-800 bg-indigo-50"
          : "text-gray-600 hover:bg-gray-100"
      )}>
        <div className={cn(
          "w-5",
          active ? "text-primary" : "text-gray-500"
        )}>
          {icon}
        </div>
        <span className={cn(
          "ml-3",
          active && "font-medium"
        )}>
          {label}
        </span>
      </a>
    </Link>
  );
}

export default Sidebar;
