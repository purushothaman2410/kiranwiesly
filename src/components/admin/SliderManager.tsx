
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: SliderManager.tsx

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import { sliderApi } from "@/services/api";

interface SliderImage {
  id: string;
  url: string;
  title: string;
}

const SliderManager = () => {
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const data = await sliderApi.getAll();
        console.log("Slider API response:", data);
        
        // Handle both array and object responses
        const imageArray = Array.isArray(data) ? data : (data.data || []);
        
        const formatted = imageArray.map((item: any) => ({
          id: item._id || item.id,
          url: item.base64 || item.image || item.url,
          title: item.title || item.filename || 'Untitled',
        }));
        
        setSliderImages(formatted);
      } catch (error) {
        console.error("Failed to load slider images:", error);
        setSliderImages([]); // Set empty array on error
      }
    };

    fetchSliderImages();
  }, []);

  const handleUpload = async (file: File, title: string) => {
    try {
      console.log("Uploading slider image:", { file: file.name, title });
      
      const data = await sliderApi.upload(file, title);
      console.log("Upload response:", data);

      const newImage = {
        id: data._id || data.id,
        url: data.base64 || data.image || data.url,
        title: data.title || title,
      };

      setSliderImages((prev) => [...prev, newImage]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await sliderApi.delete(id);
      setSliderImages((prev) => prev.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await sliderApi.update(id, editTitle);
      setSliderImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, title: editTitle } : img))
      );
      setEditingId("");
      setEditTitle("");
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="space-y-6">
      <PhotoUpload onUpload={handleUpload} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliderImages.map((image) => (
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
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSaveEdit(image.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId("")}>
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
                        onClick={() => handleEdit(image.id, image.title)}
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

// Embedded PhotoUpload Component
const PhotoUpload = ({
  onUpload,
}: {
  onUpload: (file: File, title: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      alert("Both image and title are required");
      return;
    }

    onUpload(file, title.trim());
    setFile(null);
    setTitle("");
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <Input
        type="text"
        placeholder="Slider Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit">Upload Slider</Button>
    </form>
  );
};

export default SliderManager;
