/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import { profileApi } from "@/services/api";

interface ProfileImage {
  id: string;
  url: string;}

export const ProfileManager = () => {
  const [profileImages, setProfileImages] = useState<ProfileImage[]>([]);


  // Load all profiles on mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await profileApi.getAll();
        const formatted = data.map((item: any) => ({
          id: item._id,
          url: item.image,
        }));
        setProfileImages(formatted);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  // Upload a new profile
  const handleUpload = async (file: File) => {
    try {
      const data = await profileApi.upload(file);
      setProfileImages((prev) => [
        ...prev,
        { id: data._id, url: data.base64 },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
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

  // Edit title

  return (
    <div className="space-y-6">
      <PhotoUpload onUpload={handleUpload} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profileImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={image.base64 || image.url}
                alt={image.id}
                className="w-full h-48 object-cover"
              />
                <div className="flex justify-between items-center mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Upload Form Component
const PhotoUpload = ({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file ) {
      alert("Image and title required");
      return;
    }
    onUpload(file);
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) =>
          e.target.files && setFile(e.target.files[0])
        }
      />
      <Button type="submit">Upload</Button>
    </form>
  );
};
