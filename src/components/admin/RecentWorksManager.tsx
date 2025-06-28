
import { useState } from "react";
import { PhotoUpload } from "./PhotoUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit } from "lucide-react";

interface RecentWork {
  id: string;
  image: string;
  title: string;
  category: string;
}

export const RecentWorksManager = () => {
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([
    {
      id: "1",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749223785/baby3_shqguj.jpg",
      title: "Baby Shoots",
      category: "Babies"
    },
    {
      id: "2",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224032/cm1_gkgutf.jpg",
      title: "Wedding Shot",
      category: "Wedding"
    }
  ]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const categories = ["Nature", "Wedding", "Fashion", "Babies", "Couples"];

  const handleUpload = (file: File, title: string) => {
    const newWork: RecentWork = {
      id: Date.now().toString(),
      image: URL.createObjectURL(file),
      title: title,
      category: "Nature"
    };
    setRecentWorks([...recentWorks, newWork]);
  };

  const handleDelete = (id: string) => {
    setRecentWorks(recentWorks.filter(work => work.id !== id));
  };

  const handleEdit = (id: string, currentTitle: string, currentCategory: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditCategory(currentCategory);
  };

  const handleSaveEdit = (id: string) => {
    setRecentWorks(recentWorks.map(work =>
      work.id === id ? { ...work, title: editTitle, category: editCategory } : work
    ));
    setEditingId("");
    setEditTitle("");
    setEditCategory("");
  };

  return (
    <div className="space-y-6">
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
