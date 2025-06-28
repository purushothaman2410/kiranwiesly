
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SliderManager } from "@/components/admin/SliderManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { ProfileManager } from "@/components/admin/ProfileManager";
import { RecentWorksManager } from "@/components/admin/RecentWorksManager";
import { Camera, Images, Settings, User, Briefcase } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your photography website content</p>
        </div>

        <Tabs defaultValue="slider" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="slider" className="flex items-center gap-2">
              <Camera size={16} />
              Slider
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Images size={16} />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase size={16} />
              Services
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="recent-works" className="flex items-center gap-2">
              <Settings size={16} />
              Recent Works
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slider">
            <Card>
              <CardHeader>
                <CardTitle>Slider Management</CardTitle>
              </CardHeader>
              <CardContent>
                <SliderManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
              </CardHeader>
              <CardContent>
                <GalleryManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ServicesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent-works">
            <Card>
              <CardHeader>
                <CardTitle>Recent Works Management</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentWorksManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
