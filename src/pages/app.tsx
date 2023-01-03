import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useSWR from "swr";
import LibraryItem from "../components/Library/LibraryItem";
import LibraryHeader from "../components/LibraryHeader";

interface LibraryItem {
  id: number;
  description: string;
  updated_at: Date;
  public: boolean;
}

const Libary = () => {
  const router = useRouter();
  const { data: items } = useSWR<LibraryItem[]>("/api/gists");

  const create = async () => {
    const res = await fetch(`/api/gists/create`);
    if (res.ok) {
      toast.success("Created successfully!");

      const body = await res.json();
      const postId = body?.id;
      router.push(`/editor?id=${postId}`);
    } else {
      toast.error("Failed to create");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <LibraryHeader />

      <div className="mx-3 mt-4 flex justify-between">
        <h1 className="text-2xl font-semibold">Your Posts</h1>
        <button
          onClick={create}
          className="rounded-lg bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
        >
          + Create new post
        </button>
      </div>
      <div className="m-3 grid grid-cols-3 gap-4">
        {items?.map((item) => (
          <Link key={item.id} href={`/editor?id=${item.id}`}>
            <LibraryItem
              name={item.description}
              lastModified={item.updated_at}
              published={item.public}
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Libary;
