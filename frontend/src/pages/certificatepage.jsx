//  import React, { useEffect, useState } from "react";
// import {
//   updateCertificateTemplate,
//   approveCertificate,
//   rejectCertificate,
//   getCertificates,
// } from "../api/api.jsx";

// import { Card, CardContent } from "../components/ui/card.jsx";
// import { Button } from "../components/ui/button.jsx";
// import { Input } from "../components/ui/input.jsx";
// import { Label } from "../components/ui/label.jsx";

// /* ------------------- Fixed Template ------------------- */
// const FIXED_TEMPLATE = {
//   _id: "68ba779d850684c843e1ba52",
//   studentName: "[Student Name]",
//   courseTitle: "[Course Title]",
//   uniqueId: "CERT-001",
//   signatories: [
//     { name: "John Doe", title: "CEO", signaturePreview: "/signatures/john.png" },
//     { name: "Jane Smith", title: "Director", signaturePreview: "/signatures/jane.png" }
//   ]
// };

// /* ------------------- Template Preview Component ------------------- */
// function TemplatePreview({ templateDraft }) {
//   const signatories = templateDraft.signatories || [];

//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       <Card className="overflow-hidden">
//         <CardContent className="p-6">
//           <div className="relative bg-white w-full h-[420px] border rounded shadow-sm">
//             <div className="flex items-center justify-between p-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-black">Certificate of Completion</h2>
//                 <p className="text-sm text-black">Issued by Larnik E-Learning</p>
//               </div>
//             </div>

//             <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//               <p className="text-xl text-black">This certifies that</p>
//               <h3 className="mt-2 text-3xl font-semibold text-black">{templateDraft.studentName}</h3>
//               <p className="mt-3 text-lg text-black">has successfully completed</p>
//               <p className="mt-2 text-lg font-medium text-black">{templateDraft.courseTitle}</p>
//             </div>

//             <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
//               <div className="flex gap-6 items-end">
//                 {signatories.length > 0 ? (
//                   signatories.map((s, i) => (
//                     <div key={i} className="flex flex-col items-center w-40">
//                       {s.signaturePreview ? (
//                         <img src={s.signaturePreview} alt={`sig-${i}`} className="h-16 object-contain" />
//                       ) : (
//                         <div className="h-16 w-40 bg-gray-100 flex items-center justify-center text-xs text-black">signature</div>
//                       )}
//                       <div className="text-sm mt-1 text-center font-medium text-black">{s.name}</div>
//                       <div className="text-xs text-black">{s.title}</div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-sm text-black">No signatories yet</div>
//                 )}
//               </div>
//               <div className="text-right text-xs text-black">Certificate ID: {templateDraft.uniqueId}</div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ------------------- Template Editor ------------------- */
// //  export function EditTemplate({ template, onUpdated }) {
// //   const [signatories, setSignatories] = useState(template.signatories || []);
// //   const [loading, setLoading] = useState(false);

// //   const updateSign = (idx, patch) => {
// //     setSignatories((s) => s.map((sig, i) => (i === idx ? { ...sig, ...patch } : sig)));
// //   };

// //   const handleFileChange = (idx, file) => {
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       updateSign(idx, { signaturePreview: reader.result });
// //     };
// //     if (file) reader.readAsDataURL(file);
// //   };

