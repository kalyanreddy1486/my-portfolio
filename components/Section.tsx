type P = { id: string; children: React.ReactNode };

export default function Section({ id, children }: P) {
  return (
    <section id={id} data-sec className="mx-auto w-full max-w-6xl scroll-mt-6 px-4 py-16 sm:px-8 sm:py-20">
      {children}
    </section>
  );
}
