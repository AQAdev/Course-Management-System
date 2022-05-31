import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBtach, getAllProgram, getAllSection } from "../../Api/batch";
import { Loader } from "../../components/loader";

import PageContainor from "../../components/page-containor";
import { ADMIN } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";
import { addNewStudent } from "./create-student";

const StudentForm: FC = () => {
  const { user } = getUser();
  const navigation = useNavigate();
  const notify = (text: string) => toast(text);
  // --STATE--

  const [stdName, setName] = useState("");
  const [stdFatherName, setStdFatherName] = useState("");
  const [number, setNumber] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  const [active, setActive] = useState(false);
  const [section, setSection] = useState("A");
  const [batch, setBatch] = useState("A-2022");
  const [stdID, setStdID] = useState("");
  const [loading, setLoading] = useState(false);

  // __________________________________________________________

  const [sectionArray, setSectionArray] = useState([]);
  const [programArray, setProgramArray] = useState([]);
  const [batchArray, setBatchArray] = useState([]);
  // end --STATE--
  useEffect(() => {
    if (!user) navigation("/signin");
  }, [user, navigation]);

  // add new std
  useEffect(() => {
    console.log(batch);
  }, [batch]);

  const createStudent = (e: any) => {
    e.preventDefault();
    setActive(true);
    const addStudent = async () => {
      const std = await addNewStudent({
        stdName,
        stdFatherName,
        number,
        email,
        program,
        year,
        address,
        password,
        gender,
        semester,
        memberID: "",
        section,
        batch,
        stdID,
      });
      if (std === null) {
        notify("fail to add data");
      } else {
        notify("Data added successfully");
        setName("");
        setStdFatherName("");
        setNumber("");
        setProgram("");
        setYear("");
        setSemester("");
        setGender("");
        setEmail("");
        setPassword("");
        setC_Password("");
        setAddress("");
        setSection("");
        setProgram("");
        setBatch("");
      }
      setActive(false);
    };
    addStudent();
  };

  useEffect(() => {
    const getData = async () => {
      const section = await getAllSection();
      const batch = await getAllBtach();
      const program = await getAllProgram();

      setProgramArray(program.progam);
      setSectionArray(section.section);
      setBatchArray(batch.batch);
    };
    getData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (!!programArray.length && !!sectionArray.length && !!batchArray.length) {
      setLoading(false);
    }
  }, [programArray, sectionArray, batchArray]);
  useEffect(() => {
    console.log(section, batch, program);
  }, [batch, section, program]);
  if (user.role !== ADMIN) {
    <>Invalid Access</>;
  }
  return (
    <>
      <ToastContainer />
      <PageContainor role={ADMIN}>
        {loading ? (
          <Loader></Loader>
        ) : (
          <>
            <div className="text-center">Add Student</div>
            <form className="py-4 px-6">
              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    value={stdName}
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
                    type="text"
                    value={stdFatherName}
                    name="floating_last_name"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setStdFatherName(e.target.value);
                    }}
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Father name
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
                  <select
                    onChange={(E: any) => {
                      setProgram(E.target.value);
                    }}
                    className="w-full bg-green-500 w-fill py-2 rounded text-white"
                  >
                    {programArray.map((el: any, key: any) => (
                      <option key={key} value={el._id}>
                        {el.prog_name}
                      </option>
                    ))}
                  </select>
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
                      setBatch(E.target.value);
                    }}
                    className="w-full bg-green-500 w-fill py-2 rounded text-white"
                  >
                    {batchArray.map((el: any, key: any) => (
                      <option key={key} value={el._id}>
                        {el.batch_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* </div> */}
                <div className="relative z-0 mb-6 w-full group">
                  <select
                    onChange={(E: any) => {
                      setSection(E.target.value);
                    }}
                    className="w-full bg-green-500 w-fill py-2 rounded text-white"
                  >
                    {sectionArray.map((el: any, key: any) => (
                      <option key={key} value={el._id}>
                        {el.sec_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    value={year}
                    type="text"
                    name="floating_company"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Year
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    value={gender}
                    name="floating_company"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Gender
                  </label>
                </div>
              </div>

              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  value={address}
                  name="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Address
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
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  value={stdID}
                  name="student Id"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setStdID(e.target.value);
                  }}
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Student ID
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="password"
                  value={password}
                  name="floating_password"
                  id="floating_password"
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
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="password"
                  value={c_password}
                  name="repeat_password"
                  id="floating_repeat_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => {
                    setC_Password(e.target.value);
                  }}
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Confirm password
                </label>
              </div>
              <button
                disabled={active}
                type="submit"
                onClick={createStudent}
                className={`text-white 
                bg-blue-700 cursor-pointer
              }hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                Submit
              </button>
            </form>
          </>
        )}
      </PageContainor>
    </>
  );
};

export default StudentForm;
