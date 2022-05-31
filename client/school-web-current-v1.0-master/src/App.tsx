import React, { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ItemsContainor from "./components/Object-Containor/Items-containor";
import SideBar from "./components/side-bar";
import TopBar from "./components/top-bar";
import ADDAnnouncemnt from "./pages/ADMIN/Annoucment/announcement";
import AllAnnouncment from "./pages/ADMIN/Annoucment/view-all-announcement";
import AddScholership from "./pages/ADMIN/Scholership/add-scholership";
import AllScholership from "./pages/ADMIN/Scholership/all-scholership";
import TimeTable from "./pages/ADMIN/time-table";
// import ViewStudentPerDepartment from "./pages/ADMIN/view-students-per-department";
import Singin from "./pages/auth/signin";
import StudentForm from "./pages/FORM/create-student-form";
import TeacherForm from "./pages/FORM/create-teacher";

import Profile from "./pages/STUDENT/profile";
import TeacherProfile from "./pages/TEACHER/profile";
import { CreateAccount } from "./pages/FORM/create-account";

import DashboardTeacherAttendance from "./pages/COURSE/attendance";
import DashboardTeacherMarkAttendance from "./pages/TEACHER/mark-attendance";
import DashboardTeacherAttendanceSummery from "./pages/TEACHER/view-attendance-summery";
import ViewIndividualCourseAttendance from "./pages/COURSE/view-individual-course-attendance";
import StudentCoursesAttendance from "./pages/STUDENT/student-courses";
import UpdateAttendance from "./pages/TEACHER/updateAttendance";
import { SearchStudent } from "./pages/ADMIN/search-student";
import { AddCourses } from "./pages/COURSE_REGISTRATION/add-new-course";
import { RegisterCourses } from "./pages/COURSE_REGISTRATION/register-course";
import { StudentRegisterCourses } from "./pages/COURSE_REGISTRATION/student-register-course";
import { StudentAllCourses } from "./pages/COURSE_REGISTRATION/view-all-course";
import { AddBatchSection } from "./pages/ADMIN/add-batch-section";
import { StudentIndividualAttendance } from "./pages/ADMIN/student-attendance";
import { VeiwTimeTable } from "./pages/TEACHER/view-timetable";
import { StudentTimeTable } from "./pages/STUDENT/view-timetble";
import { UseAccess } from "./CustomHook/userCheckAccess";
import { ErrorPage } from "./components/error";
import { Course } from "./pages/COURSE_REGISTRATION";
import { ViewStudentReg } from "./pages/STUDENT/view-reg";
import Dashboard from "./pages/ADMIN/Dashboard";
import DashboardStd from "./pages/STUDENT/Dashboard";
import DashboardTeacher from "./pages/TEACHER/Dashboard";

function App() {
  const [valid] = UseAccess();

  if (valid) {
    return <ErrorPage message={"Pay me the Fee"}></ErrorPage>;
  }

  return (
    // <div>
    //   <Singin />
    // </div>
    <>
      <Routes>
        <Route path="/" element={<Singin />}></Route>
        <Route path="/signin" element={<Singin />} />
        {/* Admin */}

        <Route path="/admin/course" element={<Course />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />


        <Route path="/admin/addannouncment" element={<ADDAnnouncemnt />} />
        <Route path="/admin/addstudent" element={<StudentForm />} />
        <Route path="/admin/addteacher" element={<TeacherForm />} />
        <Route path="/admin/searchstudent" element={<SearchStudent />} />
        <Route path="/admin/createAccount" element={<CreateAccount />} />

        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/allannouncment" element={<AllAnnouncment />} />
        <Route path="/admin/addsectionbatch" element={<AddBatchSection />} />

        <Route path="/admin/addscholership" element={<AddScholership />} />
        <Route path="/admin/allScholership" element={<AllScholership />} />
        <Route
          path="/admin/individualstudentattendance"
          element={<StudentIndividualAttendance />}
        />
        <Route
          path="/student/individualcourseattendance"
          element={<StudentIndividualAttendance />}
        />

        <Route path="/student/dashboard" element={<DashboardStd />} />


        <Route path="/admin/timetable" element={<TimeTable />} />

        <Route path="/admin/addCourse" element={<AddCourses />} />
        <Route path="/admin/registerCourse" element={<RegisterCourses />} />

        {/* Student */}
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/announcement" element={<AllAnnouncment />} />
        <Route path="/student/timeTable" element={<StudentTimeTable />} />

        {/* Teacher */}
        <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
        <Route
          path="/teacher/attendance"
          element={<DashboardTeacherAttendance />}
        />
        <Route path="/teacher/profile" element={<TeacherProfile />} />

        <Route
          path="/teacher/markattendance"
          element={<DashboardTeacherMarkAttendance />}
        />
        <Route
          path="/attendance/updateAttendance"
          element={<UpdateAttendance />}
        />
        <Route
          path="/teacher/attendanceSummery"
          element={<DashboardTeacherAttendanceSummery />}
        />
        <Route
          path="/teacher/individualcourseattendance"
          element={<ViewIndividualCourseAttendance />}
        />
        <Route path="/teacher/timeTable" element={<VeiwTimeTable />} />
        {/* Student */}
        <Route path="/student/courses" element={<StudentCoursesAttendance />} />
        <Route
          path="/student/StudentRegisterCourses"
          element={<StudentRegisterCourses />}
        />
        <Route path="/student/studentCourses" element={<ViewStudentReg />} />
        <Route
          path="/student/studentallcourses"
          element={<StudentAllCourses />}
        />
        {/* ViewIndividualCourseAttendance */}
      </Routes>
    </>
  );
}

export default App;
// TODO
