
import { useEffect, useState } from "react";
import { PhotoUpload } from "./PhotoUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit } from "lucide-react";
import { recentWorksApi } from "@/services/api";

interface RecentWork {
  id: string;
  image: string;
  title: string;
  category: string;
}

export const RecentWorksManager = () => {
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = ["Nature", "Wedding", "Fashion", "Babies", "Couples"];

  useEffect(() => {
    const fetchRecentWorks = async () => {
      try {
        const data = selectedCategory 
          ? await recentWorksApi.getByCategory(selectedCategory)
          : await recentWorksApi.getAll();
          
        const formatted = data.map((item: any) => ({
          id: item._id,
          image: item.url,
          title: item.title,
          category: item.category,
        }));
        setRecentWorks(formatted);
      } catch (error) {
        console.error("Failed to fetch recent works:", error);
      }
    };

    fetchRecentWorks();
  }, [selectedCategory]);

  const handleUpload = async (file: File, title: string) => {
    try {
      const data = await recentWorksApi.upload(file, title, "Nature");
      setRecentWorks(prev => [...prev, {
        id: data._id,
        image: data.url,
        title: data.title,
        category: data.category,
      }]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await recentWorksApi.delete(id);
      setRecentWorks(recentWorks.filter(work => work.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  const handleEdit = (id: string, currentTitle: string, currentCategory: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditCategory(currentCategory);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await recentWorksApi.update(id, editTitle, editCategory);
      setRecentWorks(recentWorks.map(work =>
        work.id === id ? { ...work, title: editTitle, category: editCategory } : work
      ));
      setEditingId("");
      setEditTitle("");
      setEditCategory("");
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="space-y-6">
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

      <PhotoUpload onUpload={handleUpload} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentWorks.map((work) => (
          <Card key={work.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                {editingId === work.id ? (
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
                      <Button size="sm" onClick={() => handleSaveEdit(work.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId("")}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium text-sm">{work.title}</h3>
                    <p className="text-xs text-gray-600">{work.category}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(work.id, work.title, work.category)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(work.id)}
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
