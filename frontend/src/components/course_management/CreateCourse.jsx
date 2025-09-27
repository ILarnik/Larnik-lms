import React, { useState } from "react";
import { createCourse, addModule } from "../../api/api";
import ElevatedCard from "../ui/ElevatedCard";
import { Label, Input, Textarea, HelpText, ErrorText } from "../ui/Field";

export default function CourseBuilderPage() {
  // Course state
  const [courseForm, setCourseForm] = useState({
    category: "",
    subCategory: "",
    title: "",
    description: "",
    duration: "",
    targetAudience: "",
    prerequisites: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [createdCourseId, setCreatedCourseId] = useState(null);

  // Module state
  const [moduleTitle, setModuleTitle] = useState("");
  const [modulesList, setModulesList] = useState([]);

  // Handle course input
  const handleCourseChange = (e) =>
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });

  // Create course
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setOkMsg("");
    try {
      const payload = {
        ...courseForm,
        tags: courseForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      const res = await createCourse(payload);
      const newCourse = res.data; // make sure API returns course object with _id
      setCreatedCourseId(newCourse._id);
      setOkMsg("Course created successfully! You can now add modules.");
      setCourseForm({
        category: "",
        subCategory: "",
        title: "",
        description: "",
        duration: "",
        targetAudience: "",
        prerequisites: "",
        tags: "",
      });
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  // Add module
  const handleAddModule = async () => {
    if (!moduleTitle) return alert("Module title is required");
    try {
      const res = await addModule(createdCourseId, { title: moduleTitle });
      const newModule = res.data; // adjust based on API
      setModulesList([...modulesList, newModule]);
      setModuleTitle("");
    } catch (err) {
      console.error(err);
      alert("Failed to add module");
    }
  };

return (
  <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">
    {/* Create Course */}
    {!createdCourseId && (
      <ElevatedCard
        title="Create a New Course"
        subtitle="Fill the details to create a course. Approval flow applies automatically."
      >
        <form onSubmit={handleCreateCourse} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>
              <Input
                name="category"
                value={courseForm.category}
                onChange={handleCourseChange}
                placeholder="e.g., Programming"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label>Sub Category *</Label>
              <Input
                name="subCategory"
                value={courseForm.subCategory}
                onChange={handleCourseChange}
                placeholder="e.g., Web Development"
                required
                className="w-full"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Course Title *</Label>
              <Input
                name="title"
                value={courseForm.title}
                onChange={handleCourseChange}
                placeholder="Fullstack MERN from Zero to Pro"
                required
                className="w-full"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description *</Label>
              <Textarea
                name="description"
                value={courseForm.description}
                onChange={handleCourseChange}
                placeholder="What will learners achieve? Who is this for?"
                required
                className="w-full min-h-[120px] resize-vertical"
              />
              <HelpText>Keep it concise and outcome-focused.</HelpText>
            </div>
            <div>
              <Label>Duration *</Label>
              <Input
                name="duration"
                value={courseForm.duration}
                onChange={handleCourseChange}
                placeholder="e.g., 8 weeks"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label>Tags</Label>
              <Input
                name="tags"
                value={courseForm.tags}
                onChange={handleCourseChange}
                placeholder="mern, react, node"
                className="w-full"
              />
              <HelpText>Used for search & discovery.</HelpText>
            </div>
          </div>

          <ErrorText>{err}</ErrorText>
          {okMsg && (
            <p className="text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              {okMsg}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {loading ? "Creating…" : "Create Course"}
            </button>
          </div>
        </form>
      </ElevatedCard>
    )}

    {/* Add Modules */}
    {createdCourseId && (
      <ElevatedCard title="Add Modules" subtitle="Add multiple modules to your course">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Input
            placeholder="Module Title"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            className="flex-1 w-full"
          />
          <button
            onClick={handleAddModule}
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
          >
            Add Module
          </button>
        </div>

        {modulesList.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Modules Added:</h3>
            <ul className="list-disc list-inside space-y-1">
              {modulesList.map((mod, idx) => (
                <li key={idx} className="break-words">
                  {mod.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </ElevatedCard>
    )}
  </div>
);

}
