 import { Award, BookOpen, Brain, Globe, Rocket, Stars, Target, Trophy, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardDesign from "../components/CradDesign";
import { getApproveCourses, getStudents, getTeachers } from "../api/api";
import CustomButton from "../components/ui/CustomButton";

export default function AboutPage() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
  });

  const img = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face";
  const name = "Michael Chen";
  const subTitle = "CTO & Co-Founder";
  const description = "Technology leader who previously built learning platforms for millions of students.";
  const coreTitle = "Misson Driven";
  const coreDes = "Democratizing quality education and making learning accessible to everyone, everywhere.";
  const coreIcon = Target;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const studentsRes = await getStudents();
        const coursesRes = await getApproveCourses();
        const teachersRes = await getTeachers();

        setStats({
          students: studentsRes.data.length,
          courses: coursesRes.data.length,
          instructors: teachersRes.data.length,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

 return (
  <>
    {/* Top section */}
    <section className="bg-gray-50 py-12 px-6 sm:py-16 sm:px-16">
      <div className="bg-lime-100 inline-block px-4 py-1 rounded-full shadow-xl mx-auto">
        <div className="text-green-700 flex justify-center items-center text-xs gap-1">
          <Stars color="green" size={16} />
          <span>Transforming Education Since 2020</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-5">
        <h1 className="font-bold text-3xl sm:text-6xl text-black">About</h1>
        <h1 className="font-bold text-3xl sm:text-6xl text-green-700">Larnik</h1>
      </div>

      <div className="mt-5 flex flex-col justify-center w-full items-center px-2 text-center max-w-3xl mx-auto">
        <span className="text-black text-sm sm:text-base">
          We're on a mission to democratize quality education and empower learners worldwide
        </span>
        <span className="text-black text-sm sm:text-base">through innovative technology and exceptional teaching.</span>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        <div className="flex justify-center gap-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-xl w-full max-w-xs">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users size={32} color="blue" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-3">{stats.students}</p>
            <span className="text-sm text-black">Active Students</span>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-xl w-full max-w-xs">
            <div className="bg-green-100 p-3 rounded-full">
              <BookOpen size={32} color="green" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-3">{stats.courses}</p>
            <span className="text-sm text-black">Courses Available</span>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-xl w-full max-w-xs">
            <div className="bg-purple-100 p-3 rounded-full">
              <Award size={32} color="purple" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black mt-3">{stats.instructors}</p>
            <span className="text-sm text-black">Expert Instructors</span>
          </div>
        </div>
      </div>
    </section>

    {/* Our Story */}
    <section className="bg-slate-300 py-10 px-6 sm:py-16 sm:px-16">
      <div className="mt-8 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center max-w-6xl mx-auto">
        <div>
          <div className="w-fit bg-blue-100 flex items-center gap-2 justify-center p-1 rounded-full shadow-sm">
            <Brain color="blue" size={18} />
            <span className="text-blue-800 font-medium text-sm">Our Story</span>
          </div>

          <div className="mt-5">
            <h1 className="text-black font-bold text-2xl md:text-3xl text-left">Reimagining Education for the Digital Age</h1>
            <p className="text-gray-500 text-left text-sm md:text-base pt-4 leading-relaxed">
              Founded in 2020 by a team of passionate educators and technologists,
              Larnik emerged from a simple observation: traditional education wasn't keeping pace with the rapidly evolving world.
              <br className="hidden md:block" />
              <br className="hidden md:block" />
              We believed that learning should be accessible, engaging, and tailored to individual needs.
              This vision drove us to create a platform that combines cutting-edge technology with proven pedagogical principles.
              <br className="hidden md:block" />
              <br className="hidden md:block" />
              Today, we're proud to serve over 50,000 students across 150+ countries, offering world-class education that adapts to each learner's unique journey.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-8 sm:pt-14">
            <CustomButton className={"bg-black w-full sm:w-auto"}>
              <Rocket color="white" size={16} className="inline-block" />
              <span className="ml-2">Join Us</span>
            </CustomButton>

            <Link to="/blogs" className="w-full sm:w-auto">
              <CustomButton label={"Read Blogs"} className={"bg-black w-full sm:w-auto"} />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full flex justify-center">
          <img
            className="object-cover rounded-xl w-full max-w-[600px] h-auto sm:h-[300px]"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center"
            alt="Our Story"
          />
          <div className="flex gap-4 absolute bottom-4 right-4 md:-bottom-6 md:-right-6 bg-white/30 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg w-56 md:w-64">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Trophy color="white" />
            </div>
            <div>
              <h3 className="text-left text-lg font-semibold text-white">98% Success</h3>
              <p className="text-sm text-left text-white/80">Rate Student Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <div className="p-6 sm:p-10 flex flex-col items-center justify-center gap-5">
      <div className="w-full max-w-3xl flex flex-col items-center justify-center">
        <h1 className="text-black font-bold text-2xl sm:text-3xl">Our Core Values</h1>
        <p className="text-black pt-4 sm:pt-5 font-semibold text-center text-sm sm:text-base">
          The principles that guide everything we do and shape our commitment to learners worldwide.
        </p>
      </div>

      <div className="flex flex-row gap-5 flex-wrap justify-center mt-4">
        <div className="w-full sm:w-64">
          <CardDesign variant="values" height="h-72" width="w-full" title={coreTitle} description={coreDes} icon={coreIcon} iconbgColor="bg-blue-600" />
        </div>
        <div className="w-full sm:w-64">
          <CardDesign variant="values" height="h-72" width="w-full" title={coreTitle} description={coreDes} icon={coreIcon} iconbgColor="bg-blue-600" />
        </div>
        <div className="w-full sm:w-64">
          <CardDesign variant="values" height="h-72" width="w-full" title={coreTitle} description={coreDes} icon={coreIcon} iconbgColor="bg-blue-600" />
        </div>
        <div className="w-full sm:w-64">
          <CardDesign variant="values" height="h-72" width="w-full" title={coreTitle} description={coreDes} icon={coreIcon} iconbgColor="bg-blue-600" />
        </div>
      </div>
    </div>

    {/* Team */}
    <div className="p-6 sm:p-10 flex flex-col items-center justify-center gap-5">
      <div className="w-full max-w-3xl flex flex-col items-center justify-center">
        <h1 className="text-black font-bold text-2xl sm:text-3xl">Meet Our Team</h1>
        <p className="text-gray-500 pt-4 sm:pt-5 font-semibold text-center text-sm sm:text-base">
          The passionate individuals behind Larnik's mission to transform education.
        </p>
      </div>

      <div className="flex flex-row gap-5 flex-wrap justify-center mt-4">
        <div className="w-full sm:w-[260px]">
          <CardDesign variant="profile" img={img} title={name} subsTitle={subTitle} description={description} btnName="Connect" height="h-[320px]" />
        </div>
        <div className="w-full sm:w-[260px]">
          <CardDesign variant="profile" img={img} title={name} subsTitle={subTitle} description={description} btnName="Connect" height="h-[320px]" />
        </div>
        <div className="w-full sm:w-[260px]">
          <CardDesign variant="profile" img={img} title={name} subsTitle={subTitle} description={description} btnName="Connect" height="h-[320px]" />
        </div>
        <div className="w-full sm:w-[260px]">
          <CardDesign variant="profile" img={img} title={name} subsTitle={subTitle} description={description} btnName="Connect" height="h-[320px]" />
        </div>
      </div>
    </div>
  </>
);

}
