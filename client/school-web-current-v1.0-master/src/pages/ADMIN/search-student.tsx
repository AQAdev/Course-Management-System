import { useState, useEffect } from "react";
import { getAllSection } from "../../Api/batch";
import { getSection } from "../../Api/section";
import { studentById, updateStudent } from "../../Api/student";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { ADMIN } from "../../constants/role";

export const SearchStudent = () => {
  const [student, setStudent] = useState<any>(null);
  const [updateSemester, setUpdateSemester] = useState(false);
  const [semester, setSemester] = useState("1");
  const [section, setSection] = useState("1");
  const [allSection, setAllSection] = useState<any>([]);
  const [regNo, setRegNo] = useState("");

  const getSData = async () => {
    setStudent(null);
    let data = await studentById(regNo);
    setStudent(data[0]);
    setUpdateSemester(false);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getSection();
      setAllSection(data);
    };
    getData();
  }, []);

  return (
    <>
      <PageContainor role={ADMIN}>
        {updateSemester ? (
          <div className="flex flex-col justify-center items-center">
            <div>
              <div>Select Semeter</div>
              <div className="relative z-0 mb-6 w-80 group">
                <select
                  onChange={(E: any) => {
                    setSemester(E.target.value);
                  }}
                  className="w-full bg-green-500 w- py-2 rounded text-white"
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map(
                    (el: any, key: any) => (
                      <option key={key} value={el}>
                        {el}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div>
              <div>Select Section</div>
              <div className="relative z-0 mb-6 w-80 group">
                <select
                  onChange={(E: any) => {
                    setSection(E.target.value);
                  }}
                  className="w-full bg-green-500 w- py-2 rounded text-white"
                >
                  {allSection.map((el: any, key: any) => (
                    <option key={key} value={el._id}>
                      {el.sec_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <>
              <div
                onClick={() => {
                  // make a request
                  const getData = async () => {
                    let data: any = await updateStudent(student._id, {
                      stdSemester: semester,
                      stdSection: section,
                    });
                    if (data == "201") {
                      console.log("updated");
                      getSData();
                    }
                  };
                  getData();
                }}
                className="bg-green-500 w-80 cursor-pointer text-white rounded py-2 text-center"
              >
                Update Semester
              </div>
            </>
          </div>
        ) : (
          <>
            <div>
              <div className="space-x-4">
                <input
                  type="text"
                  className="h-16 w-80 border-2 border-gray-400 rounded px-4"
                  placeholder="Enter Student Id"
                  onChange={(e) => {
                    setRegNo(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    getSData();
                  }}
                  className="rounded h-16  p-4 px-8 text-white bg-green-500"
                >
                  Search Student
                </button>
              </div>

              {student !== null ? (
                <div className="">
                  <div className="mt-8 flex justify-between items-center border-b-2 ">
                    <div className=" space-y-2 w-full ">
                      <h5 className="">Student Name</h5>
                      <h5 className="text-gray-500">{student?.stdName}</h5>
                    </div>
                    <div className="space-y-2  w-full">
                      <h5 className="">Program</h5>
                      <h5 className="text-gray-500">
                        {student?.stdProgram.prog_name}
                      </h5>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center border-b-2 ">
                    <div className=" space-y-2 w-full ">
                      <h5 className="">Student ID</h5>
                      <h5 className="text-gray-500">{student?.stdID}</h5>
                    </div>
                    <div className="space-y-2  w-full">
                      <h5 className="">Father Name</h5>
                      <h5 className="text-gray-500">{student?.stdFather}</h5>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-center border-b-2 ">
                    <div className=" space-y-2 w-full ">
                      <h5 className="">Student Email</h5>
                      <h5 className="text-gray-500">
                        {student?.memberID.email}
                      </h5>
                    </div>
                    <div className="space-y-2 w-full flex justify-between items-center">
                      <div className="block">
                        <h5 className="">Section-Sememter</h5>
                        <h5 className="text-gray-500">
                          {student?.stdSection.sec_name}-{student?.stdSemester}
                        </h5>
                      </div>
                      <div
                        onClick={() => {
                          setUpdateSemester(true);
                        }}
                        className="text-blue-400 cursor-pointer"
                      >
                        Update Semester
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full justify-center items-center mt-44">
                  {" "}
                  <>Enter Reg No</>
                </div>
              )}
            </div>
          </>
        )}

        {/* body if student founded */}
      </PageContainor>
    </>
  );
};
