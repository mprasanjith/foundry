import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/app");

    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      {session ? (
        <button
          onClick={() => signOut()}
          className="mx-auto my-10 rounded-full bg-gray-800 py-2 px-4 font-bold text-white hover:bg-gray-900"
        >
          Sign out
        </button>
      ) : (
        <a
          onClick={() => signIn("github")}
          className="mx-auto my-10 rounded-full bg-gray-800 py-2 px-4 font-bold text-white hover:bg-gray-900"
        >
          Sign in with GitHub
        </a>
      )}
    </div>
  );
};

export default HomePage;
