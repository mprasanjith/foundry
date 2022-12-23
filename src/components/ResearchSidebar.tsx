import React, { useState } from "react";
import useSWR from "swr";

interface WikipediaResult {
  title: string;
  pageid: string;
  snippet: string;
}

const WikipediaSearch = () => {
  const [query, setQuery] = useState("");
  const { data, error } = useSWR<WikipediaResult[]>(
    query ? `/api/wikipedia?query=${query}` : null
  );

  if (error) {
    console.log({ error });
    return (
      <div className="text-center text-red-500">Failed to load results</div>
    );
  }

  return (
    <div className="mx-auto w-full">
      <div className="bg-gray-100 px-4 py-3 text-md font-bold text-gray-800">
        Research
      </div>
      <div className="sticky top-0 border border-gray-200 bg-white px-4 py-3">
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-4 py-2 text-lg leading-tight text-gray-700 shadow focus:outline-none"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
      </div>
      {data && (
        <ul className="mt-4 list-none">
          {data.map((result) => (
            <li
              key={result.pageid}
              className="rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              <a
                className="font-bold text-blue-500 hover:underline"
                href={`https://en.wikipedia.org/?curid=${result.pageid}`}
              >
                {result.title}
              </a>
              <p
                className="mt-1 text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: result.snippet }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WikipediaSearch;
