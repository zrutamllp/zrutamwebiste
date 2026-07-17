import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-paper grain min-h-[70vh] flex items-center">
      <div className="mx-auto max-w-6xl px-6 py-24 pt-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">404</p>
        <h1 className="font-display text-5xl md:text-7xl text-ink text-balance">
          This page took a <em className="italic text-teal-600">development detour.</em>
        </h1>
        <p className="mt-6 text-lg text-navy-600">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/solutions/" variant="outline">Explore solutions</Button>
        </div>
      </div>
    </section>
  );
}
