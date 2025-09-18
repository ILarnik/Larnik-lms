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
        console.log(couponsRes.data);
        

      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <div id="main" className="bg-[#F3F8F4] mt-1 p-20">
        <div className="grid grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE - text area */}
          <div className="text-black text-left pt-10 space-y-6">
            <div className="absolute top-20 left-30 backdrop-blur-lg bg-white pl-3 pr-3 pt-1 pb-1 rounded-lg flex items-center gap-3 shadow-xl">
              <div>
                <p className="text-green-800 text-xs opacity-80">Revolutionary Learning Platform</p>
              </div>
            </div>

            <h1 className="text-7xl font-bold">Where You</h1>
            <h1 className="text-7xl font-bold text-green-700">Learn</h1>
            <h1 className="text-7xl font-bold">With Larnik</h1>

            <span>
              Experience the future of education with AI-powered <br />
              personalization, immersive content, and a global community of <br />
              passionate learners.
            </span>

            {/* button area */}
            <div className="flex gap-5">
              <button className="shadow border-black  h-10 bg-green-800 rounded-xl text-white flex items-center justify-center gap-1 w-1/3">
                Start Your Journey <ArrowRight size={20} />
              </button>
              <button className="shadow border-black w-48 h-10 bg-white rounded-xl text-black flex items-center justify-center gap-1">
                Watch Preview <Play color="black" size={20} />
              </button>
            </div>

            {/* icon + text area */}
            <div className="flex gap-10 mt-5">
              {/* Active Learners */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-[#2BCD7F] rounded-xl flex items-center justify-center">
                  <BookOpen color="white" size={32} />
                </div>
                <h1 className="text-black font-bold text-2xl pt-1">{stats.students}</h1>
                <span className="mt-2 text-center text-gray-500">Active Learners</span>
              </div>

              {/* Expert Courses */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-[#2898D4] rounded-xl flex items-center justify-center">
                  <Users color="white" size={32} />
                </div>
                <h1 className="text-black font-bold text-2xl pt-1">{stats.courses}</h1>
                <span className="mt-2 text-center text-gray-500">Expert Courses</span>
              </div>

              {/* Teachers count */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-[#E862C0] rounded-xl flex items-center justify-center">
                  <Award color="white" size={32} />
                </div>
                <h1 className="text-black font-bold text-2xl pt-1">{stats.teachers}</h1>
                <span className="mt-2 text-center text-gray-500">Expert Teachers</span>
              </div>

              {/* Static Success Rate */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-[#FB7D28] rounded-xl flex items-center justify-center">
                  <Star color="white" size={32} />
                </div>
                <h1 className="text-black font-bold text-2xl pt-1">95%</h1>
                <span className="mt-2 text-center text-gray-500">Success Rate</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - image */}
          <div className="relative w-[600px] h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop&crop=center"
              alt="Sample"
              className="w-full h-full object-cover rounded-xl"
            />

            {/* Top rectangle glass block */}
            <div className="absolute -top-6 -left-6 backdrop-blur-lg bg-white/0 p-4 rounded-xl flex items-center gap-3  border border-white/50 shadow-xl">
              <div className="bg-green-600 w-10 h-10 flex items-center justify-center rounded-3xl">
                <BookOpen color="white" size={22} />
              </div>
              {/* <div>
                <p className="text-black font-semibold text-xl">15,847</p>
                <p className="text-black text-xs opacity-80">Courses Completed Today</p>
              </div> */}
            </div>

            {/* Bottom rectangle glass block */}
            <div className="absolute -bottom-6 -right-8 backdrop-blur-lg bg-white/0 p-4 rounded-xl flex items-center gap-3 shadow-lg border border-white/20">
              <div className="relative w-32 h-10">
                <div className="absolute left-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <User color="white" size={20} />
                </div>
                <div className="absolute left-8 w-10 h-10 bg-[#DF44BD] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Users color="white" size={20} />
                </div>
                <div className="absolute left-16 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Users color="white" size={20} />
                </div>
                <div className="absolute left-24 w-10 h-10 bg-[#DF44BD] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Users color="white" size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-black font-bold text-lg">3,429</h3>
                <p className="text-black text-xs">Learning Right Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons Section */}
      {coupons.length > 0 && (        
        <div className="p-2 bg-green-200">
          <h2 className="text-5xl font-bold text-center">Available Coupons</h2>
          <div className="flex gap-5 flex-wrap justify-center">
            {coupons.map((coupon) => (
              <div key={coupon._id} className="mt-4 bg-white shadow-md rounded-lg w-full text-center">
                {/* <h3 className="font-bold text-lg">{coupon.code}</h3> */}
                {/* <p className="text-gray-600 mt-2">{coupon.discount}% Off</p> */}
                <h2 className="bg-red-300 text-3xl">Use code <section className="bg-green-400 inline-block text-5xl">{coupon.couponName}</section> to avail <section className="bg-green-400 inline-block text-5xl">{coupon.discountValue}</section>% discount</h2>
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
