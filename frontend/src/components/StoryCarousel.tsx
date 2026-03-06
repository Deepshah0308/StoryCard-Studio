import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { StoryResponse } from '../types';
import { StoryCard } from './StoryCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface StoryCarouselProps {
    story: StoryResponse;
    onReset: () => void;
}

export function StoryCarousel({ story, onReset }: StoryCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -420, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center max-w-[1600px] mx-auto py-8"
        >
            <div className="w-full max-w-4xl px-6 mb-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-syne text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 leading-tight pb-2"
                >
                    Your Story Brought to Life
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-zinc-300 font-outfit leading-relaxed border-l-4 border-primary pl-6 text-left italic bg-white/5 p-6 rounded-r-2xl"
                >
                    {story.summary}
                </motion.p>
            </div>

            <div className="relative w-full group">
                {/* Navigation Buttons */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/60 hover:bg-primary/80 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={scrollRight}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/60 hover:bg-primary/80 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-8 px-8 md:px-20 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {story.cards.map((card, index) => (
                        <div key={index} className="snap-center shrink-0">
                            <StoryCard card={card} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={onReset}
                className="mt-8 px-8 py-3 rounded-full border border-white/20 hover:border-primary/50 hover:bg-primary/10 text-white font-syne font-bold transition-all duration-300"
            >
                Create Another Story
            </motion.button>
        </motion.div>
    );
}
