import { EntryCard } from "@/components/EntryCard";
import { NewEntryCard } from "@/components/NewEntryCard";
import { getUserByClerkID } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

const getEntries = async () => {
  const user = await getUserByClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return entries;
};

export default async function JournalPage() {
  const entries = await getEntries();
  return (
    <div className='p-8 bg-stone-400/10 h-full'>
      <h2 className='text-2xl font-semibold pb-4'>Journal</h2>
      <div className='grid grid-cols-3 gap-4'>
        <NewEntryCard />
        {entries.map(entry => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard
              entry={entry}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
