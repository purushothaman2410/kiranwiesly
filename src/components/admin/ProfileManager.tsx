/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";

interface ProfileImage {
  id: string;
  url: string;
  title: string;
}

export const ProfileManager = () => {
  const [profileImages, setProfileImages] = useState<ProfileImage[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");

  // ✅ Load all profiles on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/profiles")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          id: item._id,
          url: item.url,
          title: item.title,
        }));
        setProfileImages(formatted);
      });
  }, []);

  // ✅ Upload a new profile
  const handleUpload = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    try {
      const res = await fetch("http://localhost:5000/api/profiles/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setProfileImages((prev) => [
        ...prev,
        { id: data._id, url: data.url, title: data.title },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  // ✅ Delete profile
  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/profiles/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProfileImages(profileImages.filter((img) => img.id !== id));
    }
  };

  // ✅ Edit title
  const handleSaveEdit = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/profiles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: editTitle }),
    });

    if (res.ok) {
      setProfileImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, title: editTitle } : img
        )
      );
      setEditingId("");
      setEditTitle("");
    }
  };

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
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
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                {editingId === image.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(image.id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId("")}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium text-sm">{image.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleEdit(image.id, image.title)
                        }
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ✅ Upload Form Component
const PhotoUpload = ({
  onUpload,
}: {
  onUpload: (file: File, title: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      alert("Image and title required");
      return;
    }
    onUpload(file, title);
    setFile(null);
    setTitle("");
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
      <Input
        type="text"
        placeholder="Profile title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit">Upload</Button>
    </form>
  );
};
