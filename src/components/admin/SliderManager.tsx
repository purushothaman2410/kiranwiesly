/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";

interface SliderImage {
  id: string;
  url: string;
  title: string;
}

export const SliderManager = () => {
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/sliders")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((item: any) => ({
          id: item._id,
          url: item.url,
          title: item.title
        }));
        setSliderImages(formatted);
      });
  }, []);

  const handleUpload = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    try {
      const res = await fetch("http://localhost:5000/api/sliders/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      setSliderImages(prev => [...prev, {
        id: data._id,
        url: data.url,
        title: data.title
      }]);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/sliders/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      setSliderImages(sliderImages.filter(img => img.id !== id));
    }
  };

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/sliders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: editTitle })
    });

    if (res.ok) {
      setSliderImages(sliderImages.map(img =>
        img.id === id ? { ...img, title: editTitle } : img
      ));
      setEditingId("");
      setEditTitle("");
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
                      className="text-sm"
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

// Embedded PhotoUpload component
const PhotoUpload = ({ onUpload }: { onUpload: (file: File, title: string) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return alert("Please select image and title");
    onUpload(file, title);
    setFile(null);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input type="file" accept="image/*" onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
        }
      }} />
      <Input placeholder="Enter image title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default SliderManager;

