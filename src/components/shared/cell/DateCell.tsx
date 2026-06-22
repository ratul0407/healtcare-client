"use client";

import { formateDateTime } from "@/lib/formatters";

interface DateCellProps {
  date?: string | Date;
}

export function DateCell({ date }: DateCellProps) {
  return <span className="text-sm">{formateDateTime(date!)}</span>;
}
