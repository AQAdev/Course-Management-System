import { FC, useEffect, useState } from "react";
import Progressbar from "../../components/progress-bar";
import CourseDetial from "../../components/course-detials";
import PageContainor from "../../components/page-containor";
import { TEACHER } from "../../constants/role";
import { getTimetable } from "../../Api/time-table";
import { getUser } from "../../utils/localStorageFunctions";

export const VeiwTimeTable = () => {
  const { user_information } = getUser();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await getTimetable(`teacher=${user_information._id}`);
      setUrl(data[0].url);
    };
    getData();
  }, []);

  return (
    <>
      <PageContainor role={TEACHER}>
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
