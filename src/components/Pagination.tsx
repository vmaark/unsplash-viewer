import { Dispatch, FC, SetStateAction } from "react";

export const Pagination: FC<{
  total: number | undefined;
  totalPages: number | undefined;
  page: number;
  perPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}> = ({ total, totalPages, page, setPage }) => {
  return (
    <div className="flex flex-row gap-2">
      <button
        disabled={page === 1 || total == undefined}
        onClick={() => {
          setPage((v) => v - 1);
        }}
      >
        {"<"}
      </button>
      <button
        disabled={totalPages == undefined || page >= totalPages}
        onClick={() => {
          setPage((v) => v + 1);
        }}
      >
        {">"}
      </button>
      {totalPages != undefined && <span>{`${page}/${totalPages}`}</span>}
    </div>
  );
};
