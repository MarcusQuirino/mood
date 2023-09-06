"use client";
import * as React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createNewEntry } from "@/lib/api";
import { useRouter } from "next/navigation";

export function NewEntryCard() {
  const router = useRouter();

  const handleCLick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <Card
      className='w-[350px] cursor-pointer'
      onClick={handleCLick}
    >
      <CardHeader>
        <CardTitle className='font-3xl'>Create new entry</CardTitle>
        <CardDescription>
          Click here to add a new entry to your mood journal
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
