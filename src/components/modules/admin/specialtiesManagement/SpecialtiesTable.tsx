"use client";
import ManagementTable from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialty.interface";
import { SpecialtiesColumn } from "./SpecialtiesColumn";
import DeleteCOnfirmation from "@/components/shared/DeleteConfirmation";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteSpecialtyById } from "@/services/admin/specialtiesManagement";
import { toast } from "sonner";

interface SpecialtiesTableProps {
  specialties: ISpecialty[];
}
const SpecialtiesTable = ({ specialties }: SpecialtiesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingSpecialty, setDeletingSpecialty] = useState<ISpecialty | null>(
    null,
  );
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleDelete = (specialty: ISpecialty) => {
    setDeletingSpecialty(specialty);
  };
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  const confirmDelete = async () => {
    if (!deletingSpecialty) return;
    setIsDeletingDialog(true);
    const result = await deleteSpecialtyById(deletingSpecialty.id);
    setIsDeletingDialog(false);
    if (result.success) {
      toast.success(result.message || "Specialty deleted successfully");
      setDeletingSpecialty(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete specialty");
    }
  };

  return (
    <>
      <ManagementTable
        data={specialties}
        columns={SpecialtiesColumn}
        onDelete={handleDelete}
        getRowKey={(specialty) => specialty.id}
        emptyMessage="No specialties Found"
      />
      <DeleteCOnfirmation
        open={!!deletingSpecialty}
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        onConfirm={confirmDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete ${deletingSpecialty?.title}? This action cannot be undone`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default SpecialtiesTable;
