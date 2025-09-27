import React, { useState } from "react";
// import CreateCertificateTemplate from "";
import CertificateTemplates from "../Certificatemanagement/CertificateTemplates";
import { deleteCertificateTemplate } from "../../api/api";

export default function CertificateManagement() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => setRefreshKey((prev) => prev + 1);
  const handleDelete = async (id) => {
    await deleteCertificateTemplate(id);
    setRefreshKey((prev) => prev + 1);
  };

return (
  <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
    {/* <CreateCertificateTemplate onCreated={handleCreated} /> */}
    {/* <CertificateTemplates refreshKey={refreshKey} onDelete={handleDelete} /> */}
  </div>
);

}
