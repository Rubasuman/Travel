import Sidebar from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import FirebaseDatabaseTest from "@/components/firebase-database-test";

export default function FirebaseTest() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - Desktop */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 overflow-y-auto pb-16 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading">Firebase Database Test</h1>
            <p className="text-gray-600 mt-1">Test Firestore database connection and operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FirebaseDatabaseTest />
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}