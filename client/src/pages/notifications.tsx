import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-context";
import Sidebar from "@/components/ui/sidebar";
import { TopHeader } from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import NotificationItem from "@/components/dashboard/notification-item";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: dbUser } = useQuery({
    queryKey: [`/api/users/uid/${user?.uid}`],
    enabled: !!user?.uid,
  });

  const { data: notifications = [] } = useQuery<any>({
    queryKey: [`/api/users/${dbUser?.id}/notifications`],
    enabled: !!dbUser?.id,
  });

  const unreadNotifications = notifications.filter((n: any) => !n.isRead);
  const readNotifications = notifications.filter((n: any) => n.isRead);

  const markAllAsRead = async () => {
    if (unreadNotifications.length === 0) return;

    try {
      const promises = unreadNotifications.map((notification: any) => 
        apiRequest("PATCH", `/api/notifications/${notification.id}/read`, {})
      );
      
      await Promise.all(promises);
      
      queryClient.invalidateQueries({ queryKey: [`/api/users/${dbUser.id}/notifications`] });
      
      toast({
        title: "Notifications marked as read",
        description: `${unreadNotifications.length} notification${unreadNotifications.length > 1 ? 's' : ''} marked as read`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header - Desktop */}
      <TopHeader />
      
      {/* Sidebar - Desktop Bottom Navigation */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-16 overflow-y-auto pb-32 lg:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-heading">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated on your travel plans and alerts</p>
            </div>
            {unreadNotifications.length > 0 && (
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0"
                onClick={markAllAsRead}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">
                All
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {notifications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <span className="ml-2 bg-indigo-100 text-primary px-2 py-0.5 rounded-full text-xs">
                  {unreadNotifications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {notifications.length === 0 ? (
                      <div className="text-center py-12">
                        <Bell className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          You don't have any notifications yet. They will appear here when you receive them.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {notifications.map((notification: any) => (
                          <NotificationItem 
                            key={notification.id} 
                            notification={notification} 
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="unread">
                <Card>
                  <CardHeader>
                    <CardTitle>Unread Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {unreadNotifications.length === 0 ? (
                      <div className="text-center py-12">
                        <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">All caught up!</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          You have no unread notifications.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {unreadNotifications.map((notification: any) => (
                          <NotificationItem 
                            key={notification.id} 
                            notification={notification} 
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="read">
                <Card>
                  <CardHeader>
                    <CardTitle>Read Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {readNotifications.length === 0 ? (
                      <div className="text-center py-12">
                        <Bell className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No read notifications</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Notifications you've read will appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {readNotifications.map((notification: any) => (
                          <NotificationItem 
                            key={notification.id} 
                            notification={notification} 
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
