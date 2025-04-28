import { useState } from "react";
import { Bell, Plane, Hotel, CloudRain } from "lucide-react";
import { Notification } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const [isRead, setIsRead] = useState(notification.isRead);
  const queryClient = useQueryClient();

  const markAsRead = async () => {
    if (isRead) return;
    
    try {
      await apiRequest("PATCH", `/api/notifications/${notification.id}/read`, {});
      setIsRead(true);
      queryClient.invalidateQueries({ queryKey: [`/api/users/${notification.userId}/notifications`] });
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "Flight":
        return <Plane className="text-primary" />;
      case "Hotel":
        return <Hotel className="text-secondary" />;
      case "Weather":
        return <CloudRain className="text-accent" />;
      default:
        return <Bell className="text-primary" />;
    }
  };

  const getIconBackground = () => {
    switch (notification.type) {
      case "Flight":
        return "bg-indigo-100";
      case "Hotel":
        return "bg-blue-100";
      case "Weather":
        return "bg-amber-100";
      default:
        return "bg-indigo-100";
    }
  };

  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

  return (
    <div 
      className={cn(
        "flex items-start pb-4 border-b border-gray-100",
        !isRead && "bg-blue-50/30"
      )}
      onClick={markAsRead}
    >
      <div className={cn("rounded-full p-2 flex-shrink-0", getIconBackground())}>
        {getNotificationIcon()}
      </div>
      <div className="ml-4">
        <p className={cn("text-sm", !isRead && "font-medium")}>
          {notification.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
        <span className="text-xs text-gray-400 mt-1 block">{timeAgo}</span>
      </div>
    </div>
  );
}

export default NotificationItem;
