import { FC, useEffect, useState } from "react";
import Progressbar from "../../components/progress-bar";
import CourseDetial from "../../components/course-detials";
import PageContainor from "../../components/page-containor";
import { STUDENT, TEACHER } from "../../constants/role";
import { getTimetable } from "../../Api/time-table";
import { getUser } from "../../utils/localStorageFunctions";

export const StudentTimeTable = () => {
  const { user_information } = getUser();
  console.log({ user_information });
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await getTimetable(
        `batch=${user_information.stdBatch}&program=${user_information.stdProgram}&section=${user_information.stdSection}`
      );
      setUrl(data[0].url);
    };
    getData();
  }, []);

  return (
    <>
      <PageContainor role={STUDENT}>
        <div className="flex justify-between items-center">
          <div className="space-y-4">Download Time Table</div>
          <a
            href={url}
            target="_blank"
            download
            className="float-right bg-green-500 rounded h-12 px-12 text-white flex justify-center items-center cursor-pointer"
            rel="noreferrer"
          >
            Download File
          </a>
        </div>
      </PageContainor>
    </>
  );
};
