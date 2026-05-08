"use client";

import { ExternalLink, Gamepad2, Image as ImageIcon, Play, Video } from "lucide-react";

type MediaCardProps = {
  type: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  link: string;
};

export function MediaCard({ type, title, subtitle, imageSrc, link }: MediaCardProps) {
  const isVideo = type === "video";
  const isGame = type === "game";

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 aspect-video cursor-pointer">
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 transform
          ${
            isVideo
              ? "bg-indigo-600/80 text-white group-hover:scale-125"
              : isGame
                ? "bg-emerald-500/80 text-white group-hover:scale-125 group-hover:rotate-12"
                : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 bg-white/20 text-white"
          }`}
        >
          {isVideo && <Play size={24} className="ml-1 md:w-7 md:h-7" />}
          {isGame && <Gamepad2 size={24} className="md:w-7 md:h-7" />}
          {!isVideo && !isGame && <ImageIcon size={24} className="md:w-7 md:h-7" />}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="inline-flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 md:mb-3">
          {isVideo && <Video size={10} className="md:w-3 md:h-3" />}
          {isGame && <Gamepad2 size={10} className="md:w-3 md:h-3" />}
          {!isVideo && !isGame && <ImageIcon size={10} className="md:w-3 md:h-3" />}
          {type}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">{title}</h3>
        <p className="text-slate-300 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden sm:block">
          {subtitle}
        </p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 md:mt-4 text-xs md:text-sm font-semibold text-indigo-300 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"
        >
          {isVideo ? "Watch Video" : isGame ? "Play Demo" : "View Gallery"} <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
