 import React, { useEffect, useState } from "react";
import {
  updateCertificateTemplate,
  approveCertificate,
  rejectCertificate,
  getCertificates,
} from "../api/api.jsx";

import { Card, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";

/* ------------------- Fixed Template ------------------- */
const FIXED_TEMPLATE = {
  _id: "68ba779d850684c843e1ba52",
  studentName: "[Student Name]",
  courseTitle: "[Course Title]",
  uniqueId: "CERT-001",
  signatories: [
    { name: "John Doe", title: "CEO", signaturePreview: "/signatures/john.png" },
    { name: "Jane Smith", title: "Director", signaturePreview: "/signatures/jane.png" }
  ]
};

/* ------------------- Template Preview Component ------------------- */
function TemplatePreview({ templateDraft }) {
  const signatories = templateDraft.signatories || [];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="relative bg-white w-full h-[420px] border rounded shadow-sm">
            <div className="flex items-center justify-between p-6">
              <div>
                <h2 className="text-2xl font-bold text-black">Certificate of Completion</h2>
                <p className="text-sm text-black">Issued by Larnik E-Learning</p>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-xl text-black">This certifies that</p>
              <h3 className="mt-2 text-3xl font-semibold text-black">{templateDraft.studentName}</h3>
              <p className="mt-3 text-lg text-black">has successfully completed</p>
              <p className="mt-2 text-lg font-medium text-black">{templateDraft.courseTitle}</p>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="flex gap-6 items-end">
                {signatories.length > 0 ? (
                  signatories.map((s, i) => (
                    <div key={i} className="flex flex-col items-center w-40">
                      {s.signaturePreview ? (
                        <img src={s.signaturePreview} alt={`sig-${i}`} className="h-16 object-contain" />
                      ) : (
                        <div className="h-16 w-40 bg-gray-100 flex items-center justify-center text-xs text-black">signature</div>
                      )}
                      <div className="text-sm mt-1 text-center font-medium text-black">{s.name}</div>
                      <div className="text-xs text-black">{s.title}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-black">No signatories yet</div>
                )}
              </div>
              <div className="text-right text-xs text-black">Certificate ID: {templateDraft.uniqueId}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------- Template Editor ------------------- */
//  export function EditTemplate({ template, onUpdated }) {
//   const [signatories, setSignatories] = useState(template.signatories || []);
//   const [loading, setLoading] = useState(false);

//   const updateSign = (idx, patch) => {
//     setSignatories((s) => s.map((sig, i) => (i === idx ? { ...sig, ...patch } : sig)));
//   };

//   const handleFileChange = (idx, file) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       updateSign(idx, { signaturePreview: reader.result });
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//    const handleUpdate = async () => {
//   setLoading(true);
//   try {
//     await updateCertificateTemplate(template._id, { signatories });
//     onUpdated?.({ ...template, signatories }); // pass updated template
//     alert("Template updated successfully!");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to update template");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label>Signatories (max 5)</Label>
//             <div className="space-y-3 mt-3">
//               {signatories.map((s, i) => (
//                 <div key={i} className="p-3 border rounded flex flex-col gap-2">
//                   <Input
//                     placeholder="Name"
//                     value={s.name}
//                     onChange={(e) => updateSign(i, { name: e.target.value })}
//                   />
//                   <Input
//                     placeholder="Title"
//                     value={s.title}
//                     onChange={(e) => updateSign(i, { title: e.target.value })}
//                   />
//                   <div>
//                     <Label>Upload Signature</Label>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(i, e.target.files[0])}
//                     />
//                     {s.signaturePreview && (
//                       <img src={s.signaturePreview} alt="signature-preview" className="h-16 mt-2 object-contain" />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Button className="mt-4" onClick={handleUpdate} disabled={loading}>
//               {loading ? "Updating..." : "Update Template"}
//             </Button>
//           </div>

//           <div>
//             <Label>Live Preview</Label>
//             <TemplatePreview templateDraft={{ ...template, signatories }} />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export function EditTemplate({ template, onUpdated }) {
  const [signatories, setSignatories] = useState(template.signatories || []);
  const [loading, setLoading] = useState(false);

  const updateSign = (idx, patch) => {
    setSignatories((s) => s.map((sig, i) => (i === idx ? { ...sig, ...patch } : sig)));
  };

  const handleFileChange = (idx, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSign(idx, { signaturePreview: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateCertificateTemplate(template._id, { signatories });
      onUpdated?.({ ...template, signatories }); // pass updated template to parent
      alert("Template updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Signatories (max 5)</Label>
            <div className="space-y-3 mt-3">
              {signatories.map((s, i) => (
                <div key={i} className="p-3 border rounded flex flex-col gap-2">
                  <Input
                    placeholder="Name"
                    value={s.name}
                    onChange={(e) => updateSign(i, { name: e.target.value })}
                  />
                  <Input
                    placeholder="Title"
                    value={s.title}
                    onChange={(e) => updateSign(i, { title: e.target.value })}
                  />
                  <div>
                    <Label>Upload Signature</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(i, e.target.files[0])}
                    />
                    {s.signaturePreview && (
                      <img src={s.signaturePreview} alt="signature-preview" className="h-16 mt-2 object-contain" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4" onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update Template"}
            </Button>
          </div>

          <div>
            <Label>Live Preview</Label>
            {/* <-- Pass live signatories state here --> */}
            <TemplatePreview templateDraft={{ ...template, signatories }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



/* ------------------- Pending Certificates ------------------- */
function PendingCertificates() {
  const [certs, setCerts] = useState([]);

  const fetchCerts = async () => {
    try {
      const res = await getCertificates();
      setCerts(res.data.certificates.filter(c => c.status === "pending"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleApprove = async (id) => {
    await approveCertificate(id);
    fetchCerts();
  };

  const handleReject = async (id) => {
    await rejectCertificate(id);
    fetchCerts();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Certificates Pending Approval</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c) => (
          <Card key={c._id} className="p-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium text-black">{c.courseTitle}</h4>
              <p className="text-xs text-black">Student: {c.studentName}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleApprove(c._id)}>Approve</Button>
              <Button size="sm" variant="destructive" onClick={() => handleReject(c._id)}>Reject</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ------------------- Certificate Manager Page ------------------- */
// export default function CertificateManagerPage() {
//   const [selectedTemplate, setSelectedTemplate] = useState(FIXED_TEMPLATE);

//   return (
//     <div className="p-6 space-y-8 bg-green-400">
//       <h1 className="text-2xl font-bold text-black">Certificate Management</h1>

//       <div className="mt-8">
//         {/* Live preview of the fixed template */}
//         <TemplatePreview templateDraft={selectedTemplate} />
//       </div>

//       <div className="mt-8">
//         {/* Edit template signatories */}
//         <EditTemplate template={selectedTemplate} onUpdated={() => console.log("Template updated")} />
//       </div>

//       <div className="mt-8">
//         {/* Pending certificates for approve/reject */}
//         <PendingCertificates />
//       </div>
//     </div>
//   );
// }
 export default function CertificateManagerPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(FIXED_TEMPLATE);

  // Callback to update template after edit
  const handleTemplateUpdated = (updatedTemplate) => {
    // Replace selectedTemplate with updated one
    setSelectedTemplate(updatedTemplate);
  };

  return (
    <div className="p-6 space-y-8 bg-green-400">
      <h1 className="text-2xl font-bold text-black">Certificate Management</h1>

      <div className="mt-8">
        {/* Live preview of the template */}
        <TemplatePreview templateDraft={selectedTemplate} />
      </div>

      <div className="mt-8">
        {/* Edit template signatories */}
        <EditTemplate template={selectedTemplate} onUpdated={handleTemplateUpdated} />
      </div>

      <div className="mt-8">
        {/* Pending certificates for approve/reject */}
        <PendingCertificates />
      </div>
    </div>
  );
}
