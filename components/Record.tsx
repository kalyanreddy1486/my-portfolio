import { heads } from "@/content";
import Certs from "./Certs";
import Edu from "./Edu";
import Exp from "./Exp";
import Head from "./Head";
import Section from "./Section";

export default function Record() {
  return (
    <Section id="record">
      <Head {...heads.record} />
      <Exp />
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <Edu />
        <Certs />
      </div>
    </Section>
  );
}
