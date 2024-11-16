'use client'

/**
 * @title Composant Header Principal
 * @description En-tête responsive avec navigation et animations
 * @accessibility Optimisé pour WCAG 2.1
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User,    } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 'collections', label: 'Collections', href: '/collections' },
  { id: 'pret-a-porter', label: 'Prêt-à-porter', href: '/pret-a-porter' },
  { id: 'accessoires', label: 'Accessoires', href: '/accessoires' },
  { id: 'univers', label: 'L\'univers', href: '/univers' }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoVariants = {
    initial: {
      scale: 4,
      opacity: 0,
      x: 'calc(50vw - 8rem)',
      y: '40vh'
    },
    center: {
      scale: 4,
      opacity: 1,
      x: 'calc(50vw - 8rem)',
      y: '40vh',
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    header: {
      scale: 1,
      opacity: 1,
      x: 250,
      y: 0,
      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const overlayVariants = {
    initial: {
      opacity: 1,
      backgroundColor: 'white'
    },
    animate: {
      opacity: 0,
      backgroundColor: 'transparent',
      transition: {
        duration: 0.8,
        delay: 1.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Overlay de fond */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={overlayVariants}
        className="fixed inset-0 z-40"
      />

      {/* Logo avec animation */}
      <motion.div
        initial="initial"
        animate={isLoading ? "center" : "header"}
        variants={logoVariants}
        className="fixed z-50 left-8 lg:left-16 top-8"
      >
        <div className="flex flex-col items-center">
          <Link href="/" className="relative group">
            <h1 className={`font-cormorant text-[2.5rem] tracking-[0.2em] leading-none ${
              isLoading ? 'text-primary' : isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              MAÏA
            </h1>
            <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.4em] font-montserrat ${
              isLoading ? 'text-gray-400' : isScrolled ? 'text-gray-600' : 'text-white/70'
            } whitespace-nowrap`}>
              PARIS
            </span>
          </Link>
        </div>
      </motion.div>

      {/* Header sans le logo (puisqu'il est géré par l'animation) */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className={`fixed w-full z-40 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20 lg:h-28">
            {/* Espace réservé pour le logo */}
            <div className="w-[120px] opacity-0">
              <h1 className="font-cormorant text-2xl">MAÏA</h1>
            </div>

            {/* Navigation principale */}
            <nav 
              className="hidden lg:flex items-center space-x-12 font-montserrat text-[13px] tracking-[0.15em]"
              role="navigation"
              aria-label="Navigation principale"
            >
              {menuItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Link href={item.href} className={`relative group py-2 ${
                    isScrolled ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-white/80'
                  }`}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions utilisateur */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-6"
            >
              <button
                aria-label="Rechercher"
                className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
              >
                <Search className={`w-[1.35rem] h-[1.35rem] ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`} />
              </button>

              <button
                aria-label="Mon compte"
                className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
              >
                <User className={`w-[1.35rem] h-[1.35rem] ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`} />
              </button>

              <button
                aria-label="Mon panier"
                className="relative focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
              >
                <ShoppingBag className={`w-[1.35rem] h-[1.35rem] ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`} />
                <span 
                  className="absolute -top-2 -right-2 bg-primary text-white text-[0.65rem] w-4 h-4 rounded-full flex items-center justify-center font-medium"
                  aria-hidden="true"
                >
                  3
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;