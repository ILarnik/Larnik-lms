 // src/pages/Home.jsx
import { useState, useEffect } from "react";
import { ArrowRight, Award, BookOpen, Play, Star, User, Users } from 'lucide-react';
import TimelineCard from '../components/TimelineCard';
import DiscountBar from '../components/DiscountBar';
import TrustedPatners from '../components/TrustedPatner';
import SubscriptionPlans from '../components/SubscriptionPlans';
import DownloadApp from '../components/DownloadApp';
import { getApproveCourses, getStudents, getTeachers, getCoupons } from '../api/api'; // add coupons
import CoursePage from "./CoursePage";

export default function HomePage() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    teachers: 0,
  });

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const studentsRes = await getStudents();
        const coursesRes = await getApproveCourses();
        const teachersRes = await getTeachers();
        const couponsRes = await getCoupons();

        setStats({
          students: studentsRes.data.length,
          courses: coursesRes.data.length,
          teachers: teachersRes.data.length,
        });

        setCoupons(couponsRes.data); // store coupon list
        // console.log(couponsRes.data);
        

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, []);

 return (
  <>
    <div id="main" className="bg-[#F3F8F4] mt-1 px-4 sm:px-8 md:px-12 lg:px-20 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* LEFT SIDE - text area */}
        <div className="text-black text-left pt-6 sm:pt-10 space-y-6 relative">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 backdrop-blur-lg bg-white px-3 py-1 rounded-lg flex items-center gap-3 shadow-xl">
            <p className="text-green-800 text-xs sm:text-sm opacity-80">Revolutionary Learning Platform</p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">Where You</h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-700 leading-tight">Learn</h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">With Larnik</h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            Experience the future of education with AI-powered personalization, immersive content, and a global
            community of passionate learners.
          </p>

          {/* button area */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <button className="w-full sm:w-1/3 h-10 bg-green-800 rounded-xl text-white flex items-center justify-center gap-1 shadow">
              Start Your Journey <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-48 h-10 bg-white rounded-xl text-black flex items-center justify-center gap-1 shadow">
              Watch Preview <Play color="black" size={20} />
            </button>
          </div>

          {/* icon + text area */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10 mt-6">
            {/* Active Learners */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#2BCD7F] rounded-xl flex items-center justify-center">
                <BookOpen color="white" size={28} />
              </div>
              <h1 className="text-black font-bold text-xl sm:text-2xl pt-1">{stats.students}</h1>
              <span className="mt-1 text-center text-gray-500 text-sm">Active Learners</span>
            </div>

            {/* Expert Courses */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#2898D4] rounded-xl flex items-center justify-center">
                <Users color="white" size={28} />
              </div>
              <h1 className="text-black font-bold text-xl sm:text-2xl pt-1">{stats.courses}</h1>
              <span className="mt-1 text-center text-gray-500 text-sm">Expert Courses</span>
            </div>

            {/* Teachers count */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#E862C0] rounded-xl flex items-center justify-center">
                <Award color="white" size={28} />
              </div>
              <h1 className="text-black font-bold text-xl sm:text-2xl pt-1">{stats.teachers}</h1>
              <span className="mt-1 text-center text-gray-500 text-sm">Expert Teachers</span>
            </div>

            {/* Static Success Rate */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#FB7D28] rounded-xl flex items-center justify-center">
                <Star color="white" size={28} />
              </div>
              <h1 className="text-black font-bold text-xl sm:text-2xl pt-1">95%</h1>
              <span className="mt-1 text-center text-gray-500 text-sm">Success Rate</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - image */}
        <div className="relative w-full max-w-[600px] h-[300px] sm:h-[400px] md:h-[500px] mx-auto">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop&crop=center"
            alt="Sample"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Top rectangle glass block */}
          <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 backdrop-blur-lg bg-white/10 p-3 sm:p-4 rounded-xl flex items-center gap-3 border border-white/50 shadow-xl">
            <div className="bg-green-600 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-3xl">
              <BookOpen color="white" size={20} />
            </div>
          </div>

          {/* Bottom rectangle glass block */}
          <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-8 backdrop-blur-lg bg-white/10 p-3 sm:p-4 rounded-xl flex items-center gap-3 shadow-lg border border-white/20">
            <div className="relative w-28 sm:w-32 h-10">
              <div className="absolute left-0 w-8 sm:w-10 h-8 sm:h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <User color="white" size={18} />
              </div>
              <div className="absolute left-6 sm:left-8 w-8 sm:w-10 h-8 sm:h-10 bg-[#DF44BD] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Users color="white" size={18} />
              </div>
              <div className="absolute left-12 sm:left-16 w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Users color="white" size={18} />
              </div>
              <div className="absolute left-18 sm:left-24 w-8 sm:w-10 h-8 sm:h-10 bg-[#DF44BD] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Users color="white" size={18} />
              </div>
            </div>
            <div>
              <h3 className="text-black font-bold text-base sm:text-lg">3,429</h3>
              <p className="text-black text-xs sm:text-sm">Learning Right Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Coupons Section */}
    {coupons.length > 0 && (
      <div className="px-4 sm:px-8 py-8 bg-green-200">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center">Available Coupons</h2>
        <div className="flex gap-4 sm:gap-5 flex-wrap justify-center">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="mt-4 bg-white shadow-md rounded-lg w-full sm:w-auto px-4 py-6 text-center"
            >
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold">
                Use code{" "}
                <span className="bg-green-400 px-2 py-1 rounded text-xl sm:text-3xl lg:text-4xl font-bold">
                  {coupon.couponName}
                </span>{" "}
                to avail{" "}
                <span className="bg-green-400 px-2 py-1 rounded text-xl sm:text-3xl lg:text-4xl font-bold">
                  {coupon.discountValue}%
                </span>{" "}
                discount
              </h2>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* <DiscountBar /> */}
    <TimelineCard />
    <TrustedPatners />
    {/* <SubscriptionPlans /> */}
    <CoursePage />
    <DownloadApp />
  </>
);

}
