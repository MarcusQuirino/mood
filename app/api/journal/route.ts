import { getUserByClerkID } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await getUserByClerkID();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "New entry! Write about your day.",
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
}
