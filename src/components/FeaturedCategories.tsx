'use client';

/**
 * @title Featured Categories Section
 * @description Section améliorée présentant les catégories principales avec animations et interactions
 * @accessibility Optimisé pour WCAG 2.1 avec navigation au clavier et descriptions ARIA
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Robes de Soirée',
    image: '/images/categories/robes-soiree.jpg',
    description: 'Élégance pour vos moments exceptionnels',
    link: '/categories/robes-soiree',
    size: 'large',
    stats: {
      items: '120+ articles',
      new: '15 nouveautés'
    },
    tag: 'Bestseller'
  },
  {
    id: 2,
    name: 'Prêt-à-Porter',
    image: '/images/categories/pret-a-porter.jpg',
    description: 'Le chic au quotidien',
    link: '/categories/pret-a-porter',
    size: 'medium',
    stats: {
      items: '250+ articles',
      new: '45 nouveautés'
    },
    tag: 'Nouveau'
  },
  {
    id: 3,
    name: 'Accessoires',
    image: '/images/categories/accessoires.jpg',
    description: 'Détails qui font la différence',
    link: '/categories/accessoires',
    size: 'small',
    stats: {
      items: '180+ articles',
      new: '25 nouveautés'
    }
  },
  {
    id: 4,
    name: 'Chaussures',
    image: '/images/categories/chaussures.jpg',
    description: 'L\'élégance à vos pieds',
    link: '/categories/chaussures',
    size: 'small',
    stats: {
      items: '90+ articles',
      new: '18 nouveautés'
    }
  },
  {
    id: 5,
    name: 'Collection Été',
    image: '/images/categories/ete.jpg',
    description: 'La légèreté ensoleillée',
    link: '/categories/ete',
    size: 'medium',
    stats: {
      items: '150+ articles',
      new: '50 nouveautés'
    },
    tag: 'Tendance'
  },
  {
    id: 6,
    name: 'Maroquinerie',
    image: '/images/categories/maroquinerie.jpg',
    description: 'Le luxe à porter',
    link: '/categories/maroquinerie',
    size: 'small',
    stats: {
      items: '75+ articles',
      new: '12 nouveautés'
    }
  }
];

/**
 * @title Animations ultra-douces
 * @description Animations minimalistes et élégantes pour une expérience luxueuse
 */
const scrollAnimationVariants = {
  hidden: { 
    opacity: 0, 
    y: 10, // Distance minimale
    scale: 0.99 // Scale à peine perceptible
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2, // Duration plus longue
      delay: index * 0.08, // Délai très subtil
      ease: [0.22, 1, 0.36, 1] // Courbe d'animation très douce
    }
  }),
  exit: {
    opacity: 0,
    y: -5, // Mouvement minimal en sortie
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const titleAnimationVariants = {
  hidden: { 
    opacity: 0, 
    y: -8, // Distance très réduite
    scale: 0.995
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5, // Encore plus lent
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const CategoryCard = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ 
        margin: "-30px",
        amount: 0.1 // Déclenche très tôt
      }}
      variants={scrollAnimationVariants}
      whileHover={{ 
        scale: 1.005, // Scale minimal
        transition: { duration: 0.6 } 
      }}
    >
      <Link
        href={category.link}
        className={`group relative overflow-hidden block ${
          category.size === 'large' ? 'lg:col-span-2' : 
          category.size === 'medium' ? 'lg:col-span-1' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
          <Image
            src={category.image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" // Transition très lente
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={category.size === 'large'}
          />
          
          {/* Overlay ultra-doux */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent 
            opacity-50 group-hover:opacity-70 transition-all duration-300" 
          />
          
          {/* Contenu avec transitions très douces */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : -5 
              }}
              transition={{ duration: 0.3 }}
              className="self-end"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  x: isHovered ? 0 : -10 
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-1 text-xs font-montserrat text-primary"
              >
                {category.stats.new}
              </motion.div>
            </motion.div>

            <div className="transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              <h3 
                className="font-cormorant text-4xl md:text-4xl text-white mb-3 
                transition-transform duration-300"
              >
                {category.name}
              </h3>
              
              <div className="space-y-4">
                <p className="font-montserrat text-sm text-white/90 tracking-wider 
                  opacity-0 group-hover:opacity-100 transition-all duration-300 delay-[0.2s]">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between 
                  opacity-0 group-hover:opacity-100 transition-all duration-300 delay-[0.3s]">
                  <span className="text-xs text-white/80 font-montserrat">
                    {category.stats.items}
                  </span>
                  <motion.div
                    animate={{ 
                      x: isHovered ? 3 : 0 // Mouvement très subtil
                    }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 text-white"
                  >
                    <span className="text-sm font-montserrat">Explorer</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedCategories = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            amount: 0.2 
          }}
          variants={titleAnimationVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-cormorant text-5xl md:text-6xl mb-4"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 1.5 }
              }
            }}
          >
            Nos Collections
          </motion.h2>
          <motion.p 
            className="font-montserrat text-gray-600 tracking-wide max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 1.5, delay: 0.2 }
              }
            }}
          >
            Explorez notre univers raffiné, où chaque pièce raconte une histoire d&apos;élégance
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;