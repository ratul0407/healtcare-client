import { Column } from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialty.interface";
import Image from "next/image";

export const SpecialtiesColumn: Column<ISpecialty>[] = [
  {
    header: "Icon",
    accessor: (specialty) => (
      <Image
        src={specialty.icon}
        alt={specialty.title}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    header: "title",
    accessor: (specialty) => specialty.title,
  },
];
