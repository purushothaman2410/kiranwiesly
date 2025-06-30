
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SliderManager from '@/components/admin/SliderManager';
import { GalleryManager } from "@/components/admin/GalleryManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { ProfileManager } from "@/components/admin/ProfileManager";
import { RecentWorksManager } from "@/components/admin/RecentWorksManager";
import { Camera, Images, Settings, User, Briefcase, Sparkles, Zap, Star } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardHover = {
  hover: {
    y: -8,
    rotateX: 5,
    rotateY: 5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const glowVariants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 30px rgba(147, 51, 234, 0.4)",
      "0 0 20px rgba(236, 72, 153, 0.3)",
      "0 0 30px rgba(59, 130, 246, 0.3)",
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Admin = () => {
  const tabItems = [
    { value: "slider", icon: <Camera size={18} />, label: "Slider", color: "from-blue-500 to-cyan-500" },
    { value: "gallery", icon: <Images size={18} />, label: "Gallery", color: "from-purple-500 to-pink-500" },
    { value: "services", icon: <Briefcase size={18} />, label: "Services", color: "from-green-500 to-emerald-500" },
    { value: "profile", icon: <User size={18} />, label: "Profile", color: "from-orange-500 to-red-500" },
    { value: "recent-works", icon: <Settings size={18} />, label: "Recent Works", color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-green-400/8 to-blue-400/8 rounded-full blur-2xl"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div 
        className="absolute top-20 right-20 text-blue-400/30"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles size={32} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 left-20 text-purple-400/30"
        animate={{
          y: [20, -20, 20],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Zap size={28} />
      </motion.div>

      <motion.div 
        className="absolute top-1/2 right-10 text-pink-400/30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Star size={24} />
      </motion.div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <motion.div 
              className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Settings className="text-blue-400" size={48} />
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight"
              variants={glowVariants}
              animate="animate"
            >
              Admin Dashboard
            </motion.h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Seamlessly manage your photography portfolio with advanced controls and real-time updates
            </p>
          </motion.div>

          <motion.div 
            variants={fadeIn} 
            initial="hidden" 
            animate="show" 
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="slider" className="space-y-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                <TabsList className="grid grid-cols-5 gap-2 w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl">
                  {tabItems.map((tab, index) => (
                    <motion.div
                      key={tab.value}
                      variants={fadeIn}
                      whileHover="hover"
                      initial="rest"
                    >
                      <TabsTrigger
                        value={tab.value}
                        className={`
                          flex items-center justify-center gap-3 px-6 py-4 font-semibold rounded-xl 
                          transition-all duration-300 relative overflow-hidden group
                          data-[state=active]:bg-gradient-to-r data-[state=active]:${tab.color}
                          data-[state=active]:text-white data-[state=active]:shadow-lg
                          hover:bg-white/10 text-gray-300 hover:text-white
                          data-[state=active]:scale-105
                        `}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {tab.icon}
                        </motion.div>
                        <span className="hidden sm:inline">{tab.label}</span>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </TabsList>
              </motion.div>

              {/* Tab Contents with Enhanced Cards */}
              {[
                { value: "slider", component: <SliderManager />, title: "Slider Management", description: "Manage hero slider images and content" },
                { value: "gallery", component: <GalleryManager />, title: "Gallery Management", description: "Organize your photography collection" },
                { value: "services", component: <ServicesManager />, title: "Services Management", description: "Update your service offerings" },
                { value: "profile", component: <ProfileManager />, title: "Profile Management", description: "Manage profile images and information" },
                { value: "recent-works", component: <RecentWorksManager />, title: "Recent Works Management", description: "Showcase your latest projects" },
              ].map((tab, index) => (
                <TabsContent key={tab.value} value={tab.value}>
                  <motion.div 
                    variants={cardHover}
                    whileHover="hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ perspective: 1000 }}
                  >
                    <Card className="shadow-2xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden relative">
                      {/* Card glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
                      
                      <CardHeader className="relative">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {tabItems[index]?.icon}
                          </motion.div>
                          <div>
                            <CardTitle className="text-2xl text-white font-bold">
                              {tab.title}
                            </CardTitle>
                            <p className="text-gray-400 mt-1">{tab.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {tab.component}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
