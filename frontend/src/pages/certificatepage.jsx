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
  <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
    <Card className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-emerald-300">
      <CardContent className="p-6 sm:p-8">
        <div className="relative bg-white w-full min-h-[420px] sm:h-[450px] border-2 border-emerald-500 rounded-xl shadow-md">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-emerald-300">
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-700">Certificate of Completion</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Issued by Larnik E-Learning</p>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <p className="text-base sm:text-lg text-gray-700">This certifies that</p>
            <h3 className="mt-2 text-2xl sm:text-4xl font-bold text-gray-900 break-words">{templateDraft.studentName}</h3>
            <p className="mt-3 text-base sm:text-lg text-gray-700">has successfully completed</p>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-emerald-700 break-words">{templateDraft.courseTitle}</p>
          </div>

          {/* Footer - Signatories */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0">
            <div className="flex flex-wrap gap-4 items-end">
              {signatories.length > 0 ? (
                signatories.map((s, i) => (
                  <div key={i} className="flex flex-col items-center w-24 sm:w-32">
                    {s.signaturePreview ? (
                      <img src={s.signaturePreview} alt={`sig-${i}`} className="h-10 sm:h-14 object-contain" />
                    ) : (
                      <div className="h-10 sm:h-14 w-24 sm:w-32 bg-gray-100 flex items-center justify-center text-[10px] sm:text-xs text-gray-500 rounded-md">
                        signature
                      </div>
                    )}
                    <div className="text-sm mt-1 text-center font-medium text-gray-900 truncate w-full">{s.name}</div>
                    <div className="text-[11px] text-gray-600 truncate w-full">{s.title}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No signatories yet</div>
              )}
            </div>
            <div className="text-right text-xs sm:text-sm text-gray-500">
              Certificate ID: <span className="font-medium text-emerald-700 break-words">{templateDraft.uniqueId}</span>
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
  <div className="space-y-4 px-4 sm:px-6">
    <Card className="backdrop-blur-md bg-white/80 shadow-xl border border-emerald-300 rounded-2xl">
      <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
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
                  className="w-full"
                />
                <Input
                  placeholder="Title"
                  className="mt-2 w-full"
                  value={s.title}
                  onChange={(e) => updateSign(i, { title: e.target.value })}
                />
                <div className="mt-2">
                  <Label>Upload Signature</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(i, e.target.files[0])}
                    className="mt-1 w-full"
                  />
                  {s.signaturePreview ? (
                    <img
                      src={s.signaturePreview ? s.signaturePreview : <SignatureIcon />}
                      alt={<Signature />}
                      className="h-16 mt-2 object-contain rounded-md border w-auto"
                    />
                  ) : (
                    <div className="mt-2">
                      <Signature />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-md rounded-lg px-4 py-2"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Template"}
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <Label className="font-semibold text-emerald-700">Live Preview</Label>
          <div className="mt-3">
            <TemplatePreview templateDraft={{ ...template, signatories }} />
          </div>
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
  <div className="space-y-4 px-4 sm:px-6">
    <h3 className="text-base sm:text-lg font-bold text-emerald-700">
      Certificates Pending Approval
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {certs.map((c) => (
        <Card
          key={c._id}
          className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 shadow-md border border-gray-200 rounded-xl bg-white hover:shadow-lg transition"
        >
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base break-words">
              {c.courseTitle}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 break-words">
              Student: {c.studentName}
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1 sm:flex-initial"
              onClick={() => handleReject(c._id)}
            >
              Reject
            </Button>
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
  <div className="p-4 sm:p-6 md:p-8 space-y-8 sm:space-y-10 min-h-screen bg-gradient-to-br from-emerald-400 to-green-600">
    <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
      🎓 Certificate Management
    </h1>

    <div className="mt-6 sm:mt-8">
      <EditTemplate template={selectedTemplate} onUpdated={handleTemplateUpdated} />
    </div>

    <div className="mt-6 sm:mt-8">
      <PendingCertificates />
    </div>
  </div>
);

}
