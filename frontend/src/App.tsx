import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clapperboard, AlertCircle } from 'lucide-react';
import { StoryForm } from './components/StoryForm';
import { StoryCarousel } from './components/StoryCarousel';
import { generateStory } from './api';
import type { StoryCardRequest, StoryResponse } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [story, setStory] = useState<StoryResponse | null>(null);

  const handleGenerate = async (request: StoryCardRequest) => {
    setIsLoading(true);
    setError(null);
    setStory(null);

    try {
      const result = await generateStory(request);
      setStory(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStory(null);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center overflow-x-hidden">
      {/* Dynamic Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] -left-[-10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-secondary/15 rounded-full blur-[150px] mix-blend-screen"
          style={{ animation: 'pulse 8s infinite alternate-reverse' }} />
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-syne font-bold tracking-tight text-white m-0">StoryCard Studio</h1>
        </div>
        <div className="text-sm font-outfit text-zinc-400 hidden sm:block">
          Powered by Gemini 2.5 Flash & Imagen 3.0
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-6 z-10 pt-10 pb-24">

        <AnimatePresence mode="wait">
          {!story ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-12 max-w-3xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary mb-6 backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-wider uppercase">Creative Storyteller</span>
                </motion.div>

                <h2 className="text-5xl md:text-7xl font-syne font-extrabold text-white mb-6 leading-tight pb-2" style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
                  Turn any idea into a <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-400 to-secondary animate-gradient">
                    5-card visual story.
                  </span>
                </h2>

                <p className="text-xl text-zinc-400 font-outfit max-w-2xl mx-auto">
                  Describe your concept. Our AI will weave the narrative structure and generate perfectly consistent vivid imagery to match.
                </p>
              </div>

              <StoryForm onGenerate={handleGenerate} isLoading={isLoading} />

              {/* Error Banner */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-8 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-200 px-6 py-4 rounded-xl max-w-2xl w-full backdrop-blur-md"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="carousel-view"
              initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full"
            >
              <StoryCarousel story={story} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}

export default App;
