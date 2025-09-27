// src/components/ManageModules.jsx
import React, { useState } from "react";
import { addModule, addVideo, addNotes, addMcqs } from "../../api/api";
import ElevatedCard from "../ui/ElevatedCard";
import { Label, Input } from "../ui/Field";
import CustomButton from "../ui/CustomButton";

export default function ManageModules({ courseId }) {
  const [moduleTitle, setModuleTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [notes, setNotes] = useState(null);
  const [mcqs, setMcqs] = useState([{ question: "", options: [], correctAnswer: "" }]);

  // Add Module
  const handleAddModule = async () => {
    await addModule(courseId, { title: moduleTitle });
    setModuleTitle("");
  };

  const handleAddVideo = async (moduleId) => {
    const formData = new FormData();
    formData.append("title", "Intro Video");
    formData.append("order", 1);
    formData.append("video", video);
    await addVideo(courseId, moduleId, formData);
  };

  const handleAddNotes = async (moduleId) => {
    const formData = new FormData();
    formData.append("notes", notes);
    await addNotes(courseId, moduleId, formData);
  };

  const handleAddMcqs = async (moduleId) => {
    await addMcqs(courseId, moduleId, mcqs);
  };

return (
  <ElevatedCard
    title="Manage Modules"
    subtitle="Add modules, videos, notes & MCQs to your course"
  >
    {/* Add Module */}
    <div className="space-y-6 px-2 sm:px-4">
      <div>
        <Label>Module Title</Label>
        <Input
          placeholder="e.g., Introduction"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
          className="w-full"
        />
        <div className="mt-3">
          <CustomButton
            onClick={handleAddModule}
            className="w-full sm:w-auto bg-blue-600"
            label={"Add Module"}
          />
        </div>
      </div>

      {/* Upload Video */}
      <div>
        <Label>Upload Video</Label>
        <Input
          type="file"
          onChange={(e) => setVideo(e.target.files[0])}
          className="w-full"
        />
        <div className="mt-3">
          <CustomButton
            onClick={() => handleAddVideo("<moduleId_here>")}
            className="w-full sm:w-auto bg-blue-600"
            label={"Upload Video"}
          />
        </div>
      </div>

      {/* Upload Notes */}
      <div>
        <Label>Upload Notes</Label>
        <Input
          type="file"
          onChange={(e) => setNotes(e.target.files[0])}
          className="w-full"
        />
        <div className="mt-3">
          <CustomButton
            onClick={() => handleAddNotes("<moduleId_here>")}
            className="w-full sm:w-auto bg-blue-600"
            label={"Upload Notes"}
          />
        </div>
      </div>

      {/* Add MCQs */}
      <div>
        <div className="mt-1">
          <CustomButton
            onClick={() => handleAddMcqs("<moduleId_here>")}
            className="w-full sm:w-auto bg-blue-600"
            label={"Add MCQs"}
          />
        </div>
      </div>
    </div>
  </ElevatedCard>
);

}
