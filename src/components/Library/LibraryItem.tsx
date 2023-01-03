import React, { FC } from "react";

interface LibraryItemProps {
  name: string;
  lastModified: Date;
  published: boolean;
}

const LibraryItem: FC<LibraryItemProps> = ({ name, lastModified, published }) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm border border-gray-200">
      <div className="flex items-center">
        <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-gray-400">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2C2 1.44772 2.44772 1 3 1H17C17.5523 1 18 1.44772 18 2V3H2V2Z"
              fill="#fff"
            />
            <path
              d="M2 7C2 6.44772 2.44772 6 3 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V7Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">Updated on {new Date(lastModified)?.toDateString()}</p>
        </div>
      </div>
      {/* <div>{published ? "Published": "Draft"}</div> */}
    </div>
  );
};

export default LibraryItem;
