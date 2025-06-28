
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface PhotoUploadProps {
  onUpload: (file: File, title: string) => void;
  className?: string;
}

export const PhotoUpload = ({ onUpload, className }: PhotoUploadProps) => {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && title.trim()) {
      onUpload(selectedFile, title);
      setTitle("");
      setPreview("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const clearSelection = () => {
    setTitle("");
    setPreview("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-4">
        <div>
          <Label htmlFor="photo-upload">Upload Photo</Label>
          <Input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            ref={fileInputRef}
            className="mt-1"
          />
        </div>

        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={clearSelection}
            >
              <X size={16} />
            </Button>
          </div>
        )}

        <div>
          <Label htmlFor="photo-title">Photo Title</Label>
          <Input
            id="photo-title"
            type="text"
            placeholder="Enter photo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !title.trim()}
          className="w-full"
        >
          <Upload className="mr-2" size={16} />
          Upload Photo
        </Button>
      </CardContent>
    </Card>
  );
};
