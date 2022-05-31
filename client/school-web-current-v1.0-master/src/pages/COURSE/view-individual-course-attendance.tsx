import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import React, { Dispatch, FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { topicByCourse } from "../../Api/topic";
import CourseDetial from "../../components/course-detials";
import { ErrorPage } from "../../components/error";
import PageContainor from "../../components/page-containor";
import { ADMIN, TEACHER } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";

const Table: FC<any> = ({ data, object }) => {
  console.log({ data });
  return (
    <table id="customers">
      <tr>
        <th className="w-[400px]">Topic</th>
        <th>Date</th>
        <th>View Detials</th>
      </tr>
      {data.map((el: any, key: any) => (
        <tr key={key}>
          <td>{el.descriptiopn}</td>
          <td>{el.date}</td>
          <td>
            <Link
              to="/attendance/updateAttendance"
              state={{ url: { ...object, date: el.date, topic_id: el._id } }}
              className="text-blue-500"
            >
              Link
            </Link>
          </td>
        </tr>
      ))}
    </table>
  );
};

const ViewIndividualCourseAttendance: FC = () => {
  const location: any = useLocation();
  let url: any = location?.state?.url;
  const course_detials = url?.courseObject;
  const { user } = getUser();
  const ROLE = user.role === ADMIN ? ADMIN : TEACHER;
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const getTopic = async () => {
      const data: any = await topicByCourse(course_detials?.course_id._id);
      setTopic(data?.topic);
    };
    getTopic();
  }, []);

  // course === topic.course

  // pass link date=attendace date and cours =attendacne course
  if (!location.state) {
    return <ErrorPage message="Please Select Batch Thank you"></ErrorPage>;
  }
  return (
    <PageContainor role={ROLE}>
      <>
        <div className="space-y-4">Mark-Attendamce</div>
        <CourseDetial
          title={"Computer Programming"}
          teacher="Numrash"
          creditHours="3"
        ></CourseDetial>

        <div className="mt-4 pl-4"></div>
        {/* <div className="px-4">
          <table id="customers">
            <tr>
              <th className="w-[400px]">Total Hours</th>
              <th>Present Hour</th>
              <th>View Detials</th>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div> */}

        <div className="pl-4">
          {/* <label className="block">Today Topic</label>
          <textarea
            id="w3review"
            name="w3review"
            rows={4}
            className="border-gray-300 border-2 w-full"
            value={"testing"}
            disabled
          ></textarea> */}

          {/* date and time picker */}
          <div className="flex justify-between items-center ">
            <div className="w-60 border-gray-300 border-2 p-3">
              {moment(new Date()).format("L")}
            </div>
            {/* if this checked add creidt to the user object */}
            {/* <RadioSet setCreditHour={setCreditHour}></RadioSet> */}

            {/* read student information and display in a table */}
          </div>
          <div className="mt-4">
            <Table data={topic} object={url}></Table>
          </div>
        </div>
      </>
    </PageContainor>
  );
};

export default ViewIndividualCourseAttendance;
