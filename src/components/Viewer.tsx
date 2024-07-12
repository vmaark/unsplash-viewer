/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import { ChangeEventHandler, FC, useRef, useState } from "react";
import { Pagination } from "./Pagination";
import { unsplash } from "../unsplash";

export const Viewer: FC = () => {
  const [searchTerm, setSearchTerm] = useState("magic");
  const inputRef = useRef<HTMLInputElement>(null);
  const [orderBy, setOrderBy] = useState<"latest" | "relevant">("relevant");
  const onOptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setOrderBy(e.target.value as "latest" | "relevant");
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const query = useQuery({
    queryKey: ["unsplash", searchTerm, page, perPage, orderBy] as const,
    queryFn: async ({ queryKey }) => {
      const [, searchTerm, page, perPage, orderBy] = queryKey;

      const res = await unsplash.search.getPhotos({
        query: searchTerm,
        page,
        perPage,
        orderBy,
        color: "green",
        orientation: "portrait",
      });

      return res;
    },
  });

  return (
    <>
      <form
        className="flex gap-2 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (inputRef?.current?.value) {
            setSearchTerm(inputRef.current.value);
          }
        }}
      >
        <input
          className="rounded bg-transparent border"
          placeholder="Find images"
          type="text"
          ref={inputRef}
        />
        <button type="submit">Search</button>
      </form>
      <div className="flex flex-row gap-2">
        <input
          type="radio"
          name="relevant"
          value="relevant"
          id="relevant"
          checked={orderBy === "relevant"}
          onChange={onOptionChange}
        />
        <label htmlFor="relevant">relevant</label>
        <input
          type="radio"
          name="latest"
          value="latest"
          id="latest"
          checked={orderBy === "latest"}
          onChange={onOptionChange}
        />
        <label htmlFor="latest">latest</label>
      </div>
      <div className="flex flex-1 flex-col items-center">
        {query.isError && <div>Error: {query.error.message}</div>}
        {!query.isError && (
          <>
            <div className="flex flex-wrap pt-4">
              {query.data?.response?.results.map((v, i) => {
                let imageUrl = v.urls.small;

                return (
                  <div key={imageUrl} className="p-1">
                    <div
                      className={`flex flex-col justify-center items-center`}
                    >
                      <div className="w-48 p-2">
                        <a target="_blank" href={v.urls.regular}>
                          <img alt={v.description ?? ""} src={imageUrl} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
              page={page}
              setPage={setPage}
              perPage={perPage}
              totalPages={query?.data?.response?.total_pages ?? 0}
              total={query?.data?.response?.total ?? 0}
            />
          </>
        )}
      </div>
    </>
  );
};
