import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { initSmoothScroll } from "./lib/smoothScroll";
import Hero from "./components/landingpage/Hero";
import LatestPodcast from "./components/landingpage/LatestPodcast";
import ComingSoon from "./components/landingpage/ComingSoon";
import OurHost from "./components/landingpage/OurHost";
import Reviews from "./components/landingpage/Reviews";
import WhatWeDo from "./components/landingpage/WhatweDo";
import Footer from "./components/Footer";
import PodcastPlayer from "./components/landingpage/PodcastPlayer";
import NextGuest from "./components/landingpage/Guest";
import BrandMarquee from "./components/landingpage/BrandMarque";

export default function App() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <main className="min-h-screen bg-brand-cream">
      <Navbar />
      <Hero />
      <BrandMarquee />
      <ComingSoon />
      <LatestPodcast />
      <OurHost />
      <PodcastPlayer />
      <Reviews />
      <WhatWeDo />
      <NextGuest />
      <Footer />
    </main>
  );
}