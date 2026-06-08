"use client";
import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface RefreshButtonProps {
  size?: "sm" | "lg" | "default";
  variant?: "secondary" | "ghost" | "link" | "outline" | "default";
  showLabel?: boolean;
}
const RefreshButton = ({
  size = "default",
  variant = "default",
  showLabel = true,
}: RefreshButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleRefresh}
      disabled={isPending}
    >
      <RefreshCcw
        className={`size-4 ${isPending ? "animate-spin" : ""} ${showLabel ? "mr-2" : ""}`}
      />
      {showLabel && "Refresh"}
    </Button>
  );
};

export default RefreshButton;
