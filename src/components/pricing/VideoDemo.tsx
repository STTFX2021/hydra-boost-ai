import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { PRICING_DEMO_VIDEO_URL, isValidUrl } from "@/lib/constants";

interface VideoDemoProps {
  language: 'es' | 'en';
  videoUrl?: string; // Override default URL if needed
}

export const VideoDemo = ({ language, videoUrl }: VideoDemoProps) => {
  const url = videoUrl || PRICING_DEMO_VIDEO_URL;

  // Don't render if video URL is a placeholder
  if (!isValidUrl(url)) {
    return null;
  }

  const handlePlayClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section 
      className="section-padding -mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
              {language === 'es' ? 'Ver cómo funciona' : 'See how it works'}
              <span className="text-primary ml-2">(60s)</span>
            </h2>
            <p className="text-muted-foreground">
              {language === 'es'
                ? 'Mira una demo real: lead entra → seguimiento → cierre.'
                : 'Watch a real demo: lead enters → follow-up → close.'}
            </p>
          </div>

          {/* Video Placeholder */}
          <motion.div
            onClick={handlePlayClick}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-border hover:border-primary transition-colors"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              </motion.div>
            </div>

            {/* Overlay Text */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass px-4 py-2 rounded-lg inline-flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  {language === 'es' ? 'Demo en vivo del sistema' : 'Live system demo'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
