import { BookOpen, Users } from "lucide-react";
import React from "react";

export default function TimelineCard() {
  const ArrayData = [
    {
      icon: Users,
      year: "2020",
      title: "Founded",
      description: "Larnik was born from a vision to revolutionize online education",
    },
    
    
  ];


return (
  <section className="py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center pt-6">Time line</h2>
      <hr className="my-6 border-gray-200" />
      <h3 className="text-xl sm:text-2xl md:text-3xl text-center mb-4">
        From Soil to Market: Your Agricultural Learning Journey
      </h3>

      <p className="text-center text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mb-8 px-2 leading-relaxed">
        Our interactive timeline guides learners step-by-step through the full agricultural curriculum — from foundational soil science and seed selection to advanced crop management, sustainable practices, post-harvest processing and market access. Each milestone shows the module goals, estimated effort, hands-on field tasks, assessments and certifications, plus real-world projects and expert webinars. Progress is tracked with badges and checkpoints so students and instructors can see skill growth at a glance, pick up where they left off, and follow clear pathways toward practical outcomes like farm management, extension work, or agribusiness opportunities.
      </p>

      <div className="space-y-8">
        {ArrayData.map((item, index) => {
          const Icon = item.icon;
          return (
            <article
              key={index}
              className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-5 items-start">
                {/* Icon + Year */}
                <div className="sm:col-span-1 flex items-start">
                  <div className="flex flex-col items-center">
                    <div className="bg-green-800 w-12 h-12 flex items-center justify-center rounded-2xl">
                      {/* ensure Icon renders with a sensible size */}
                      <Icon className="text-white" size={20} />
                    </div>
                    <span className="mt-3 text-xs font-semibold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="sm:col-span-5">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

}
