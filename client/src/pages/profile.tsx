import React, { useEffect, useState, useRef } from "react";
import { TopHeader, Sidebar } from "@/components/ui/sidebar";
import { useAuthContext } from "@/context/auth-context";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { user, updateUser } = useAuthContext();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data: dbUser } = useQuery<any>({
    queryKey: [`/api/users/uid/${user?.uid}`],
    enabled: !!user?.uid,
  });

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    if (dbUser) {
      setDisplayName(dbUser.displayName ?? "");
      setPhotoURL(dbUser.photoURL ?? "");
      setPhotoPreview(dbUser.photoURL ?? "");
      setUsername(dbUser.username ?? "");
      setEmail(dbUser.email ?? "");
    }
  }, [dbUser]);

  const handlePhotoSelect = (file: File | undefined) => {
    if (!file) {
      toast({ title: "Error", description: "Please select a file" });
      return;
    }
    
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please select an image file" });
      return;
    }

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handlePhotoSelect(files[0]);
    }
  };

  const uploadPhotoToStorage = async (file: File): Promise<string> => {
    setUploadingPhoto(true);
    try {
      const fileName = `profile-${user?.uid}-${Date.now()}.${file.name.split(".").pop()}`;
      const filePath = `profile-photos/${fileName}`;

      const { data, error } = await supabase.storage
        .from("photos")
        .upload(filePath, file, { upsert: true });

      if (error) throw error;

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("photos")
        .getPublicUrl(filePath);

      return publicData?.publicUrl || "";
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message });
      throw err;
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    if (!user?.uid) {
      toast({ title: "Error", description: "You must be logged in to update profile" });
      return;
    }
    
    if (!dbUser?.id) {
      toast({ 
        title: "Profile not ready", 
        description: "Please log out and log back in, then try again",
        variant: "destructive" 
      });
      return;
    }
    
    setLoading(true);
    try {
      let finalPhotoURL = photoURL;

      // Upload new photo if selected
      if (photoFile) {
        finalPhotoURL = await uploadPhotoToStorage(photoFile);
        setPhotoFile(null);
      }

      const payload = {
        username: username || (dbUser?.username ?? "user"),
        email: email || (dbUser?.email ?? ""),
        displayName: displayName || null,
        photoURL: finalPhotoURL || null,
      };

      console.log('Updating user with PATCH:', dbUser.id, payload);
      const res = await apiRequest("PATCH", `/api/users/${dbUser.id}`, payload);
      console.log('Update response:', res);
      
      // Update cached db user so UI reflects changes immediately
      try {
        // Invalidate the query to refetch latest server state
        queryClient.invalidateQueries({ queryKey: [`/api/users/uid/${user.uid}`] });
        // Also optimistically update cache with returned object if present
        if (res) {
          queryClient.setQueryData([`/api/users/uid/${user.uid}`], res);
          // Merge returned DB fields into auth context so header/sidebar update
          try {
            updateUser?.({
              displayName: res.displayName ?? res.display_name ?? displayName ?? null,
              photoURL: res.photoURL ?? res.photo_url ?? finalPhotoURL ?? null,
            });
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        // ignore cache errors
      }

      toast({ title: "Profile saved" });
    } catch (err: any) {
      toast({ title: "Save failed", description: String(err?.message || err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--page-background))]">
      <TopHeader />
      <main className="flex-1 p-4 lg:p-8 mt-16 overflow-y-auto pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  {photoPreview ? (
                    <AvatarImage src={photoPreview} />
                  ) : (
                    <AvatarFallback className="text-2xl">{(displayName || username || "").charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition"
                  title="Click to select photo"
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
              <div>
                <div className="text-lg font-medium">{displayName || username || "Traveler"}</div>
                <div className="text-sm text-gray-500">{email}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <label className="text-sm font-medium">Display name</label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />

              <label className="text-sm font-medium">Profile Photo</label>
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer ${
                  dragCounter.current > 0 ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
                }`}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Drag and drop your photo here or{" "}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    click to select
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && handlePhotoSelect(e.target.files[0])}
                  className="hidden"
                />
              </div>
              {photoFile && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ Photo selected: {photoFile.name}
                </p>
              )}

              <label className="text-sm font-medium">Username</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />

              <label className="text-sm font-medium">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />

              <div className="pt-2">
                <Button onClick={handleSave} disabled={loading || uploadingPhoto}>
                  {loading ? "Saving…" : uploadingPhoto ? "Uploading photo…" : "Save Profile"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
