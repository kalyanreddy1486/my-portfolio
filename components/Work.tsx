import { heads, projects } from "@/content";
import Head from "./Head";
import Manifesto from "./Manifesto";
import More from "./More";
import Numbers from "./Numbers";
import Project from "./Project";
import Section from "./Section";

export default function Work() {
  return (
    <Section id="work">
      <div className="mb-28 pt-6 sm:mb-36 sm:pt-12">
        <div data-build="wipe">
          <Manifesto />
        </div>
        <Numbers />
      </div>
      <Head {...heads.work} />
      {projects.map((p, i) => (
        <Project key={p.name} p={p} i={i} />
      ))}
      <More />

    </Section>
  );
}
