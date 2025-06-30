
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Trash2, Edit } from "lucide-react";
import { galleryApi } from "@/services/api";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
}

export const GalleryManager = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [editingId, setEditingId] = useState<string>("");

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const categories = ["Nature", "Wedding", "Fashion", "Babies", "Couples"];

  // Fetch images on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = selectedCategory 
          ? await galleryApi.getByCategory(selectedCategory)
          : await galleryApi.getAll();
        
        const formatted = data.map((img: any) => ({
          id: img._id,
          title: img.title,
          category: img.category,
          description: img.description,
          url: img.url
        }));
        setGalleryImages(formatted);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };
    fetchImages();
  }, [selectedCategory]);

  // Upload new image
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];

    if (!file || !title || !category || !description) {
      alert("All fields are required.");
      return;
    }

    try {
      const data = await galleryApi.upload(file, title, category);
      
      const newImage: GalleryImage = {
        id: data._id,
        url: data.url,
        title: data.title,
        category: data.category,
        description: data.description,
      };
      
      setGalleryImages((prev) => [...prev, newImage]);
      setTitle("");
      setDescription("");
      setCategory("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  // Delete image
  const handleDelete = async (id: string) => {
    try {
      await galleryApi.delete(id);
      setGalleryImages((prev) => prev.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image");
    }
  };

  // Start editing
  const handleEdit = (id: string, currentTitle: string, currentCategory: string, currentDescription: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditCategory(currentCategory);
    setEditDescription(currentDescription);
  };

  // Save edit
  const handleSaveEdit = async (id: string) => {
    try {
      const data = await galleryApi.update(id, editTitle, editCategory);
      
      setGalleryImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? { ...img, title: data.title, category: data.category, description: data.description }
            : img
        )
      );

      setEditingId("");
      setEditTitle("");
      setEditCategory("");
      setEditDescription("");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update image");
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Filter by Category */}
      <div className="flex gap-4 items-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => setSelectedCategory("")}>
          Clear Filter
        </Button>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="flex flex-col gap-2 md:flex-row md:items-end">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="md:w-1/4"
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="md:w-1/4"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="file" ref={fileRef} accept="image/*" className="md:w-1/4" />
        <Button type="submit" className="md:w-fit">Upload</Button>
      </form>

      {/* Gallery Display */}
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
                    <Input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Description"
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
                    <p className="text-xs italic text-gray-500">{image.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleEdit(image.id, image.title, image.category, image.description)
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