// //    const handleUpdate = async () => {
// //   setLoading(true);
// //   try {
// //     await updateCertificateTemplate(template._id, { signatories });
// //     onUpdated?.({ ...template, signatories }); // pass updated template
// //     alert("Template updated successfully!");
// //   } catch (err) {
// //     console.error(err);
// //     alert("Failed to update template");
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   return (
// //     <div className="space-y-4">
// //       <Card>
// //         <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <Label>Signatories (max 5)</Label>
// //             <div className="space-y-3 mt-3">
// //               {signatories.map((s, i) => (
// //                 <div key={i} className="p-3 border rounded flex flex-col gap-2">
// //                   <Input
// //                     placeholder="Name"
// //                     value={s.name}
// //                     onChange={(e) => updateSign(i, { name: e.target.value })}
// //                   />
// //                   <Input
// //                     placeholder="Title"
// //                     value={s.title}
// //                     onChange={(e) => updateSign(i, { title: e.target.value })}
// //                   />
// //                   <div>
// //                     <Label>Upload Signature</Label>
// //                     <Input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={(e) => handleFileChange(i, e.target.files[0])}
// //                     />
// //                     {s.signaturePreview && (
// //                       <img src={s.signaturePreview} alt="signature-preview" className="h-16 mt-2 object-contain" />
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //             <Button className="mt-4" onClick={handleUpdate} disabled={loading}>
// //               {loading ? "Updating..." : "Update Template"}
// //             </Button>
// //           </div>

// //           <div>
// //             <Label>Live Preview</Label>
// //             <TemplatePreview templateDraft={{ ...template, signatories }} />
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// export function EditTemplate({ template, onUpdated }) {
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

//   const handleUpdate = async () => {
//     setLoading(true);
//     try {
//       await updateCertificateTemplate(template._id, { signatories });
//       onUpdated?.({ ...template, signatories }); // pass updated template to parent
//       alert("Template updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update template");
//     } finally {
//       setLoading(false);
//     }
//   };

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
//             {/* <-- Pass live signatories state here --> */}
//             <TemplatePreview templateDraft={{ ...template, signatories }} />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// /* ------------------- Pending Certificates ------------------- */
// function PendingCertificates() {
//   const [certs, setCerts] = useState([]);

//   const fetchCerts = async () => {
//     try {
//       const res = await getCertificates();
//       setCerts(res.data.certificates.filter(c => c.status === "pending"));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCerts();
//   }, []);

//   const handleApprove = async (id) => {
//     await approveCertificate(id);
//     fetchCerts();
//   };

//   const handleReject = async (id) => {
//     await rejectCertificate(id);
//     fetchCerts();
//   };

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold">Certificates Pending Approval</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {certs.map((c) => (
//           <Card key={c._id} className="p-4 flex justify-between items-center">
//             <div>
//               <h4 className="font-medium text-black">{c.courseTitle}</h4>
//               <p className="text-xs text-black">Student: {c.studentName}</p>
//             </div>
//             <div className="flex gap-2">
//               <Button size="sm" onClick={() => handleApprove(c._id)}>Approve</Button>
//               <Button size="sm" variant="destructive" onClick={() => handleReject(c._id)}>Reject</Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ------------------- Certificate Manager Page ------------------- */
// // export default function CertificateManagerPage() {
// //   const [selectedTemplate, setSelectedTemplate] = useState(FIXED_TEMPLATE);

// //   return (
// //     <div className="p-6 space-y-8 bg-green-400">
// //       <h1 className="text-2xl font-bold text-black">Certificate Management</h1>

// //       <div className="mt-8">
// //         {/* Live preview of the fixed template */}
// //         <TemplatePreview templateDraft={selectedTemplate} />
// //       </div>

// //       <div className="mt-8">
// //         {/* Edit template signatories */}
// //         <EditTemplate template={selectedTemplate} onUpdated={() => console.log("Template updated")} />
// //       </div>

// //       <div className="mt-8">
// //         {/* Pending certificates for approve/reject */}
// //         <PendingCertificates />
// //       </div>
// //     </div>
// //   );
// // }
//  export default function CertificateManagerPage() {
//   const [selectedTemplate, setSelectedTemplate] = useState(FIXED_TEMPLATE);

//   // Callback to update template after edit
//   const handleTemplateUpdated = (updatedTemplate) => {
//     // Replace selectedTemplate with updated one
//     setSelectedTemplate(updatedTemplate);
//   };

//   return (
//     <div className="p-6 space-y-8 bg-green-400">
//       <h1 className="text-2xl font-bold text-black">Certificate Management</h1>

//       {/* <div className="mt-8">
//         <TemplatePreview templateDraft={selectedTemplate} />
//       </div> */}

//       <div className="mt-8">
//         {/* Edit template signatories */}
//         <EditTemplate template={selectedTemplate} onUpdated={handleTemplateUpdated} />
//       </div>

//       <div className="mt-8">
//         {/* Pending certificates for approve/reject */}
//         <PendingCertificates />
//       </div>
//     </div>
//   );
// }




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
import { Signal, Signature, SignatureIcon } from "lucide-react";

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
      <Card className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-emerald-300">
        <CardContent className="p-8">
          <div className="relative bg-white w-full h-[450px] border-2 border-emerald-500 rounded-xl shadow-md">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-emerald-300">
              <div>
                <h2 className="text-3xl font-extrabold text-emerald-700">Certificate of Completion</h2>
                <p className="text-sm text-gray-600">Issued by Larnik E-Learning</p>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="text-lg text-gray-700">This certifies that</p>
              <h3 className="mt-2 text-4xl font-bold text-gray-900">{templateDraft.studentName}</h3>
              <p className="mt-3 text-lg text-gray-700">has successfully completed</p>
              <p className="mt-2 text-xl font-semibold text-emerald-700">{templateDraft.courseTitle}</p>
            </div>

            {/* Footer - Signatories */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="flex flex-wrap gap-8 items-end">
                {signatories.length > 0 ? (
                  signatories.map((s, i) => (
                    <div key={i} className="flex flex-col items-center w-32">
                      {s.signaturePreview ? (
                        <img src={s.signaturePreview} alt={`sig-${i}`} className="h-14 object-contain" />
                      ) : (
                        <div className="h-14 w-32 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded-md">signature</div>
                      )}
                      <div className="text-sm mt-1 text-center font-medium text-gray-900">{s.name}</div>
                      <div className="text-xs text-gray-600">{s.title}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No signatories yet</div>
                )}
              </div>
              <div className="text-right text-xs text-gray-500">
                Certificate ID: <span className="font-medium text-emerald-700">{templateDraft.uniqueId}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------- Edit Template ------------------- */
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
      onUpdated?.({ ...template, signatories });
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
      <Card className="backdrop-blur-md bg-white/80 shadow-xl border border-emerald-300 rounded-2xl">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Signatories Editor */}
          <div>
            <Label className="font-semibold text-emerald-700">Signatories (max 5)</Label>
            <div className="space-y-3 mt-3">
              {signatories.map((s, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
                  <Input
                    placeholder="Name"
                    value={s.name}
                    onChange={(e) => updateSign(i, { name: e.target.value })}
                  />
                  <Input
                    placeholder="Title"
                    className="mt-2"
                    value={s.title}
                    onChange={(e) => updateSign(i, { title: e.target.value })}
                  />
                  <div className="mt-2">
                    <Label>Upload Signature</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(i, e.target.files[0])}
                      className="mt-1"
                    />
                    {s.signaturePreview ? (
                      <img src={s.signaturePreview ? s.signaturePreview : <SignatureIcon />} alt={<Signature />} className="h-16 mt-2 object-contain rounded-md border" />
                    )
                    :
                    <Signature />
                  }
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md rounded-lg" onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update Template"}
            </Button>
          </div>

          {/* Live Preview */}
          <div>
            <Label className="font-semibold text-emerald-700">Live Preview</Label>
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
      <h3 className="text-lg font-bold text-emerald-700">Certificates Pending Approval</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((c) => (
          <Card key={c._id} className="p-4 flex justify-between items-center shadow-md border border-gray-200 rounded-xl bg-white hover:shadow-lg transition">
            <div>
              <h4 className="font-semibold text-gray-900">{c.courseTitle}</h4>
              <p className="text-xs text-gray-600">Student: {c.studentName}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Approve</Button>
              <Button size="sm" variant="destructive" onClick={() => handleReject(c._id)}>Reject</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ------------------- Certificate Manager Page ------------------- */
export default function CertificateManagerPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(FIXED_TEMPLATE);

  const handleTemplateUpdated = (updatedTemplate) => {
    setSelectedTemplate(updatedTemplate);
  };

  return (
    <div className="p-8 space-y-10 min-h-screen bg-gradient-to-br from-emerald-400 to-green-600">
      <h1 className="text-3xl font-extrabold text-white drop-shadow-md">🎓 Certificate Management</h1>

      <div className="mt-8">
        <EditTemplate template={selectedTemplate} onUpdated={handleTemplateUpdated} />
      </div>

      <div className="mt-8">
        <PendingCertificates />
      </div>
    </div>
  );
}
