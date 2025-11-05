
export default function Topbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between py-4 px-4 md:px-6">
      <h1 className="text-2xl font-semibold text-[#1b4d7a]">{title}</h1>
     
    </header>
  );
}
