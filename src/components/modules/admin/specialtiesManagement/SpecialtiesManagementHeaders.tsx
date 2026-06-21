"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import SpecialtiesFormDialog from "./SpecialtiesFormDialog";
import { useRouter } from "next/navigation";

const SpecialtiesManagementHeaders = () => {
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
      <SpecialtiesFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />
      <ManagementPageHeader
        title="Specialties Management"
        description="Manage Specialties Information and details"
        action={{
          label: "Add Specialty",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default SpecialtiesManagementHeaders;
