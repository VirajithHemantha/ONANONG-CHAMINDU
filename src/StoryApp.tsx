import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Volume2, VolumeX } from 'lucide-react';
import RSVPForm from './RSVPForm'; // We'll extract RSVPForm
import WishesForm from './WishesForm';

function SectionBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <img
        src="/white_roses_bg.png"
        alt="White Roses"
        className="w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/60" />
    </div>
  );
}

export default function StoryApp() {
  const [introPlayed, setIntroPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2026-09-28T16:45:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (introPlayed && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [introPlayed]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Read personalized guest link params
  const urlParams = new URLSearchParams(window.location.search);
  const guestPrefix = urlParams.get('prefix');
  const guestName = urlParams.get('guest');

  return (
    <>
      <AnimatePresence>
        {!introPlayed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <video
              src="/in.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => setIntroPlayed(true)}
              className="w-full h-full object-cover"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '100vw' }}
              transition={{ delay: 1.5, duration: 4.5, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="relative flex items-center justify-center">
                <img 
                  src="/ChatGPT Image Jul 1, 2026, 07_49_34 PM.png" 
                  alt="Gold Seal" 
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }}
                />
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <div className="snap-container no-scrollbar bg-paper relative text-[#3D2B1F] font-sans">



        {/* --- SCREEN 1: Invite Details --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-transparent">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-sm flex flex-col items-center justify-center text-[#3D2B1F]"
              >
                {guestName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mb-8 flex flex-col items-center"
                  >
                    <p className="script text-4xl sm:text-5xl text-[#3D2B1F] drop-shadow-sm mb-3">
                      Dear {guestPrefix} {guestName},
                    </p>
                    <div className="h-px w-16 bg-[#3D2B1F]/50"></div>
                  </motion.div>
                )}

                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#2C2C2C] mb-1">
                  INVITE YOU TO CELEBRATE
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#2C2C2C] mb-2 sm:mb-4">
                  OUR
                </p>

                <h1 className="script text-7xl sm:text-[5.5rem] text-[#2C2C2C] mb-8 sm:mb-12 drop-shadow-sm font-normal">
                  Wedding
                </h1>

                <div className="flex flex-col items-center w-full mb-8 sm:mb-10">
                  <p className="text-[11px] sm:text-[13px] uppercase tracking-widest text-[#2C2C2C] font-bold mb-2">SEPTEMBER</p>
                  <div className="flex items-center justify-center w-full gap-4">
                    <div className="flex-1 text-right border-y border-[#2C2C2C]/30 py-2">
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#2C2C2C] font-bold">MONDAY</p>
                    </div>
                    <p className="serif text-6xl sm:text-[4.5rem] font-medium text-[#2C2C2C] leading-none px-1">28</p>
                    <div className="flex-1 text-left border-y border-[#2C2C2C]/30 py-2">
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#2C2C2C] font-bold">AT 4:45 PM</p>
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-[13px] uppercase tracking-widest text-[#2C2C2C] font-bold mt-2">2026</p>
                </div>

                <a
                  href="https://maps.app.goo.gl/RU45U8xe2TiZsmL98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="space-y-2 mt-2 sm:mt-4 text-[#2C2C2C] hover:opacity-70 transition-opacity block"
                >
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
                    <MapPin size={12} className="text-[#8B7355]" />
                    WELIGAMA BAY MARRIOTT
                  </p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-medium">RESORT &amp; SPA</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-medium">WELIGAMA, SRI LANKA</p>
                </a>

                <div className="mt-8 sm:mt-10">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] font-bold text-[#2C2C2C]">RECEPTION TO FOLLOW</p>
                </div>

                <div className="mt-4 sm:mt-6 flex justify-center">
                  <svg className="w-10 h-10 text-[#2C2C2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 12c-1.5-1-2-2-2-4v-4l6-2v6c0 2-.5 3-2 4M9 12c1.5-1 2-2 2-4v-4l-6-2v6c0 2 .5 3 2 4M13 12v8M11 12v8M9 20h6" />
                    <circle cx="15.5" cy="5.5" r="0.5" fill="currentColor" />
                    <circle cx="14" cy="7.5" r="0.5" fill="currentColor" />
                    <circle cx="8.5" cy="5.5" r="0.5" fill="currentColor" />
                    <circle cx="10" cy="7.5" r="0.5" fill="currentColor" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 1.5: Parents --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-10 pt-16 rounded-t-[10rem] rounded-b-[2rem] border border-[#EAE1D3] w-full max-w-sm flex flex-col items-center shadow-xl relative overflow-hidden"
              >
                {/* Subtle texture overlay on the card */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                  <h2 className="script text-5xl text-[#C8B29E] mb-3">Together with</h2>
                  <h3 className="serif text-[11px] uppercase tracking-[0.3em] text-[#3D2B1F] mb-10 font-bold">Our Families</h3>

                  <div className="flex flex-col items-center w-full mb-8">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-3 font-bold">Bride's Parents</p>
                    <p className="serif text-lg text-[#2C2C2C] leading-relaxed">Mrs. Maliwan Thimoon</p>
                    <p className="serif text-lg text-[#2C2C2C] leading-relaxed">&amp; Mr. Prasan Thimoon</p>
                  </div>

                  {/* Elegant Divider */}
                  <div className="flex items-center justify-center gap-3 w-3/4 mx-auto mb-8">
                    <div className="h-px bg-[#EAE1D3] flex-1"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#C8B29E]"></div>
                    <div className="h-px bg-[#EAE1D3] flex-1"></div>
                  </div>

                  <div className="flex flex-col items-center w-full">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-3 font-bold">Groom's Parents</p>
                    <p className="serif text-lg text-[#2C2C2C] leading-relaxed">Mrs. Samudra Perera</p>
                    <p className="serif text-[17px] text-[#2C2C2C] leading-relaxed">&amp; The Late Mr. Dharmadasa<br />Nanayakkara</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 1.75: Countdown --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-10 pt-16 rounded-t-[10rem] rounded-b-[2rem] border border-[#EAE1D3] w-full max-w-sm flex flex-col items-center shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                  <h2 className="script text-5xl text-[#C8B29E] mb-3">Forever Begins In</h2>
                  <h3 className="serif text-[11px] uppercase tracking-[0.3em] text-[#3D2B1F] mb-10 font-bold">A Grace-filled occasion</h3>

                  <div className="flex flex-row items-center justify-center gap-6 w-full mb-8">
                    <div className="flex flex-col items-center">
                      <p className="serif text-4xl text-[#2C2C2C] leading-none mb-2">{timeLeft.days}</p>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Days</p>
                    </div>
                    <div className="text-3xl text-[#C8B29E] font-light -mt-4">:</div>
                    <div className="flex flex-col items-center">
                      <p className="serif text-4xl text-[#2C2C2C] leading-none mb-2">{timeLeft.hours}</p>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Hours</p>
                    </div>
                  </div>

                  {/* Elegant Divider */}
                  <div className="flex items-center justify-center gap-3 w-3/4 mx-auto mb-8">
                    <div className="h-px bg-[#EAE1D3] flex-1"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#C8B29E]"></div>
                    <div className="h-px bg-[#EAE1D3] flex-1"></div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-6 w-full">
                    <div className="flex flex-col items-center">
                      <p className="serif text-4xl text-[#2C2C2C] leading-none mb-2">{timeLeft.minutes}</p>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Mins</p>
                    </div>
                    <div className="text-3xl text-[#C8B29E] font-light -mt-4">:</div>
                    <div className="flex flex-col items-center">
                      <p className="serif text-4xl text-[#2C2C2C] leading-none mb-2">{timeLeft.seconds}</p>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Secs</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 2: Couple Screen --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-white rounded-t-[2.5rem]">
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center justify-start text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-[65dvh] shrink-0 relative"
            >
              <img
                src="/WhatsApp Image 2026-06-21 at 19.30.38.jpeg"
                alt="Couple"
                className="w-full h-full object-cover object-top"
              />
              {/* Soft white gradient at the bottom to blend into the text section */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex-1 w-full flex flex-col items-center justify-start text-center pt-2 pb-12 z-20 bg-white"
            >
              <h2 className="serif text-5xl md:text-6xl text-[#2C2C2C] font-normal leading-none mt-4">
                ONANONG
              </h2>
              <span className="script text-4xl md:text-5xl text-[#2C2C2C] my-1 opacity-80">and</span>
              <h2 className="serif text-5xl md:text-6xl text-[#2C2C2C] font-normal leading-none">
                CHAMINDU SHEHAN
              </h2>
            </motion.div>
          </div>
        </section>

        {/* --- SCREEN 2.5: Our Story --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-[#FAF7F2]">
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center pb-20">

            {/* Header Image */}
            <div className="w-full h-[45dvh] relative shrink-0">
              <img
                src="/PRE/WhatsApp Image 2026-06-28 at 21.19.46.jpeg"
                alt="Couple Story 1"
                className="w-full h-full object-cover rounded-b-[2.5rem] shadow-sm"
              />
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FAF7F2] to-transparent"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full max-w-sm px-6 pt-6 flex flex-col items-center text-center"
            >
              <h2 className="script text-6xl text-[#C8B29E] mb-8">Our Story</h2>

              <div className="space-y-6 text-[#4A4A4A] text-[13px] leading-relaxed font-serif text-justify px-2">
                <p className="text-center font-medium text-[#8B7355] text-sm uppercase tracking-widest mb-8">
                  Began in Doha, Qatar<br />2021
                </p>

                <p>
                  What started as a simple connection between two people from different countries soon blossomed into a love that would change our lives forever. Through every adventure, every challenge, and every beautiful memory, we discovered that home was not a place, but wherever we were together.
                </p>
                <p>
                  No matter how many miles separated us, our hearts always found their way back to each other. Our love grew stronger through every journey, every reunion, and every dream we shared along the way.
                </p>

                <div className="py-8 flex justify-center">
                  <div className="w-full h-72 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white/60">
                    <img
                      src="/PRE/WhatsApp Image 2026-06-28 at 21.19.46 (1).jpeg"
                      alt="Couple Story 2"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <p>
                  From meeting each other’s families to creating unforgettable memories across different corners of the world, every step has led us to this moment. Today, we are filled with gratitude for the path we have walked together and excited for the future that awaits us.
                </p>

                <div className="py-8 md:py-12 relative w-full h-[280px] md:h-[360px] flex justify-center px-1">
                  <motion.div 
                    initial={{ opacity: 0, x: -30, rotate: -10 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -5 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="absolute left-0 top-0 w-[58%] md:w-[65%] h-52 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border-[4px] md:border-[6px] border-white z-10 hover:z-30 hover:rotate-[-2deg] hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src="/PRE/WhatsApp Image 2026-06-28 at 21.19.46 (2).jpeg"
                      alt="Couple Story Collage 1"
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 30, rotate: 10 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 5 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                    className="absolute right-0 top-12 md:top-16 w-[58%] md:w-[65%] h-52 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border-[4px] md:border-[6px] border-white z-20 hover:z-30 hover:rotate-[2deg] hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src="/PRE/WhatsApp Image 2026-06-28 at 21.19.47.jpeg"
                      alt="Couple Story Collage 2"
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>
                </div>

                <p className="mt-2">
                  Together, we have chosen to turn our forever dream into reality.
                </p>

                <p className="text-[#3D2B1F] font-medium text-center italic mt-8 text-[14px]">
                  With love in our hearts and joy beyond words, we invite you to celebrate the beginning of our next chapter as we say “I do” and start our forever together.
                </p>
              </div>

              <div className="mt-12 flex items-center justify-center gap-3 w-1/2">
                <div className="h-px bg-[#EAE1D3] flex-1"></div>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#C8B29E]"></div>
                <div className="h-px bg-[#EAE1D3] flex-1"></div>
              </div>
            </motion.div>
          </div>
        </section>



        {/* --- SCREEN 4: Timeline --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 w-full max-w-sm flex flex-col items-center shadow-lg py-12"
              >
                <h2 className="serif text-3xl tracking-[0.2em] text-[#3D2B1F] font-medium uppercase mb-2">
                  Wedding
                </h2>
                <h3 className="script text-4xl text-[#8B7355] mb-10">
                  Timeline
                </h3>

                <div className="flex flex-col gap-6 w-full relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-300 -translate-x-1/2" />

                  {[
                    { time: "4:45 PM", title: "GUEST ARRIVAL" },
                    { time: "5:00 PM", title: "VOWS & RING EXCHANGE", sub: "Lawn Area" },
                    { time: "6:00 PM", title: "WEDDING RECEPTION", sub: "Ballroom" },
                    { time: "6:30 PM", title: "COCKTAIL HOUR" },
                    { time: "12:00 AM", title: "CELEBRATION ENDS" },
                  ].map((item, idx) => (
                    <div key={idx} className="relative z-10 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white shadow-sm w-[85%] mx-auto">
                      <p className="text-[11px] font-bold text-[#8B7355] mb-1">{item.time}</p>
                      <p className="text-[10px] uppercase tracking-widest text-[#3D2B1F] font-semibold">{item.title}</p>
                      {item.sub && <p className="serif text-[10px] italic text-zinc-500 mt-1">{item.sub}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 5: The Details --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-sm flex flex-col gap-4"
              >
                <div className="bg-[#FAF7F2] p-8 rounded-[2rem] shadow-md border border-white">
                  <h3 className="script text-3xl text-[#8B7355] mb-1">the</h3>
                  <h2 className="serif text-3xl tracking-[0.2em] text-[#3D2B1F] font-medium uppercase mb-6">Details</h2>

                  <div className="w-full h-32 rounded-xl overflow-hidden mb-4 relative">
                    <img src="https://www.watersedge.lk/wp-content/uploads/2026/01/004A2024-1024x1536.jpg" className="w-full h-full object-cover" alt="Venue" />
                  </div>

                  <div className="bg-[#EAE1D3] py-2 rounded-t-xl mb-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B7355]">Location</p>
                  </div>
                  <div className="bg-white py-4 rounded-b-xl shadow-sm border border-white mb-4 flex flex-col items-center">
                    <p className="text-[10px] uppercase font-bold text-[#3D2B1F]">Weligama Bay Marriott</p>
                    <p className="text-[8px] uppercase tracking-widest text-zinc-500 mt-1">Resort &amp; Spa</p>
                    <p className="text-[8px] uppercase tracking-widest text-zinc-500 mb-3">Weligama, Sri Lanka</p>
                    <a
                      href="https://maps.app.goo.gl/RU45U8xe2TiZsmL98"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#EAE1D3] text-[#3D2B1F] rounded-full text-[8px] uppercase tracking-widest font-bold hover:bg-[#C8B29E] transition-colors"
                    >
                      <MapPin size={10} />
                      Live Location
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 6: RSVP --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-[#EAE1D3] w-full max-w-sm min-h-[80vh] h-auto flex flex-col justify-center items-center shadow-xl"
              >
                <div className="flex items-center justify-center gap-3 w-[60%] mx-auto mb-10 mt-4 md:mt-0">
                  <div className="h-px bg-zinc-300 flex-1"></div>
                  <p className="serif text-[11px] uppercase tracking-[0.2em] font-medium text-[#2C2C2C]">PLEASE</p>
                  <div className="h-px bg-zinc-300 flex-1"></div>
                </div>

                <div className="relative mb-12 w-[85%] max-w-[260px]">
                  <img src="/floral_rsvp.png" alt="RSVP" className="w-full h-auto object-contain mix-blend-multiply" />
                </div>

                <p className="serif text-[11px] sm:text-[13px] uppercase tracking-[0.15em] font-bold text-[#2C2C2C] mb-6">
                  BY AUGUST 28, 2026
                </p>

                <div className="w-full">
                  <RSVPForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 7: Wishes --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-[#EAE1D3] w-full max-w-sm h-auto flex flex-col justify-center items-center shadow-xl"
              >
                <div className="flex items-center justify-center gap-3 w-[60%] mx-auto mb-6 mt-4 md:mt-0">
                  <div className="h-px bg-zinc-300 flex-1"></div>
                  <p className="serif text-[11px] uppercase tracking-[0.2em] font-medium text-[#2C2C2C]">GUEST BOOK</p>
                  <div className="h-px bg-zinc-300 flex-1"></div>
                </div>

                <h3 className="script text-4xl text-[#C8B29E] mb-6">Leave a Wish</h3>

                <p className="serif text-[11px] sm:text-[13px] text-[#2C2C2C] mb-8 leading-relaxed">
                  We'd love to hear from you! Please leave your wishes, advice, or a simple hello for us.
                </p>

                <div className="w-full">
                  <WishesForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </div>

      {/* Audio and Play Button */}
      <audio
        ref={audioRef}
        src="/Teddy Swims - You're Still The One (Shania Twain Cover).mp3"
        loop
      />
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-[60] p-3 rounded-full shadow-lg transition-all ${isPlaying ? 'bg-[#C8B29E] text-white' : 'bg-white/80 backdrop-blur-sm text-[#8B7355] border border-[#EAE1D3]'
          }`}
        aria-label="Toggle music"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
