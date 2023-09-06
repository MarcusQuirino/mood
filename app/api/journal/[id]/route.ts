import { analize } from "@/lib/ai";
import { getUserByClerkID } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUserByClerkID();
  const body = await request.json() as { content: string };
  console.log(`body: ${JSON.stringify(body)}`);

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content: body.content,
    },
  });

  const analisis = await analize (body.content);

  await prisma.analysis.create({
    data: {
      entryId: updatedEntry.id,
      ...analisis,
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: updatedEntry });
}
