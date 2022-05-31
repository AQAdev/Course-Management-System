import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import React, { Dispatch, FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { getAttendaceAndTopic } from "../../Api/attendance";
import { topicByCourse } from "../../Api/topic";
import CourseDetial from "../../components/course-detials";
import { ErrorPage } from "../../components/error";
import PageContainor from "../../components/page-containor";
import { ADMIN, STUDENT, TEACHER } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";

const Table: FC<any> = ({ data, object }) => {
  return (
    <table id="customers">
      <tr>
        <th className="w-[400px]">Topic</th>
        <th>Date</th>
        <th>Total Credit Hours</th>
        <th>Present</th>
        <th>Absent</th>
      </tr>
      {data.map((el: any, key: any) => (
        <tr key={key}>
          <td>{el.topic?.descriptiopn}</td>
          <td>{el.date}</td>
          <td>3</td>
          <td>{el.creditHour}</td>
          <td>{3 - Number(el.creditHour)}</td>
          {/* <td>
            <Link
              to="/attendance/updateAttendance"
              state={{ url: { ...object, date: el.date, topic_id: el._id } }}
              className="text-blue-500"
            >
              Link
            </Link>
          </td> */}
        </tr>
      ))}
    </table>
  );
};

export const StudentIndividualAttendance: FC = () => {
  console.log("test");
  const location: any = useLocation();
  console.log({ location });

  let url: any = location?.state?.url;
  console.log({ location });
  const { user, user_information } = getUser();
  console.log({ user_information });
  const ROLE = user.role === STUDENT ? STUDENT : ADMIN;
  const [topic, setTopic] = useState([]);

  const [totalhours, setTotalHour] = useState("");
  const [presenthours, setPresentHour] = useState("");

  useEffect(() => {
    const getTopic = async () => {
      let newdata: any = "";
      // if student
      if (location?.state?.course_id) {
        newdata = await getAttendaceAndTopic(
          `courseSemester=${user_information.stdSemester}&course=${location?.state?.course_id}&student=${user_information?._id}`
        );
      } else {
        // if admin
        newdata = await getAttendaceAndTopic(
          `courseSemester=${url?.courseObject?.courseSemester}&course=${url?.courseObject?.course_id?._id}&student=${url?.courseObject?.students[0]._id}`
        );
      }

      setTopic(newdata?.attendance);
      const hours = newdata?.attendance;

      const totalhours = hours.reduce(
        (a: any, b: any) =>
          Number(a) +
          Number(
            location?.state?.hours
              ? location?.state?.hours
              : url?.courseObject?.course_id?.credit_hour
          ),
        0
      );

      setTotalHour(totalhours);
      const present = hours.reduce(
        (a: any, b: any) => Number(a) + Number(b?.creditHour),
        0
      );
      setPresentHour(present);
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
          title={url?.courseObject?.course_id?.course_title}
          teacher={url?.courseObject?.teacher?.tch_name}
          creditHours={
            location?.state?.hours
              ? location?.state?.hours * 1 + ""
              : url?.courseObject?.course_id?.credit_hour * 1 + ""
          }
        ></CourseDetial>

        <div className="mt-4 pl-4"></div>
        <div className="px-4">
          <table id="customers">
            <tr>
              <th className="w-[400px]">Total Hours</th>
              <th>Present Hour</th>
              <th>Absent</th>
            </tr>

            <tr>
              <td>{totalhours}</td>
              <td>{presenthours}</td>
              <td>{Number(totalhours) - Number(presenthours)}</td>
            </tr>
          </table>
        </div>

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
