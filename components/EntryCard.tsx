import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JournalEntry } from "@prisma/client";
import dayjs from "dayjs";

export function EntryCard({ entry }: { entry: JournalEntry }) {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{`Entry Date: ${dayjs(date).format('DD/MM/YYYY')}`}</CardTitle>
        <CardDescription>{`Mood: `}</CardDescription>
      </CardHeader>
      <CardContent><p className="text-ellipsis overflow-hidden">{entry.content}</p></CardContent>
    </Card>
  );
}
