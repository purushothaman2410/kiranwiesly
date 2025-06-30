
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
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
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");

  // Fetch all service images
  useEffect(() => {
    const fetchServicesImages = async () => {
      try {
        const data = await servicesApi.getAll();
        console.log("Services API response:", data);
        
        const formatted = data.map((item: any) => ({
          id: item._id || item.id,
          base64: item.base64 || item.image || item.url,
          title: item.title || item.filename || 'Untitled',
        }));
        setServices(formatted);
      } catch (error) {
        console.error("Failed to load services:", error);
        setServices([]);
      }
    };
    fetchServicesImages();
  }, []);

  // Upload service image + title
  const handleUpload = async (file: File, title: string) => {
    try {
      console.log("Uploading service:", { file: file.name, title });
      
      const data = await servicesApi.upload(file, title);
      console.log("Service upload response:", data);

      setServices(prev => [
        ...prev,
        {
          id: data._id || data.id,
          base64: data.base64 || data.image || data.url,
          title: data.title || data.filename || title,
        },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await servicesApi.delete(id);
      setServices(prev => prev.filter(service => service.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await servicesApi.update(id, editTitle);
      setServices(prev =>
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

// Upload Form Component for Services
const PhotoUpload = ({
  onUpload,
}: {
  onUpload: (file: File, title: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      alert("Both image and title are required");
      return;
    }

    setIsUploading(true);
    try {
      await onUpload(file, title.trim());
      setFile(null);
      setTitle("");
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload Service"}
        </Button>
      </form>
    </Card>
  );
};
