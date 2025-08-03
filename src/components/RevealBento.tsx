import type { MotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  FiArrowRight,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
  FiPause,
} from "react-icons/fi";
import { SiGithub, SiTiktok, SiGitter, SiYoutube } from "react-icons/si";
import { useState, useRef } from "react";

export const RevealBento = () => {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto grid max-w-7xl grid-flow-dense grid-cols-12 gap-6"
      >
        <HeaderBlock />
        <LanaCoverFlowBlock />
        <SocialsBlock />
        <AboutBlock />
        <GalleryBlock />
      </motion.div>
    </div>
  );
};

type CardProps = {
  className?: string;
  children: React.ReactNode;
} & MotionProps;

const Card = ({ className, children, ...rest }: CardProps) => {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
      className={twMerge(
        "rounded-3xl p-6 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-700 shadow-xl hover:shadow-2xl hover:border-zinc-500 transition-all duration-300",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

const HeaderBlock = () => (
  <Card className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="/lana.svg"
      alt="avatar"
      className="mb-4 size-20 rounded-full border-2"
    />
    <h1 className="mb-8 text-4xl font-semibold leading-tight">
      Hi, I'm Nara.{" "}
      <span className="text-zinc-400">I'm a Lana Del Rey superfan.</span>
    </h1>
    <a
      href="#"
      className="flex items-center gap-2 text-zinc-500 hover:underline font-medium"
    >
      Contact me <FiArrowRight />
    </a>
  </Card>
);

const LanaCoverFlowBlock = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const albums = [
    {
      id: 1,
      title: "Born To Die",
      year: "2012",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Ultraviolence",
      year: "2014",
      cover:
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Honeymoon",
      year: "2015",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "Norman F. Rockwell!",
      year: "2019",
      cover:
        "https://images.unsplash.com/photo-1571974599782-87624638275b?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 5,
      title: "Ocean Blvd",
      year: "2023",
      cover:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&crop=center",
    },
  ];

  const albumTracks = [
    "/songs/album_1.mp3",
    "/songs/album_2.mp3",
    "/songs/album_3.mp3",
    "/songs/album_4.mp3",
    "/songs/album_5.mp3",
  ];

  const playAudioForIndex = (index: number) => {
    if (!audioRef.current) return;

    if (audioRef.current.src !== albumTracks[index]) {
      audioRef.current.src = albumTracks[index];
    }

    audioRef.current.volume = 0.6;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      pauseAudio();
    } else {
      playAudioForIndex(currentIndex);
    }
  };

  const setIndexSafely = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    if (isPlaying) {
      playAudioForIndex(index);
    }
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToNext = () => {
    setIndexSafely((currentIndex + 1) % albums.length);
  };

  const goToPrev = () => {
    setIndexSafely((currentIndex - 1 + albums.length) % albums.length);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = -2; i <= 2; i++) {
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
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.05 }}
      className="col-span-12 md:col-span-6 row-span-4 bg-gradient-to-br from-zinc-800 via-zinc-850 to-zinc-900 overflow-hidden relative rounded-3xl p-6 border border-zinc-700 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none rounded-3xl" />

      <div className="h-full flex flex-col relative z-10">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-300 mb-2 flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 bg-red-300 rounded-full"
            />
            Now Playing
          </h3>
          <p className="text-sm text-zinc-400">Lana Del Rey Collection</p>
        </div>

        <div className="flex-1 flex items-center justify-center perspective-1200 mb-6">
          <div className="relative h-48 w-full flex items-center justify-center">
            {visibleItems.map((item) => {
              const offset = item.offset;
              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;

              return (
                <motion.div
                  key={item.key}
                  className="absolute cursor-pointer"
                  onClick={() =>
                    !isCenter && (offset > 0 ? goToNext() : goToPrev())
                  }
                  animate={{
                    x: offset * 80,
                    z: -Math.abs(offset) * 80,
                    scale: isCenter ? 1.2 : isAdjacent ? 0.85 : 0.6,
                    rotateY: offset * -25,
                    opacity: isCenter ? 1 : isAdjacent ? 0.8 : 0.4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    duration: 0.4,
                  }}
                  whileHover={
                    !isCenter
                      ? {
                          scale: isAdjacent ? 0.9 : 0.65,
                          rotateY: offset * -15,
                        }
                      : {
                          scale: 1.25,
                          rotateX: -5,
                        }
                  }
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative">
                    {isCenter && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-red-300/40 blur-2xl scale-125 rounded-2xl"
                          animate={{
                            opacity: [0.4, 0.7, 0.4],
                            scale: [1.25, 1.35, 1.25],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-red-300/20 via-pink-300/20 to-purple-300/20 blur-xl scale-110 rounded-2xl"
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                        />
                      </>
                    )}

                    <div
                      className={twMerge(
                        "relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300",
                        isCenter
                          ? "w-36 h-36"
                          : isAdjacent
                          ? "w-28 h-28"
                          : "w-20 h-20"
                      )}
                    >
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 400,
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={togglePlay}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-red-300 to-red-400 flex items-center justify-center text-white shadow-xl shadow-red-300/50"
                          >
                            {isPlaying ? (
                              <FiPause className="w-5 h-5 ml-1" />
                            ) : (
                              <FiPlay className="w-5 h-5 ml-1" />
                            )}
                          </motion.button>
                        </motion.div>
                      )}

                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-2 left-2 right-2"
                        >
                          <p className="text-xs font-medium text-white truncate">
                            {item.title}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mb-6 px-4">
          <motion.h4
            key={currentAlbum.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-2xl font-bold text-white mb-1 truncate"
          >
            {currentAlbum.title}
          </motion.h4>
          <motion.p
            key={`${currentAlbum.id}-year`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
            className="text-base text-zinc-300 font-medium"
          >
            Lana Del Rey • {currentAlbum.year}
          </motion.p>
        </div>

        <div className="flex items-center justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={goToPrev}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white hover:from-zinc-600 hover:to-zinc-700 transition-all duration-300 shadow-lg"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="flex space-x-2">
            {albums.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setIndexSafely(index)}
                className="relative"
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className={twMerge(
                    "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
                    index === currentIndex
                      ? "bg-red-300 scale-125 shadow-lg shadow-red-300/50"
                      : "bg-zinc-600 hover:bg-zinc-500"
                  )}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 w-3 h-3 rounded-full bg-red-300/30 blur-sm"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={goToNext}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white hover:from-zinc-600 hover:to-zinc-700 transition-all duration-300 shadow-lg"
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <audio ref={audioRef} />

      <style>{`
        .perspective-1200 {
          perspective: 1200px;
        }
      `}</style>
    </motion.div>
  );
};

const SocialsBlock = () => (
  <>
    <Card
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 md:col-span-3 bg-gradient-to-br from-red-600 to-pink-500"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiYoutube />
      </a>
    </Card>
    <Card
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 md:col-span-3 bg-gradient-to-br from-zinc-700 to-zinc-600"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGithub />
      </a>
    </Card>
    <Card
      whileHover={{ rotate: "-2.5deg", scale: 1.1 }}
      className="col-span-6 md:col-span-3 bg-gradient-to-br from-black to-zinc-800"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiTiktok />
      </a>
    </Card>
    <Card
      whileHover={{ rotate: "2.5deg", scale: 1.1 }}
      className="col-span-6 md:col-span-3 bg-gradient-to-br from-blue-600 to-indigo-500"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGitter />
      </a>
    </Card>
  </>
);

const AboutBlock = () => (
  <Card className="col-span-12 text-xl leading-relaxed">
    <p>
      I build fan sites and projects inspired by Lana Del Rey.{" "}
      <span className="text-zinc-400">
        From React animations to full-stack apps, her aesthetic and themes
        inspire my creative work. Check out my latest visualizations and remixes
        on YouTube and TikTok.
      </span>
    </p>
  </Card>
);

const GalleryBlock = () => {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&fit=crop",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&fit=crop",
    "https://images.unsplash.com/photo-1581320548330-d07b59b1053b?w=800&fit=crop",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&fit=crop",
    "https://images.unsplash.com/photo-1559028012-d853d1acbdb2?w=800&fit=crop",
    "https://images.unsplash.com/photo-1595433562696-e6c28d0b1a2c?w=800&fit=crop",
  ];

  return (
    <Card className="col-span-12">
      <h3 className="text-xl font-semibold mb-4 text-zinc-100">
        Photo Gallery
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.08 }}
            className="overflow-hidden rounded-xl border border-zinc-700 shadow-md"
          >
            <img
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-48 object-cover transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
