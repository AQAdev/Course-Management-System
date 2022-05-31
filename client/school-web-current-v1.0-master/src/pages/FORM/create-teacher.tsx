import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBtach, getAllProgram, getAllSection } from "../../Api/batch";

import PageContainor from "../../components/page-containor";
import { ADMIN } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";
import { addNewStudent, addNewTeacher } from "./create-student";

const StudentForm: FC = () => {
  const { user } = getUser();
  const navigation = useNavigate();
  const notify = (text: string) => toast(text);
  // --STATE--

  const [name, setName] = useState("");
  const [designation, setDsignation] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // end --STATE--
  useEffect(() => {
    if (!user) navigation("/signin");
  }, [user, navigation]);

  const createStudent = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const addStudent = async () => {
      const std = await addNewTeacher({
        email,
        password,
        name,
        designation,
        phone: number,
      });
      if (std === null) {
        notify("fail to add data");
      } else {
        notify("Data added successfully");
        setName("");
        setEmail("");
        setPassword("");
        setDsignation("");
        setNumber("");
      }
      setLoading(false);
    };
    addStudent();
  };

  if (user.role !== ADMIN) {
    <>Invalid Access</>;
  }
  return (
    <>
      <ToastContainer />
      <PageContainor role={ADMIN}>
        <>
          <div className="text-center">Add Student</div>
          {loading ? (
            <></>
          ) : (
            <form className="py-4 px-6">
              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    value={name}
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Name{" "}
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="password"
                    value={password}
                    name="floating_last_name"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Password
                  </label>
                </div>
              </div>
              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    value={number}
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="floating_phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Phone number (123-456-7890)
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="email"
                    value={email}
                    name="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email address
                  </label>
                </div>
                {/* <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  value={program}
                  name="floating_company"
                  id="floating_company"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setProgram(e.target.value);
                  }}
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Program
                </label>
              </div> */}
              </div>
              {/* _____ */}

              <div className="grid xl:grid-cols-2 xl:gap-6">
                {/* <div className="relative z-0 mb-6 w-full group"> */}
                <div className="relative z-0 mb-6 w-full group">
                  <select
                    onChange={(E: any) => {
                      setDsignation(E.target.value);
                    }}
                    className="w-full bg-green-500 w-fill py-2 rounded text-white"
                  >
                    {[
                      "Junior Lecturer",
                      "Senior Lecturer",
                      "Lab Assistant",
                      "Lab Engineer",
                      "Assistant Professor",
                    ].map((el: any, key: any) => (
                      <option key={key} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
                {/* </div> */}
              </div>

              <button
                // disabled={active}
                type="submit"
                onClick={createStudent}
                className={`text-white 
                bg-blue-700 cursor-pointer
              }hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                Add Teacher
              </button>
            </form>
          )}
        </>
      </PageContainor>
    </>
  );
};

export default StudentForm;
