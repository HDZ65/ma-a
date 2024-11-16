'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/hero-1.jpg',
    title: ['Collection', 'Printemps'],
    subtitle: 'Découvrez notre nouvelle collection',
    cta: 'Explorer',
    url: '/collections/printemps'
  },
  {
    id: 2,
    image: '/images/hero-2.jpg',
    title: ['Édition', 'Limitée'],
    subtitle: 'Pièces exclusives MAÏA',
    cta: 'Découvrir',
    url: '/collections/edition-limitee'
  },
  {
    id: 3,
    image: '/images/hero-3.jpg',
    title: ['Nouvelle', 'Saison'],
    subtitle: 'Une élégance intemporelle',
    cta: 'Voir plus',
    url: '/collections/nouvelle-saison'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: 'easeIn'
      }
    }
  };


  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Ajout des variants pour l'animation initiale
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  const heroImageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const heroContentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      initial="visible"
      animate="visible"
      variants={heroContainerVariants}
      className="relative h-[90vh] w-full overflow-hidden" 
      aria-label="Carrousel des collections"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 will-change-transform"
        >
          <div className="relative w-full h-full">
            <motion.div
              variants={heroImageVariants}
              className="w-full h-full"
            >
              <Image
                src={slides[currentSlide].image}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
            </motion.div>
            
            <motion.div 
              variants={heroContentVariants}
              className="absolute inset-0 flex flex-col items-center justify-center text-white"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center relative z-10 px-4"
              >
                <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light tracking-wider mb-4">
                  {slides[currentSlide].title.map((part, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + index * 0.1,
                        ease: "easeOut"
                      }}
                      className="block drop-shadow-[0_5px_5px_rgba(0,0,0,0.6)]"
                    >
                      {part}
                    </motion.span>
                  ))}
                </h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: "easeOut"
                  }}
                  className="font-montserrat text-lg md:text-xl tracking-widest mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: "easeOut"
                  }}
                >
                  <Link
                    href={slides[currentSlide].url}
                    className="group inline-flex items-center gap-2 font-montserrat tracking-wider text-sm border border-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <span>{slides[currentSlide].cta}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div 
        variants={heroContentVariants}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8"
      >
        <button
          onClick={() => paginate(-1)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
          aria-label="Diapositive précédente"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
          aria-label="Diapositive suivante"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </motion.div>

      {/* Indicators */}
      <motion.div 
        variants={heroContentVariants}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;