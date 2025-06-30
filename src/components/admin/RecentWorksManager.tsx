/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { PhotoUpload } from "./PhotoUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit } from "lucide-react";
import { recentWorksApi } from "@/services/api";

interface RecentWork {
  id: string;
  url: string;
  title: string;
  category: string;
}

export const RecentWorksManager = () => {
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([]);
 const [editingId, setEditingId] = useState<string>("");
   const [editTitle, setEditTitle] = useState("");
   const [editCategory, setEditCategory] = useState("");
   const [title, setTitle] = useState("");
   const [category, setCategory] = useState("");
   const [selectedCategory, setSelectedCategory] = useState<string>("");
 
   const fileRef = useRef<HTMLInputElement | null>(null);
 
   const categories = ["Nature", "Wedding", "Fashion", "Babies", "Couples"];
   useEffect(() => {
      const fetchRecentImages = async () => {
        try {
          const data = await recentWorksApi.getAll(); 
          const formatted = data.map((item: any) => ({
            id: item._id,
            url: item.base64 || item.image,
            title: item.title || item.filename,
            category: item.category || "Uncategorized",
          }));
          setRecentWorks(formatted);
        } catch (error) {
          console.error("Failed to load gallery images:", error);
        }
      };
      fetchRecentImages();
    }, []);
  
    const handleUpload = async (file: File, title: string, category: string) => {
      try {
        const formData = new FormData();
        formData.append("file", file); // ✅ Make sure backend expects 'image'
        formData.append("title", title);
        formData.append("category", category);
  
        const data = await recentWorksApi.upload(file, title, category);
  
        setRecentWorks((prev) => [
          ...prev,
          {
            id: data._id,
            url: data.base64,
            title: data.title,
            category: data.category,
          },
        ]);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed");
      }
    };
  
    const handleDelete = async (id: string) => {
      try {
        await recentWorksApi.delete(id);
        setRecentWorks((prev) => prev.filter((img) => img.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete image");
      }
    };
  
    const handleEdit = (id: string, currentTitle: string, currentCategory: string) => {
      setEditingId(id);
      setEditTitle(currentTitle);
      setEditCategory(currentCategory);
    };
  
    const handleSaveEdit = async (id: string) => {
      try {
        const data = await recentWorksApi.update(id, editTitle, editCategory);
        setRecentWorks((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, title: data.title, category: data.category }
              : img
          )
        );
        setEditingId("");
        setEditTitle("");
        setEditCategory("");
      } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update image");
      }
    }
  const filteredImages = selectedCategory && selectedCategory !== "all"
    ? recentWorks.filter((img) => img.category === selectedCategory)
    : recentWorks;
 return (
    <div className="space-y-6 p-4">
      {/* Filter */}
      <div className="flex gap-4 items-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => setSelectedCategory("")}>
          Clear Filter
        </Button>
      </div>

      {/* Upload */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const file = fileRef.current?.files?.[0];
          if (!file || !title || !category) {
            alert("All fields are required");
            return;
          }
          handleUpload(file, title, category);
          setTitle("");
          setCategory("");
          if (fileRef.current) fileRef.current.value = "";
        }}
        className="flex flex-col gap-2 md:flex-row md:items-end"
      >
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="md:w-1/4"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="file" ref={fileRef} accept="image/*" className="md:w-1/4" />
        <Button type="submit" className="md:w-fit">
          Upload
        </Button>
      </form>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
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
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
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