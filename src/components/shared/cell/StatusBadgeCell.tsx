import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  isDeleted?: boolean;
  activeText?: string;
  deletedText?: string;
}
const StatusBadgeCell = ({
  isDeleted,
  activeText = "Active",
  deletedText = "Deleted",
}: StatusBadgeCellProps) => {
  return (
    <Badge variant={isDeleted ? "destructive" : "default"}>
      {isDeleted ? deletedText : activeText}
    </Badge>
  );
};

export default StatusBadgeCell;
