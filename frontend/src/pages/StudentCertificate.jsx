 import React, { useEffect, useState } from "react";
import { getCertificates } from "../api/api"; // adjust path if needed
import { Card, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";

const StudentCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

const downloadCertificate = async (id) => {
  try {
    const token = localStorage.getItem("token"); // your stored JWT

    if (!token) {
  alert("You are not logged in");
  return;
} 

    const res = await fetch(`http://localhost:5000/api/certificates/my/download/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text(); // for debugging
      throw new Error(text || "Download failed");
    }

    // convert response to blob
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    // create temporary link and click it
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}.pdf`; // set filename
    document.body.appendChild(a);
    a.click();
    a.remove();

    // free memory
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Certificate download error:", err);
    alert("Failed to download certificate. Check console.");
  }
};



  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await getCertificates();
        console.log(res.data.certificates,"certificates");
        
        setCertificates(res.data.certificates); // assumes backend returns array
        console.log(certificates,"all here");
        
      } catch (err) {
        console.error("Error fetching certificates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  if (loading) return <p>Loading certificates...</p>;

  if (certificates.length === 0) return <p>No certificates available.</p>;

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {certificates.map((cert) => (
      <Card key={cert._id} className="shadow-md rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">
            {cert.courseTitle}
          </h3>
          <p className="text-sm text-gray-700 mt-1 break-words">
            Student: {cert.studentName}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Status:{" "}
            <span
              className={`font-medium ${
                cert.status === "approved"
                  ? "text-green-700"
                  : cert.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {cert.status}
            </span>
          </p>
          {cert.pdfUrl && (
            <Button
              onClick={() => downloadCertificate(cert._id)}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow transition"
            >
              Download Certificate
            </Button>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);

};

export default StudentCertificate;
