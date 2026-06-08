import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  showActions?: boolean;
}
const TableSkeleton = ({
  columns,
  rows = 10,
  showActions = true,
}: TableSkeletonProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {[...Array(columns)].map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="w-[70px]">
                <Skeleton className="h-4 w-full" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i}>
              {[...Array(columns)].map((_, j) => (
                <TableCell key={j}>
                  <div className="flex items-center gap-2">
                    {j == 0 && <Skeleton className="size-10 w-full" />}
                    <Skeleton className="h-4 w-full" />
                  </div>
                </TableCell>
              ))}
              {showActions && (
                <TableCell className="w-[70px]">
                  <Skeleton className="size-8 rounded-md" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableSkeleton;
