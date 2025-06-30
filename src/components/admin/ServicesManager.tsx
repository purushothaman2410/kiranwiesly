/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import { servicesApi } from "@/services/api";

interface Service {
  id: string;
  base64: string;
  title: string;
}

export const ServicesManager = () => {
  const [services, setServicesImages] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");

  // Fetch all service images
  useEffect(() => {
    const fetchServicesImages = async () => {
      try {
        const data = await servicesApi.getAll();
        const formatted = data.map((item: any) => ({
          id: item._id,
          base64: item.base64, // backend sends base64 field
          title: item.title || item.filename,
        }));
        setServicesImages(formatted);
      } catch (error) {
        console.error("Failed to load services:", error);
      }
    };
    fetchServicesImages();
  }, []);

  // Upload service image + title
  const handleUpload = async (file: File, title: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      const data = await servicesApi.upload(formData);

      setServicesImages(prev => [
        ...prev,
        {
          id: data.id || data._id,
          base64: data.base64,
          title: data.title || data.filename || title,
        },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await servicesApi.delete(id);
      setServicesImages(prev => prev.filter(service => service.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await servicesApi.update(id, editTitle);
      setServicesImages(prev =>
        prev.map(service =>
          service.id === id ? { ...service, title: editTitle } : service
        )
      );
      setEditingId("");
      setEditTitle("");
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed");
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
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={service.base64}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                {editingId === service.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Service Title"
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSaveEdit(service.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId("")}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium text-sm">{service.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(service.id, service.title)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(service.id)}
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

// ✅ Minimal Upload Form
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
      alert("Both image and title are required");
      return;
    }

    onUpload(file, title.trim());
    setFile(null);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <Input
        type="file"
        placeholder="Service Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit">Upload Service</Button>
    </form>
  );
};
