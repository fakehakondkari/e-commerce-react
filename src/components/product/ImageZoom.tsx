import { useState } from 'react';

interface ImageZoomProps {
  src: string;
  alt: string;
}

export function ImageZoom({ src, alt }: ImageZoomProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover transition duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
}
