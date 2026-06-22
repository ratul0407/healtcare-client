"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DoctorsFormDialog from "./DoctorsFormDialog";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialty.interface";
import { Plus } from "lucide-react";
interface IDoctorsManagementHeaderProps {
  doctor?: IDoctor;
  specialties?: ISpecialty[];
}
const DoctorsManagementHeader = ({
  doctor,
  specialties,
}: IDoctorsManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <DoctorsFormDialog
        open={isDialogOpen}
        onSuccess={handleSuccess}
        onClose={() => setIsDialogOpen(false)}
        doctor={doctor}
        specialties={specialties}
      />
      <ManagementPageHeader
        title="Doctors Management"
        description="Mange Doctors information and details"
        action={{
          label: "Add Doctor",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default DoctorsManagementHeader;
