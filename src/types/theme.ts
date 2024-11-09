export type Theme = {
  name: string;
  background: string;
  accent: string;
  text: string;
  image: string;
};

export const themes: Theme[] = [
  {
    name: 'Twilight',
    background: 'from-indigo-500/40 via-purple-500/40 to-pink-500/40',
    accent: 'bg-white/20 hover:bg-white/30',
    text: 'text-white',
    image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80'
  },
  {
    name: 'Forest',
    background: 'from-emerald-500/40 via-green-500/40 to-teal-500/40',
    accent: 'bg-emerald-900/20 hover:bg-emerald-900/30',
    text: 'text-white',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80'
  },
  {
    name: 'Ocean',
    background: 'from-blue-500/40 via-cyan-500/40 to-sky-500/40',
    accent: 'bg-blue-900/20 hover:bg-blue-900/30',
    text: 'text-white',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80'
  },
  {
    name: 'Sunset',
    background: 'from-orange-500/40 via-red-500/40 to-rose-500/40',
    accent: 'bg-orange-900/20 hover:bg-orange-900/30',
    text: 'text-white',
    image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80'
  }
];