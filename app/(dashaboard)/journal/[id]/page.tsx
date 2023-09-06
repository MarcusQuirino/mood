import { Editor } from "@/components/Editor";
import { Separator } from "@/components/ui/separator";
import { analize } from "@/lib/ai";
import { getUserByClerkID } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function getEntry(id: string) {
  const user = await getUserByClerkID();
  const entry = prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });

  console.log(await analize(
    `I wanked up with my cat on my face then I want to the car instruction and bit the car. the instructor keep distraction me. I went home and try to make a tapioca and almost burned the thing. I got late to my class on my biology class. frustatade tryign to play some flash games`
  ));

  return entry;
}

const analisisData = [
  { name: "summary", value: "" },
  { name: "subjects", value: "" },
  { name: "mood", value: "" },
  { name: "negative", value: "" },
];

export default async function EntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await getEntry(params.id);
  return (
    <div className='w-full h-full grid grid-cols-3'>
      <div className='col-span-2 '>
        <Editor entry={entry} />
      </div>
      <div className='border-l border-l-slate-950/10'>
        <div className='bg-blue-400 p-4'>
          <p className='text-2xl font-semibold'>Analysis</p>
        </div>
        <div>
          <ul>
            {analisisData.map(item => (
              <li key={item.name}>
                <Separator />
                <div className='flex items-center justify-between p-4'>
                  <p className='text-lg font-semibold'>{item.name}</p>
                  <p>{item.value}</p>
                </div>
                <Separator />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
