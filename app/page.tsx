import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? "/journal" : "/new-user";

  return (
    <main className='w-screen h-screen bg-background flex justify-center items-center text-foreground'>
      <div className='w-full max-w-[700px] mx-auto space-y-5 text-left'>
        <h1 className='text-6xl'>The AI powered jornal</h1>
        <p className='text-2xl text-foreground/60'>
          the best journal you ever have and this is just placeholder text pra
          enxer linguiça
        </p>
        <div>
          <Link href={href}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
