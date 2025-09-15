import React from 'react';

type PageHeroProps = {
  preTitle: string;
  title: string;
  imageUrl: string;
};

export default function PageHero({ preTitle, title, imageUrl }: PageHeroProps) {
  return (
    <section className="relative flex h-96 min-h-[300px] -mt-20 pt-20 items-center justify-center">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-tertiary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <p className="font-poppins text-sm font-medium uppercase tracking-widest text-white-text/80">
          {preTitle}
        </p>
        <h1 className="mt-2 font-montserrat text-5xl font-bold text-white-text sm:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}