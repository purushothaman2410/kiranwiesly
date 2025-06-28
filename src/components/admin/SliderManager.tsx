
import { useState } from "react";
import { PhotoUpload } from "./PhotoUpload";
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
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([
    {
      id: "1",
      url: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749223874/k3_yhuz4f.jpg",
      title: "Professional Photography"
    }
  ]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");

  const handleUpload = (file: File, title: string) => {
    // In a real app, you would upload the file to your server/cloud storage
    const newImage: SliderImage = {
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      title: title
    };
    setSliderImages([...sliderImages, newImage]);
  };

  const handleDelete = (id: string) => {
    setSliderImages(sliderImages.filter(img => img.id !== id));
  };

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = (id: string) => {
    setSliderImages(sliderImages.map(img =>
      img.id === id ? { ...img, title: editTitle } : img
    ));
    setEditingId("");
    setEditTitle("");
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
