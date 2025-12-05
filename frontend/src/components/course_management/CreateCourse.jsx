import React, { useState } from "react";
import { createCourse, addModule } from "../../api/api";
import ElevatedCard from "../ui/ElevatedCard";
import { Label, Input, Textarea, HelpText, ErrorText, Select } from "../ui/Field";
import ExamBuilder from "./ExamBuilder"; // You'll need to create this component

export default function CourseBuilderPage() {
  // Predefined categories for better UX
  const categories = [
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "data-science", label: "Data Science" },
    { value: "personal-development", label: "Personal Development" },
  ];

  const subCategories = {
    programming: [
      { value: "web-development", label: "Web Development" },
      { value: "mobile-development", label: "Mobile Development" },
      { value: "game-development", label: "Game Development" },
      { value: "devops", label: "DevOps" },
      { value: "cybersecurity", label: "Cybersecurity" },
    ],
    design: [
      { value: "ui-ux", label: "UI/UX Design" },
      { value: "graphic-design", label: "Graphic Design" },
      { value: "3d-animation", label: "3D & Animation" },
    ],
    business: [
      { value: "entrepreneurship", label: "Entrepreneurship" },
      { value: "management", label: "Management" },
      { value: "finance", label: "Finance" },
    ],
    marketing: [
      { value: "digital-marketing", label: "Digital Marketing" },
      { value: "social-media", label: "Social Media Marketing" },
      { value: "content-marketing", label: "Content Marketing" },
    ],
    "data-science": [
      { value: "machine-learning", label: "Machine Learning" },
      { value: "data-analysis", label: "Data Analysis" },
      { value: "big-data", label: "Big Data" },
    ],
    "personal-development": [
      { value: "leadership", label: "Leadership" },
      { value: "productivity", label: "Productivity" },
      { value: "communication", label: "Communication" },
    ],
  };

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
    level: "beginner",
    language: "english",
    price: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [createdCourseId, setCreatedCourseId] = useState(null);

  // Module state
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [modulesList, setModulesList] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  // Exam/Assignment state
  const [showExamBuilder, setShowExamBuilder] = useState(false);
  const [examType, setExamType] = useState(""); // "quiz", "test", "assignment"
  const [showExamTypeModal, setShowExamTypeModal] = useState(false);

  // Handle course input
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseForm({ ...courseForm, [name]: value });
    
    // Reset subCategory when category changes
    if (name === "category") {
      setCourseForm(prev => ({ ...prev, subCategory: "" }));
    }
  };

  // Validation function
  const validateCourseForm = () => {
    const requiredFields = ["category", "subCategory", "title", "description", "duration"];
    const missingFields = requiredFields.filter(field => !courseForm[field].trim());
    
    if (missingFields.length > 0) {
      return `Please fill in all required fields: ${missingFields.join(", ")}`;
    }
    
    if (courseForm.title.length < 10) {
      return "Course title should be at least 10 characters long";
    }
    
    if (courseForm.description.length < 50) {
      return "Description should be at least 50 characters long";
    }
    
    return null;
  };

  // Create course
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    
    const validationError = validateCourseForm();
    if (validationError) {
      setErr(validationError);
      return;
    }
    
    setLoading(true);
    setErr("");
    setOkMsg("");
    
    try {
      const payload = {
        ...courseForm,
        tags: courseForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
        price: courseForm.price ? parseFloat(courseForm.price) : 0,
      };
      
      const res = await createCourse(payload);
      const newCourse = res.data;
      setCreatedCourseId(newCourse._id);
      setOkMsg("Course created successfully! You can now add modules.");
      
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message || "Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add module
  const handleAddModule = async () => {
    if (!moduleTitle.trim()) {
      setErr("Module title is required");
      return;
    }
    
    try {
      const moduleData = {
        title: moduleTitle.trim(),
        description: moduleDescription.trim(),
        order: modulesList.length + 1,
      };
      
      const res = await addModule(createdCourseId, moduleData);
      const newModule = res.data;
      setModulesList([...modulesList, newModule]);
      setModuleTitle("");
      setModuleDescription("");
      setErr("");
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to add module");
    }
  };

  // Remove module from list (local only, before saving to backend)
  const handleRemoveModule = (index) => {
    setModulesList(modulesList.filter((_, i) => i !== index));
  };

  // Handle module selection for exam/assignment
  const handleModuleSelect = (module, index) => {
    setSelectedModule({ ...module, index });
    setShowExamTypeModal(true);
  };

  // Start exam/assignment creation
  const handleStartExamCreation = (type) => {
    setExamType(type);
    setShowExamTypeModal(false);
    setShowExamBuilder(true);
  };

  // Finalize course
  const handleFinalizeCourse = () => {
    const courseData = {
      courseId: createdCourseId,
      modules: modulesList,
      totalModules: modulesList.length,
    };
    
    alert(`Course finalized successfully!\n\n• Course ID: ${createdCourseId}\n• Total Modules: ${modulesList.length}\n\nYou can now add content to each module.`);
    
    // You can redirect to course dashboard or show success screen
    // window.location.href = `/instructor/courses/${createdCourseId}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">
      {/* Create Course Section */}
      <ElevatedCard
        title="Create a New Course"
        subtitle="Fill the details to create a course. Approval flow applies automatically."
      >
        <form onSubmit={handleCreateCourse} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label>Category *</Label>
                <Select
                  name="category"
                  value={courseForm.category}
                  onChange={handleCourseChange}
                  required
                  className="w-full"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label>Sub Category *</Label>
                <Select
                  name="subCategory"
                  value={courseForm.subCategory}
                  onChange={handleCourseChange}
                  required
                  className="w-full"
                  disabled={!courseForm.category}
                >
                  <option value="">Select a sub-category</option>
                  {courseForm.category && subCategories[courseForm.category]?.map((subCat) => (
                    <option key={subCat.value} value={subCat.value}>
                      {subCat.label}
                    </option>
                  ))}
                </Select>
                <HelpText>
                  {!courseForm.category ? "Select a category first" : "Choose a relevant sub-category"}
                </HelpText>
              </div>

              <div>
                <Label>Course Title *</Label>
                <Input
                  name="title"
                  value={courseForm.title}
                  onChange={handleCourseChange}
                  placeholder="Fullstack MERN from Zero to Pro"
                  required
                  className="w-full"
                />
                <HelpText className={`text-xs ${courseForm.title.length < 10 ? 'text-red-500' : 'text-green-500'}`}>
                  {courseForm.title.length}/10 characters minimum
                </HelpText>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Difficulty Level</Label>
                  <Select
                    name="level"
                    value={courseForm.level}
                    onChange={handleCourseChange}
                    className="w-full"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all-levels">All Levels</option>
                  </Select>
                </div>

                <div>
                  <Label>Language</Label>
                  <Select
                    name="language"
                    value={courseForm.language}
                    onChange={handleCourseChange}
                    className="w-full"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Duration *</Label>
                <Input
                  name="duration"
                  value={courseForm.duration}
                  onChange={handleCourseChange}
                  placeholder="e.g., 8 weeks, 40 hours"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Label>Price (₹)</Label>
                <Input
                  name="price"
                  type="number"
                  value={courseForm.price}
                  onChange={handleCourseChange}
                  placeholder="0 for free course"
                  className="w-full"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label>Description *</Label>
                <Textarea
                  name="description"
                  value={courseForm.description}
                  onChange={handleCourseChange}
                  placeholder="What will learners achieve? Who is this for? Course outline..."
                  required
                  className="w-full min-h-[150px] resize-vertical"
                />
                <HelpText className={`text-xs ${courseForm.description.length < 50 ? 'text-red-500' : 'text-green-500'}`}>
                  {courseForm.description.length}/50 characters minimum
                </HelpText>
              </div>

              <div>
                <Label>Target Audience</Label>
                <Textarea
                  name="targetAudience"
                  value={courseForm.targetAudience}
                  onChange={handleCourseChange}
                  placeholder="Who should take this course? e.g., Beginners, Professionals switching careers..."
                  className="w-full min-h-[80px] resize-vertical"
                />
              </div>

              <div>
                <Label>Prerequisites</Label>
                <Textarea
                  name="prerequisites"
                  value={courseForm.prerequisites}
                  onChange={handleCourseChange}
                  placeholder="What should learners know before starting? e.g., Basic JavaScript, HTML..."
                  className="w-full min-h-[80px] resize-vertical"
                />
              </div>

              <div>
                <Label>Tags</Label>
                <Input
                  name="tags"
                  value={courseForm.tags}
                  onChange={handleCourseChange}
                  placeholder="mern, react, node, mongodb, express"
                  className="w-full"
                />
                <HelpText>Comma separated. Used for search & discovery.</HelpText>
              </div>

              <div>
                <Label>Thumbnail URL</Label>
                <Input
                  name="thumbnail"
                  value={courseForm.thumbnail}
                  onChange={handleCourseChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full"
                />
                {courseForm.thumbnail && (
                  <div className="mt-2">
                    <img 
                      src={courseForm.thumbnail} 
                      alt="Preview" 
                      className="h-20 w-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150x100?text=Invalid+URL";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error and Success Messages */}
          {err && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <ErrorText>{err}</ErrorText>
            </div>
          )}
          
          {okMsg && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 font-medium">{okMsg}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-60 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Creating Course...
                </>
              ) : (
                "Create Course"
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                // Reset form
                setCourseForm({
                  category: "",
                  subCategory: "",
                  title: "",
                  description: "",
                  duration: "",
                  targetAudience: "",
                  prerequisites: "",
                  tags: "",
                  level: "beginner",
                  language: "english",
                  price: "",
                  thumbnail: "",
                });
                setErr("");
                setOkMsg("");
              }}
              className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Clear Form
            </button>
          </div>
        </form>
      </ElevatedCard>

      {/* Add Modules Section (Only shows after course creation) */}
      {createdCourseId && (
        <div className="space-y-6">
          {/* Add Modules Card */}
          <ElevatedCard title="Add Modules" subtitle="Add multiple modules to your course. Each module can contain multiple lessons, quizzes, and assignments.">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <Label>Module Title *</Label>
                    <Input
                      placeholder="e.g., Introduction to React"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label>Module Description</Label>
                    <Textarea
                      placeholder="Brief description of what this module covers..."
                      value={moduleDescription}
                      onChange={(e) => setModuleDescription(e.target.value)}
                      className="w-full min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={handleAddModule}
                    className="w-full bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-2"
                  >
                    <span>+ Add Module</span>
                  </button>
                </div>
              </div>

              {/* Modules List */}
              {modulesList.length > 0 ? (
                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Modules Added ({modulesList.length})</h3>
                        <p className="text-sm text-gray-600">Click on a module to add content</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-sm text-gray-500">
                          Total: {modulesList.length} module{modulesList.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {modulesList.map((mod, idx) => (
                      <div key={idx} className="p-4 hover:bg-gray-50 group">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                                {idx + 1}
                              </span>
                              <h4 className="font-medium text-lg">{mod.title}</h4>
                            </div>
                            {mod.description && (
                              <p className="text-sm text-gray-600 ml-8 mb-3">{mod.description}</p>
                            )}
                            <div className="ml-8 flex flex-wrap gap-2">
                              <button
                                onClick={() => handleModuleSelect(mod, idx)}
                                className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                              >
                                
                                Add Lesson
                              </button>
                              <button
                                onClick={() => handleModuleSelect(mod, idx)}
                                className="text-sm bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                              >
                                
                                Add Quiz
                              </button>
                              <button
                                onClick={() => handleModuleSelect(mod, idx)}
                                className="text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                              >
                                
                                Add Test
                              </button>
                              <button
                                onClick={() => handleModuleSelect(mod, idx)}
                                className="text-sm bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                              >
                                
                                Add Assignment
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                // Edit module
                                setModuleTitle(mod.title);
                                setModuleDescription(mod.description || "");
                                handleRemoveModule(idx);
                              }}
                              className="text-blue-500 hover:text-blue-700 p-1"
                              title="Edit module"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleRemoveModule(idx)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Remove module"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="mb-4 text-4xl">+</div>
                  <p className="text-lg mb-2">No modules added yet</p>
                  <p className="text-sm">Start by adding your first module above</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      // Import modules from template
                      alert("Import module templates feature coming soon!");
                    }}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    Import from Template
                  </button>
                  <button
                    onClick={() => {
                      // Duplicate existing modules
                      if (modulesList.length > 0) {
                        const lastModule = modulesList[modulesList.length - 1];
                        setModuleTitle(`Copy of ${lastModule.title}`);
                        setModuleDescription(lastModule.description || "");
                      }
                    }}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    Duplicate Last
                  </button>
                </div>
                
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      // Preview course structure
                      alert(`Course Preview:\n\n${modulesList.map((m, i) => `${i + 1}. ${m.title}`).join('\n')}`);
                    }}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
                  >
                    Preview Structure
                  </button>
                  <button
                    onClick={handleFinalizeCourse}
                    disabled={modulesList.length === 0}
                    className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                  >
                    <span>Submit</span>
                    Finalize Course Structure
                  </button>
                </div>
              </div>
            </div>
          </ElevatedCard>

          {/* Exam/Assignment Creation Modal */}
          {showExamTypeModal && selectedModule && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Add Content to Module</h3>
                  <button
                    onClick={() => setShowExamTypeModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Adding content to: <span className="font-semibold">{selectedModule.title}</span>
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleStartExamCreation("lesson")}
                    className="p-4 border-2 border-blue-200 rounded-xl text-center hover:bg-blue-50 transition-colors"
                  >
                    {/* <div className="text-3xl mb-2"></div> */}
                    <div className="font-medium">Lesson</div>
                    <div className="text-sm text-gray-500">Video/Text content</div>
                  </button>
                  
                  <button
                    onClick={() => handleStartExamCreation("quiz")}
                    className="p-4 border-2 border-green-200 rounded-xl text-center hover:bg-green-50 transition-colors"
                  >
                    {/* <div className="text-3xl mb-2"></div> */}
                    <div className="font-medium">Quiz</div>
                    <div className="text-sm text-gray-500">Short assessment</div>
                  </button>
                  
                  <button
                    onClick={() => handleStartExamCreation("test")}
                    className="p-4 border-2 border-purple-200 rounded-xl text-center hover:bg-purple-50 transition-colors"
                  >
                    {/* <div className="text-3xl mb-2"></div> */}
                    <div className="font-medium">Test</div>
                    <div className="text-sm text-gray-500">Comprehensive exam</div>
                  </button>
                  
                  <button
                    onClick={() => handleStartExamCreation("assignment")}
                    className="p-4 border-2 border-orange-200 rounded-xl text-center hover:bg-orange-50 transition-colors"
                  >
                    {/* <div className="text-3xl mb-2"></div> */}
                    <div className="font-medium">Assignment</div>
                    <div className="text-sm text-gray-500">Project submission</div>
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <button
                    onClick={() => setShowExamTypeModal(false)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Exam Builder Component */}
      {showExamBuilder && selectedModule && (
        <ExamBuilder
          courseId={createdCourseId}
          moduleId={selectedModule._id || selectedModule.id}
          moduleTitle={selectedModule.title}
          examType={examType}
          onClose={() => {
            setShowExamBuilder(false);
            setExamType("");
            setSelectedModule(null);
          }}
          onSave={() => {
            setShowExamBuilder(false);
            setExamType("");
            setSelectedModule(null);
            alert(`${examType.charAt(0).toUpperCase() + examType.slice(1)} added successfully to module!`);
          }}
        />
      )}
    </div>
  );
}