import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GlowingImage = ({ src, alt, index }) => {
  const [dominantColor, setDominantColor] = useState('#FF6B6B'); // Default to your accent color
  const imageRef = useRef(null);

  useEffect(() => {
    const getDominantColor = async () => {
      if (!imageRef.current) return;

      try {
        // Create a canvas to analyze the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = imageRef.current;

        // Wait for image to load
        if (!img.complete) {
          await new Promise(resolve => {
            img.onload = resolve;
          });
        }

        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        // Calculate average color
        let r = 0, g = 0, b = 0;
        const totalPixels = imageData.length / 4;

        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
        }

        r = Math.round(r / totalPixels);
        g = Math.round(g / totalPixels);
        b = Math.round(b / totalPixels);

        setDominantColor(`rgb(${r}, ${g}, ${b})`);
      } catch (error) {
        console.error('Error calculating dominant color:', error);
      }
    };

    getDominantColor();
  }, [src]);

  return (
    <div className="relative">
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        className="relative w-full rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      />
      {/* Outer glow - very large and bright */}
      <motion.div
        className="absolute -inset-[100px] rounded-lg blur-[100px] opacity-100 transition-all duration-300 z-10"
        style={{
          backgroundColor: dominantColor,
          filter: 'brightness(2)',
        }}
      />
      {/* Middle glow */}
      <motion.div
        className="absolute -inset-[50px] rounded-lg blur-[50px] opacity-90 transition-all duration-300 z-20"
        style={{
          backgroundColor: dominantColor,
          filter: 'brightness(1.8)',
        }}
      />
      {/* Inner glow */}
      <motion.div
        className="absolute -inset-[25px] rounded-lg blur-[25px] opacity-80 transition-all duration-300 z-30"
        style={{
          backgroundColor: dominantColor,
          filter: 'brightness(1.5)',
        }}
      />
    </div>
  );
};

export default GlowingImage; 