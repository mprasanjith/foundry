import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LibraryItem from "../components/Library/LibraryItem";
import LibraryHeader from "../components/LibraryHeader";

interface LibraryItem {
  id: number;
  description: string;
  updated_at: Date;
}

const Libary = () => {
  const { data: items } = useSWR<LibraryItem[]>("/api/gists");

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <LibraryHeader />

      <h1 className="mx-3 mt-4 text-2xl font-semibold">Your Posts</h1>
      <div className="m-3 grid grid-cols-3 gap-4">
        {items?.map((item) => (
          <Link key={item.id} href={`/editor?id=${item.id}`}>
            <LibraryItem
              name={item.description}
              lastModified={item.updated_at}
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Libary;
