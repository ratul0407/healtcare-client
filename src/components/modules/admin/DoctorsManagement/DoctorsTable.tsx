"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { IDoctor } from "@/types/doctor.interface";
import { doctorsColumns } from "./DoctorsColumn";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { softDeleteDoctor } from "@/services/admin/doctorsManagement";
import DeleteCOnfirmation from "@/components/shared/DeleteConfirmation";
import { toast } from "sonner";

interface IDoctorTableProps {
  doctors: IDoctor[];
}
const DoctorsTable = ({ doctors }: IDoctorTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleDelete = (specialty: IDoctor) => {
    setDeletingDoctor(specialty);
  };
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  const confirmDelete = async () => {
    if (!deletingDoctor) return;
    setIsDeletingDialog(true);
    const result = await softDeleteDoctor(deletingDoctor.id!);
    setIsDeletingDialog(false);
    if (result.success) {
      toast.success(result.message || "Specialty deleted successfully");
      setDeletingDoctor(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete specialty");
    }
  };
  return (
    <>
      <ManagementTable
        data={doctors}
        columns={doctorsColumns}
        onView={() => {}}
        onEdit={() => {}}
        onDelete={handleDelete}
        getRowKey={(doctor) => doctor.id!}
        emptyMessage="No specialties Found"
      />
      <DeleteCOnfirmation
        open={!!deletingDoctor}
        onOpenChange={(open) => !open && setDeletingDoctor(null)}
        onConfirm={confirmDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete ${deletingDoctor?.name}? This action cannot be undone`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default DoctorsTable;
