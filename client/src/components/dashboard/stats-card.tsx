import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  iconClassName?: string;
  iconBgClassName?: string;
}

export function StatsCard({ 
  icon, 
  value, 
  label, 
  iconClassName = "text-primary",
  iconBgClassName = "bg-indigo-100"
}: StatsCardProps) {
  return (
    <Card className="border border-gray-100 shadow-sm p-6">
      <div className="flex items-center">
        <div className={cn("rounded-full p-3", iconBgClassName)}>
          <div className={cn("text-xl", iconClassName)}>
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium">{value}</h3>
          <p className="text-gray-500 text-sm">{label}</p>
        </div>
      </div>
    </Card>
  );
}

export default StatsCard;
