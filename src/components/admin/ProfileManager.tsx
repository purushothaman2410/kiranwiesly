
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { profileApi } from "@/services/api";

interface ProfileImage {
  id: string;
  url: string;
}

export const ProfileManager = () => {
  const [profileImages, setProfileImages] = useState<ProfileImage[]>([]);

  // Load all profiles on mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await profileApi.getAll();
        console.log("Profile API response:", data);
        
        const formatted = data.map((item: any) => ({
          id: item._id || item.id,
          url: item.base64 || item.image || item.url,
        }));
        setProfileImages(formatted);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
        setProfileImages([]);
      }
    };

    fetchProfiles();
  }, []);

  // Upload a new profile
  const handleUpload = async (file: File) => {
    try {
      console.log("Uploading profile image:", file.name);
      
      const data = await profileApi.upload(file);
      console.log("Profile upload response:", data);
      
      setProfileImages((prev) => [
        ...prev,
        { 
          id: data._id || data.id, 
          url: data.base64 || data.image || data.url 
        },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  // Delete profile
  const handleDelete = async (id: string) => {
    try {
      await profileApi.delete(id);
      setProfileImages(profileImages.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <PhotoUpload onUpload={handleUpload} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profileImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={image.url}
                alt={`Profile ${image.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Upload Form Component for Profile
const PhotoUpload = ({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image");
      return;
    }
    
    setIsUploading(true);
    try {
      await onUpload(file);
      setFile(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            required
          />
        </div>
        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload Profile Image"}
        </Button>
      </form>
    </Card>
  );
};
