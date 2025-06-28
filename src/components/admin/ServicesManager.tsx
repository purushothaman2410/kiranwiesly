
import { useState } from "react";
import { PhotoUpload } from "./PhotoUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";

interface Service {
  id: string;
  image: string;
  title: string;
  description: string;
}

export const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224032/cm1_gkgutf.jpg",
      title: "Christian Wedding",
      description: "Complete Christian wedding photography and videography services"
    },
    {
      id: "2",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224049/hm3_povm3o.jpg",
      title: "Hindu Wedding",
      description: "Traditional Hindu wedding ceremonies captured beautifully"
    }
  ]);
  const [editingId, setEditingId] = useState<string>("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleUpload = (file: File, title: string) => {
    const newService: Service = {
      id: Date.now().toString(),
      image: URL.createObjectURL(file),
      title: title,
      description: "Service description..."
    };
    setServices([...services, newService]);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleEdit = (id: string, currentTitle: string, currentDescription: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
  };

  const handleSaveEdit = (id: string) => {
    setServices(services.map(service =>
      service.id === id ? { ...service, title: editTitle, description: editDescription } : service
    ));
    setEditingId("");
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div className="space-y-6">
      <PhotoUpload onUpload={handleUpload} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={service.image}
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
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Service Description"
                      className="text-sm"
                      rows={3}
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
                    <p className="text-xs text-gray-600">{service.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(service.id, service.title, service.description)}
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
