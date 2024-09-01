export interface Poem {
  id: number;
  title: string;
  author: string;
  content: string;
}

export const poems: Poem[] = [
  { id: 1, title: "Whispers of the Wind", author: "Aria Breeze", content: "In gentle gusts, secrets fly,\nCaressing leaves as they pass by.\nWhispers of the wind, soft and low,\nTelling tales of long ago." },
  { id: 2, title: "Digital Dreams", author: "Cyber Wordsmith", content: "In pixelated realms we roam,\nWhere binary rivers foam.\nDigital dreams in neon light,\nCode our world from day to night." },
  { id: 3, title: "Ocean's Lullaby", author: "Marina Verse", content: "Waves crash softly on the shore,\nA rhythmic song forevermore.\nOcean's lullaby, deep and blue,\nRocking sailors, old and new." },
  { id: 4, title: "Starry Sonnet", author: "Celeste Quill", content: "Twinkling lights in velvet sky,\nCelestial dance for you and I.\nStarry sonnet, written high,\nIn constellations never shy." },
  { id: 5, title: "Urban Jungle", author: "Metro Bard", content: "Concrete forests touch the clouds,\nStreet art whispers, music loud.\nUrban jungle, wild and free,\nA city's heartbeat, you and me." },
  { id: 6, title: "Time's Waltz", author: "Chrono Poet", content: "Seconds tick, minutes waltz,\nHours pirouette without faults.\nTime's eternal dance goes on,\nYesterday, today, anon." },
];