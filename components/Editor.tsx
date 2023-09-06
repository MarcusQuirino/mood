"use client";

import { Textarea } from "@/components/ui/textarea";
import { updateEntry } from "@/lib/api";
import type { JournalEntry } from "@prisma/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { ButtonLoading } from "./ButtonLoading";
import dayjs from "dayjs";

export function Editor({ entry }: { entry: JournalEntry | null }) {
  const [content, setContent] = useState(entry?.content || "");
  const [isLoading, setIsLoading] = useState(false);

  if (!entry) return <div className='w-full h-full '>No entry found</div>;

  async function saveEntry() {
    if (!entry) return;
    setIsLoading(true);
    const updatetdEntry = await updateEntry(entry.id, content);
    setIsLoading(false);
  }

  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className='w-full h-full '>
      <div className='flex flex-row justify-between w-full p-8'>
        <h2 className='text-xl font-semibold'>{dayjs(date).format("DD/MM/YYYY")}</h2>
        {!isLoading && <Button onClick={saveEntry}>Save entry</Button>}
        {isLoading && <ButtonLoading />}
      </div>
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className='w-full h-full p-8 text-xl border-none input'
        disabled={isLoading}
      />
    </div>
  );
}
