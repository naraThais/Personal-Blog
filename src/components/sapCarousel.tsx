import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";

const LanaCoverFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Lana Del Rey's albums
  const albums = [
    {
      id: 1,
      title: "Born To Die",
      artist: "Lana Del Rey",
      year: "2012",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Ultraviolence",
      artist: "Lana Del Rey",
      year: "2014",
      cover:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Honeymoon",
      artist: "Lana Del Rey",
      year: "2015",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "Lust For Life",
      artist: "Lana Del Rey",
      year: "2017",
      cover:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 5,
      title: "Norman Fucking Rockwell!",
      artist: "Lana Del Rey",
      year: "2019",
      cover:
        "https://images.unsplash.com/photo-1571974599782-87624638275b?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 6,
      title: "Chemtrails Over The Country Club",
      artist: "Lana Del Rey",
      year: "2021",
      cover:
        "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 7,
      title: "Blue Banisters",
      artist: "Lana Del Rey",
      year: "2021",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 8,
      title: "Did you know that there's a tunnel under Ocean Blvd",
      artist: "Lana Del Rey",
      year: "2023",
      cover:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&crop=center",
    },
  ];

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % albums.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Auto-rotate functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  // Generate visible items for infinite effect
  const getVisibleItems = () => {
    const visibleCount = 7; // Show 7 items total (3 left, 1 center, 3 right)
    const items = [];

    for (let i = -3; i <= 3; i++) {
      const index = (currentIndex + i + albums.length) % albums.length;
      items.push({
        ...albums[index],
        offset: i,
        key: `${albums[index].id}-${currentIndex}-${i}`,
      });
    }

    return items;
  };

  const visibleItems = getVisibleItems();
  const currentAlbum = albums[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto max-w-6xl"
      >
        {/* Header Block */}
        <motion.div
          variants={{
            initial: { scale: 0.5, y: 50, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
          className="mb-8 p-6 text-center"
        >
          <h1 className="mb-4 text-6xl font-light leading-tight">
            Lana Del Rey{" "}
            <span className="text-red-300 font-medium">Discografia</span>
          </h1>
          <p className="text-xl text-zinc-400">
            Uma jornada através dos álbuns mais icônicos
          </p>
        </motion.div>

        {/* Cover Flow Container */}
        <motion.div
          variants={{
            initial: { scale: 0.5, y: 50, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
          className="mb-8 p-6"
        >
          <div className="perspective-1000 flex items-center justify-center overflow-hidden">
            <div
              ref={containerRef}
              className="relative h-80 w-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {visibleItems.map((item) => {
                const offset = item.offset;
                const absOffset = Math.abs(offset);
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={item.key}
                    className="absolute cursor-pointer"
                    onClick={() =>
                      !isCenter &&
                      goToIndex(
                        (currentIndex + offset + albums.length) % albums.length
                      )
                    }
                    initial={false}
                    animate={{
                      x: offset * 140,
                      z: -absOffset * 120,
                      scale: isCenter ? 1 : Math.max(0.5, 1 - absOffset * 0.15),
                      rotateY: offset * -30,
                      opacity: Math.max(0.2, 1 - absOffset * 0.25),
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.6,
                    }}
                    whileHover={
                      !isCenter
                        ? {
                            scale: Math.max(0.6, 1 - absOffset * 0.15),
                            z: -absOffset * 100,
                          }
                        : { scale: 1.05 }
                    }
                  >
                    <div className="relative">
                      {/* Glow Effect for center item */}
                      {isCenter && (
                        <motion.div
                          className="absolute inset-0 bg-red-300/20 blur-3xl scale-125 rounded-3xl"
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                            scale: [1.2, 1.3, 1.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}

                      {/* Album Cover */}
                      <div className="relative w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border border-zinc-700/50">
                        <img
                          src={item.cover}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                        {/* Reflection Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                        {/* Play button for center item */}
                        {isCenter && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              animate={{
                                boxShadow: [
                                  "0 0 20px rgba(252, 165, 165, 0.3)",
                                  "0 0 40px rgba(252, 165, 165, 0.5)",
                                  "0 0 20px rgba(252, 165, 165, 0.3)",
                                ],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-20 h-20 rounded-full bg-red-300/95 backdrop-blur-sm flex items-center justify-center text-zinc-900 shadow-2xl border border-red-200/50"
                            >
                              <FiPlay className="w-8 h-8 ml-1" />
                            </motion.button>
                          </motion.div>
                        )}

                        {/* Album Info */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-bold text-lg truncate mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm opacity-80 truncate">
                            {item.year}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Controls Block */}
        <motion.div
          variants={{
            initial: { scale: 0.5, y: 50, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
          className="mb-8 p-6"
        >
          <div className="flex items-center justify-center space-x-8">
            <motion.button
              whileHover={{ rotate: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrev}
              className="w-16 h-16 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-all duration-300 shadow-lg"
            >
              <FiChevronLeft className="w-7 h-7" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-3">
              {albums.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => goToIndex(index)}
                  className={twMerge(
                    "w-3 h-3 rounded-full transition-all duration-300 border",
                    index === currentIndex
                      ? "bg-red-300 border-red-200 scale-125 shadow-lg shadow-red-300/50"
                      : "bg-zinc-600 border-zinc-500 hover:bg-zinc-400 hover:border-zinc-300"
                  )}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="w-16 h-16 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-all duration-300 shadow-lg"
            >
              <FiChevronRight className="w-7 h-7" />
            </motion.button>
          </div>
        </motion.div>

        {/* Current Album Info Block */}
        <motion.div
          variants={{
            initial: { scale: 0.5, y: 50, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
          }}
          transition={{
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
          className="p-6 text-center"
        >
          <motion.h2
            key={currentAlbum.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-light text-white mb-3"
          >
            {currentAlbum.title}
          </motion.h2>
          <motion.p
            key={`${currentAlbum.id}-details`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-xl text-zinc-400"
          >
            {currentAlbum.artist} • {currentAlbum.year}
          </motion.p>
        </motion.div>
      </motion.div>

      <Footer />

      {/* Custom Styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-16">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-zinc-500"
      >
        Made with ❤️ for Lana Del Rey fans
      </motion.p>
    </footer>
  );
};

export default LanaCoverFlow;
