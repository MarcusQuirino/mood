import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const { userId } = await auth();

  const match = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: userId as string,
      },
    });
  } else {
    redirect("/journal");
  }
};

export default async function NewUserPage() {
  await createNewUser();
  return (
    <div>
      <h1>New User</h1>
    </div>
  );
}
