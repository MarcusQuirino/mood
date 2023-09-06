import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-screen relative'>
      <aside className='absolute w-[12rem] h-full top-0 left-0 border-r border-slate-950/10'>
        <p>Mood</p>
      </aside>
      <div className='ml-[12rem] h-full'>
        <header className='h-[4rem] border-b border-slate-950/10 '>
          <div className='h-full w-full px-6 flex items-center justify-end'>
            <UserButton />
          </div>
        </header>
        <main className="h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}
