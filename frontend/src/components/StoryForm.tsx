import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import type { StoryCardRequest } from '../types';

interface StoryFormProps {
    onGenerate: (request: StoryCardRequest) => void;
    isLoading: boolean;
}

const STYLES = [
    "Default",
    "Cyberpunk Neon",
    "Studio Ghibli",
    "Cinematic Dark",
    "Watercolor",
    "Vintage Comic"
];

export function StoryForm({ onGenerate, isLoading }: StoryFormProps) {
    const [topic, setTopic] = useState('');
    const [inputText, setInputText] = useState('');
    const [style, setStyle] = useState(STYLES[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim() || isLoading) return;
        onGenerate({ topic, inputText, style });
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 max-w-2xl w-full mx-auto space-y-6"
        >
            <div className="space-y-2">
                <label htmlFor="topic" className="block text-sm font-medium text-zinc-300 tracking-wide">
                    CORE IDEA <span className="text-primary">*</span>
                </label>
                <input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. A robot learning to cook pasta"
                    className="glass-input w-full text-lg"
                    required
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="inputText" className="block text-sm font-medium text-zinc-300 tracking-wide">
                    ADDITIONAL CONTEXT (OPTIONAL)
                </label>
                <textarea
                    id="inputText"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste extra details, characters, or the full story draft..."
                    className="glass-input w-full min-h-[120px] resize-y"
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="style" className="block text-sm font-medium text-zinc-300 tracking-wide">
                    ART STYLE
                </label>
                <div className="relative">
                    <select
                        id="style"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="glass-input w-full appearance-none cursor-pointer"
                        disabled={isLoading}
                    >
                        {STYLES.map(s => (
                            <option key={s} value={s} className="bg-background text-white">{s}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading || !topic.trim()}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-syne font-bold transition-all duration-300
          ${isLoading || !topic.trim()
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary/90 text-glow shadow-[0_0_20px_rgba(126,34,206,0.4)] hover:shadow-[0_0_30px_rgba(126,34,206,0.6)]'
                    }`}
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                        <span>Weaving Narrative...</span>
                    </>
                ) : (
                    <>
                        <Wand2 className="w-5 h-5" />
                        <span>Generate StoryCards</span>
                    </>
                )}
            </motion.button>
        </motion.form>
    );
}
