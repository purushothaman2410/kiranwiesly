
import { useState } from "react";
import { PhotoUpload } from "./PhotoUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export const GalleryManager = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    {
      id: "1",
      url: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749223966/f1_hts7yr.jpg",
      title: "Fashion Photography",
      category: "Fashion"
    },
    {
      id: "2",
      url: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224049/hm3_povm3o.jpg",
      title: "Wedding Photography",
      category: "Wedding"
    }
  ]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const categories = ["Nature", "Wedding", "Fashion", "Babies", "Couples"];

  const handleUpload = (file: File, title: string) => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      title: title,
      category: "Nature" // Default category
    };
    setGalleryImages([...galleryImages, newImage]);
  };

  const handleDelete = (id: string) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  const handleEdit = (id: string, currentTitle: string, currentCategory: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditCategory(currentCategory);
  };

  const handleSaveEdit = (id: string) => {
    setGalleryImages(galleryImages.map(img =>
      img.id === id ? { ...img, title: editTitle, category: editCategory } : img
    ));
    setEditingId("");
    setEditTitle("");
    setEditCategory("");
  };

  return (
    <div className="space-y-6">
      <PhotoUpload onUpload={handleUpload} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image) => (
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
                      placeholder="Title"
                      className="text-sm"
                    />
                    <Select value={editCategory} onValueChange={setEditCategory}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <p className="text-xs text-gray-600">{image.category}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(image.id, image.title, image.category)}
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
