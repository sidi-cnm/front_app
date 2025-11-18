export default function Topbar({ title }: { title: string }) {
  return (
    <header
      className="
        sticky top-0 z-30
        flex items-center justify-between
        h-14
        px-4 md:px-6
        bg-white/90
        backdrop-blur-sm
        border-b border-gray-100
      "
    >
      <h1 className="text-xl md:text-2xl font-semibold text-[#1b4d7a]">
        {title}
      </h1>
    </header>
  );
}
