import About from "@/components/About";
import Agents from "@/components/Agents";
import Bar from "@/components/Bar";
import Boot from "@/components/Boot";
import Contact from "@/components/Contact";
import Dock from "@/components/Dock";
import Hero from "@/components/Hero";
import Record from "@/components/Record";
import Stack from "@/components/Stack";
import Work from "@/components/Work";

export default function Page() {
  return (
    <>
      <Boot />
      <Bar />
      <main>
        <Hero />
        <Work />
        <Stack />
        <Record />
        <About />
        <Contact />
      </main>
      <Agents />
      <Dock />
    </>
  );
}
