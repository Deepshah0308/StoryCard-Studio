import { motion } from 'framer-motion';
import { ExternalLink, Download } from 'lucide-react';
import type { StoryCard as StoryCardType } from '../types';

interface StoryCardProps {
    card: StoryCardType;
    index: number;
}

export function StoryCard({ card, index }: StoryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="glass-card rounded-2xl overflow-hidden min-w-[320px] w-[320px] md:min-w-[400px] md:w-[400px] flex-shrink-0 flex flex-col group relative"
        >
            <div className="relative aspect-square w-full bg-zinc-900 border-b border-white/10 overflow-hidden">
                {/* Placeholder if image hasn't loaded or isn't available, but we assume it's available */}
                <img
                    src={card.image_url}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                        href={card.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
                        title="Open in New Tab"
                    >
                        <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                    {/* Download logic often requires fetching blob, a simple href download attribute might not work cross-origin, but we provide it as UI requirement */}
                    <a
                        href={card.image_url}
                        download={`card-${index}.jpg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary/20 hover:bg-primary/40 border border-primary/50 text-white rounded-full backdrop-blur-md transition-colors"
                        title="Download Image"
                    >
                        <Download className="w-5 h-5" />
                    </a>
                </div>

                {/* Scene Indicator */}
                <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full text-xs font-bold text-white tracking-widest bg-black/50">
                    SCENE {index + 1}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-syne font-bold text-white mb-3 tracking-tight group-hover:text-secondary transition-colors">
                    {card.title}
                </h3>
                <p className="text-zinc-300 leading-relaxed font-outfit text-[15px]">
                    {card.caption}
                </p>
            </div>
        </motion.div>
    );
}
