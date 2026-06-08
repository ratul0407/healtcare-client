import SpecialtiesManagementHeaders from "@/components/modules/admin/specialtiesManagement/SpecialtiesManagementHeaders";
import RefreshButton from "@/components/shared/RefreshButton";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { Suspense } from "react";

const AdminSpecialtiesManagementPage = () => {
  return (
    <div className="space-y-6">
      <SpecialtiesManagementHeaders />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        {/* <SpecialtyTable /> */}
      </Suspense>
    </div>
  );
};

export default AdminSpecialtiesManagementPage;
