'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Feather, Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { poems, type Poem } from 'public/data/poems'

const parchmentBackground = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d2b48c' fill-opacity='0.2'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E")`

export default function FramerMotionVintagePoetryGallery() {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null)
  const [bookmarked, setBookmarked] = useState<number[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedPoems')
    if (savedBookmarks) {
      setBookmarked(JSON.parse(savedBookmarks) as number[])
    }
  }, [])

  const toggleBookmark = (poemId: number) => {
    setBookmarked(prev => {
      const newBookmarked = prev.includes(poemId)
        ? prev.filter(id => id !== poemId)
        : [...prev, poemId]
      localStorage.setItem('bookmarkedPoems', JSON.stringify(newBookmarked))
      return newBookmarked
    })
  }

  const handleUnroll = (poem: Poem) => {
    setSelectedPoem(poem)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen p-8 bg-[#f4e6c5] text-[#704214]" style={{ backgroundImage: parchmentBackground }}>
      <motion.h1 
        className="text-5xl font-bold text-center mb-12 font-serif"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Vintage Poetry Scrolls
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {poems.map((poem) => (
          <PoemCard 
            key={poem.id} 
            poem={poem} 
            isBookmarked={bookmarked.includes(poem.id)}
            onToggleBookmark={toggleBookmark}
            onUnroll={handleUnroll}
          />
        ))}
      </motion.div>
      <PoemDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        poem={selectedPoem}
      />
    </div>
  )
}

interface PoemCardProps {
  poem: Poem;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onUnroll: (poem: Poem) => void;
}

function PoemCard({ poem, isBookmarked, onToggleBookmark, onUnroll }: PoemCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <Card className="bg-[#f8f0e3] border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-rotate-1">
        <CardContent className="p-6 relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 right-2 bg-transparent border-none"
            onClick={() => onToggleBookmark(poem.id)}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-[#704214]' : ''}`} />
          </motion.button>
          <h2 className="text-2xl font-semibold mb-2 font-serif">{poem.title}</h2>
          <p className="text-sm mb-4 italic">by {poem.author}</p>
          <p className="line-clamp-3 font-['Caveat'] text-lg">{poem.content}</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={() => onUnroll(poem)}
            className="bg-transparent border-[#704214] hover:bg-[#704214] hover:text-[#f8f0e3] transition-colors duration-300 flex items-center"
          >
            <Feather className="mr-2 h-4 w-4" />
            Unroll Scroll
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface PoemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  poem: Poem | null;
}

function PoemDialog({ isOpen, onOpenChange, poem }: PoemDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#f8f0e3] border-2 border-[#704214] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif">{poem?.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] scroll-smooth">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-4"
          >
            <p className="text-sm mb-4 italic">by {poem?.author}</p>
            <p className="whitespace-pre-line font-['Caveat'] text-lg leading-relaxed">{poem?.content}</p>
          </motion.div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}