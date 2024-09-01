'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Feather, Bookmark } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const poems = [
  { id: 1, title: "Whispers of the Wind", author: "Aria Breeze", content: "In gentle gusts, secrets fly,\nCaressing leaves as they pass by.\nWhispers of the wind, soft and low,\nTelling tales of long ago." },
  { id: 2, title: "Digital Dreams", author: "Cyber Wordsmith", content: "In pixelated realms we roam,\nWhere binary rivers foam.\nDigital dreams in neon light,\nCode our world from day to night." },
  { id: 3, title: "Ocean's Lullaby", author: "Marina Verse", content: "Waves crash softly on the shore,\nA rhythmic song forevermore.\nOcean's lullaby, deep and blue,\nRocking sailors, old and new." },
  { id: 4, title: "Starry Sonnet", author: "Celeste Quill", content: "Twinkling lights in velvet sky,\nCelestial dance for you and I.\nStarry sonnet, written high,\nIn constellations never shy." },
  { id: 5, title: "Urban Jungle", author: "Metro Bard", content: "Concrete forests touch the clouds,\nStreet art whispers, music loud.\nUrban jungle, wild and free,\nA city's heartbeat, you and me." },
  { id: 6, title: "Time's Waltz", author: "Chrono Poet", content: "Seconds tick, minutes waltz,\nHours pirouette without faults.\nTime's eternal dance goes on,\nYesterday, today, anon." },
]

const parchmentBackground = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d2b48c' fill-opacity='0.2'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E")`

export default function FramerMotionVintagePoetryGallery() {
  const [selectedPoem, setSelectedPoem] = useState(null)
  const [bookmarked, setBookmarked] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedPoems')
    if (savedBookmarks) {
      setBookmarked(JSON.parse(savedBookmarks))
    }
  }, [])

  const toggleBookmark = (poemId) => {
    const newBookmarked = bookmarked.includes(poemId)
      ? bookmarked.filter(id => id !== poemId)
      : [...bookmarked, poemId]
    setBookmarked(newBookmarked)
    localStorage.setItem('bookmarkedPoems', JSON.stringify(newBookmarked))
  }

  const handleUnroll = (poem) => {
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
          <motion.div
            key={poem.id}
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
                  onClick={() => toggleBookmark(poem.id)}
                  aria-label={bookmarked.includes(poem.id) ? "Remove bookmark" : "Add bookmark"}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked.includes(poem.id) ? 'fill-[#704214]' : ''}`} />
                </motion.button>
                <h2 className="text-2xl font-semibold mb-2 font-serif">{poem.title}</h2>
                <p className="text-sm mb-4 italic">by {poem.author}</p>
                <p className="line-clamp-3 font-['Caveat'] text-lg">{poem.content}</p>
              </CardContent>
              <CardFooter>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => handleUnroll(poem)}
                      className="bg-transparent border-[#704214] hover:bg-[#704214] hover:text-[#f8f0e3] transition-colors duration-300 flex items-center"
                    >
                      <Feather className="mr-2 h-4 w-4" />
                      Unroll Scroll
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-[#f8f0e3] border-2 border-[#704214] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-serif">{selectedPoem?.title}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] scroll-smooth">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="p-4"
                      >
                        <p className="text-sm mb-4 italic">by {selectedPoem?.author}</p>
                        <p className="whitespace-pre-line font-['Caveat'] text-lg leading-relaxed">{selectedPoem?.content}</p>
                      </motion.div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}