import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SliderManager } from "@/components/admin/SliderManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { ProfileManager } from "@/components/admin/ProfileManager";
import { RecentWorksManager } from "@/components/admin/RecentWorksManager";
import { Camera, Images, Settings, User, Briefcase } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Seamlessly manage your photography portfolio content
          </p>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <Tabs defaultValue="slider" className="space-y-6">
            <TabsList className="grid grid-cols-5 gap-2 w-full max-w-3xl mx-auto">
              {[
                { value: "slider", icon: <Camera size={16} />, label: "Slider" },
                { value: "gallery", icon: <Images size={16} />, label: "Gallery" },
                { value: "services", icon: <Briefcase size={16} />, label: "Services" },
                { value: "profile", icon: <User size={16} />, label: "Profile" },
                { value: "recent-works", icon: <Settings size={16} />, label: "Recent Works" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-xl transition hover:bg-gray-100"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="slider">
              <motion.div variants={fadeIn} initial="hidden" animate="show">
                <Card className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Slider Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SliderManager />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="gallery">
              <motion.div variants={fadeIn} initial="hidden" animate="show">
                <Card className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Gallery Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GalleryManager />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="services">
              <motion.div variants={fadeIn} initial="hidden" animate="show">
                <Card className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Services Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ServicesManager />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="profile">
              <motion.div variants={fadeIn} initial="hidden" animate="show">
                <Card className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Profile Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProfileManager />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="recent-works">
              <motion.div variants={fadeIn} initial="hidden" animate="show">
                <Card className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Works Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentWorksManager />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
