import DoctorsManagementHeader from "@/components/modules/admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/admin/DoctorsManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getDoctors } from "@/services/admin/doctorsManagement";
import { getSpecialties } from "@/services/admin/specialtiesManagement";
import { ISpecialty } from "@/types/specialty.interface";
import { Suspense } from "react";

const DoctorsManagementPage = async () => {
  const specialtiesResult = await getSpecialties();
  const doctorResult = await getDoctors();
  console.log(doctorResult);
  return (
    <div className="space-y-6">
      <DoctorsManagementHeader />
      <div className="flex space-x-2">
        <RefreshButton />
        <SearchFilter paramName="searchTerm" placeholder="Search for doctors" />
        <SelectFilter
          paramName="specialty"
          options={specialtiesResult.data.map((specialty: ISpecialty) => ({
            label: specialty.title,
            value: specialty.id,
          }))}
          placeholder="Filter by specialty"
        />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorsTable doctors={doctorResult.data} />
      </Suspense>
    </div>
  );
};

export default DoctorsManagementPage;
