// src/components/SubmitExam.jsx
import React, { useState } from "react";
import { submitExam } from "../../api/api";
import ElevatedCard from "../ui/ElevatedCard";
import { Input } from "../ui/Field";
import CustomButton from "../ui/CustomButton";

export default function SubmitExam({ courseId }) {
  const [answers, setAnswers] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await submitExam(courseId, { templateId, answers });
    setResult(res.data);
  };

return (
  <ElevatedCard
    title="Submit Exam"
    subtitle="Enter your exam details and submit answers"
  >
    <div className="space-y-4">
      <Input
        placeholder="Template ID"
        value={templateId}
        onChange={(e) => setTemplateId(e.target.value)}
        className="w-full"
      />

      <div>
        <CustomButton
          label={"Submit"}
          onClick={handleSubmit}
          className={"w-full sm:w-auto bg-black"}
        />
      </div>

      {result && (
        <div className="mt-4 border rounded-xl p-4 bg-green-50 dark:bg-green-900/20 space-y-1 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Score:</span> {result.score}%
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {result.passed ? "✅ Passed" : "❌ Failed"}
          </p>
          {result.certificateId && (
            <p>
              <span className="font-semibold">Certificate:</span>{" "}
              {result.certificateId}
            </p>
          )}
        </div>
      )}
    </div>
  </ElevatedCard>
);

}
