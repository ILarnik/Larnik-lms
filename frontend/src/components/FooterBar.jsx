import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function FooterBar() {
  const [year, setYear] = useState (2025);
  const [students, setStudents] = useState ('50K+');
  const [courses, setCourses] = useState ('1.2k');
  const [success, setSuccess] = useState ('96%');
return (
  <footer className="bg-gray-100 text-gray-700 pt-12">
    <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* Logo + Intro */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-green-600 p-2 rounded-full">
            <BookOpen color="white" />
          </div>
          <h1 className="ml-3 text-xl font-bold text-green-800">Larnik</h1>
        </div>
        <p className="text-sm mb-6 text-left">
          Empowering learners worldwide with cutting-edge technology, innovative
          animations, and personalized learning experiences.
        </p>
        <div className="flex gap-6 font-bold text-green-800">
          <div>
            <p className="text-lg">{students}</p>
            <span className="text-xs text-gray-500">Students</span>
          </div>
          <div>
            <p className="text-lg">{courses}</p>
            <span className="text-xs text-gray-500">Courses</span>
          </div>
          <div>
            <p className="text-lg">{success}</p>
            <span className="text-xs text-gray-500">Success</span>
          </div>
        </div>
      </div>

      {/* Platform */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-black">Platform</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/courses" className="hover:text-green-700">Courses</a></li>
          <li><a href="*" className="hover:text-green-700">Instructors</a></li>
          <li><a href="*" className="hover:text-green-700">Certificates</a></li>
          <li><a href="*" className="hover:text-green-700">For Business</a></li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-black">Support</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="*" className="hover:text-green-700">Help Center</a></li>
          <li><a href="/contact" className="hover:text-green-700">Contact Us</a></li>
          <li><a href="*" className="hover:text-green-700">System Status</a></li>
          <li><a href="*" className="hover:text-green-700">Community</a></li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-black">Company</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/about" className="hover:text-green-700">About</a></li>
          <li><a href="*" className="hover:text-green-700">Careers</a></li>
          <li><a href="*" className="hover:text-green-700">Privacy</a></li>
          <li><a href="*" className="hover:text-green-700">Terms</a></li>
        </ul>
      </div>
    </div>

    {/* Divider + Copyright */}
    <hr className="border-t border-gray-300 mt-10" />
    <div className="py-5 text-center text-sm text-gray-500">
      © {year} Larnik LMS. All rights reserved.
    </div>
  </footer>
);

}
