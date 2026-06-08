"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
}
const TablePagination = ({ currentPage, totalPages }: TablePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={isPending || currentPage <= 1}
      >
        <ChevronLeft className="size-4 mr-1" />
        Previous
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
          let pageNumber;
          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }
          return (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size={"sm"}
              onClick={() => navigateToPage(pageNumber)}
              disabled={isPending}
              className="w-10"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={isPending || currentPage >= totalPages}
      >
        Next
        <ChevronRight className="size-4 ml-1" />
      </Button>
      <span className="text-sm text-muted-foreground ml-2">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default TablePagination;
