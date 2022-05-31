import axios from "axios";
import { FC, useEffect, useState } from "react";
import { updateMember } from "../../Api/member";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { STUDENT } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";

const Profile: FC = () => {
  const { user, user_information } = getUser();
  const [udpateEmailPage, setUpdateEmailPage] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [whichAction, setWhichAction] = useState("");
  let [newMail, setNewMail] = useState("");
  const [reload, setReload] = useState(false);
  let [std, setstd] = useState<any>(null);
  useEffect(() => {
    const getStudent = async () => {
      const student = await axios.get(
        "http://localhost:8000/v1/student/" + user_information._id
      );
      const data = student.data.data.student;
      if (data) {
        console.log({ data });
        setstd(data);
      }
    };
    getStudent();
  }, [reload]);

  const updateMem = async (obj: any) => {
    const data = await updateMember(user._id, obj);
    console.log(data);
    if (data === "success") {
      setUpdateEmailPage(false);
      setReload(!reload);
    }
  };

  return (
    <>
      <PageContainor role={STUDENT}>
        <>
          {!udpateEmailPage ? (
            <>
              {std ? (
                <>
                  <div>
                    <div className="w-full flex border-t-2 border-b-2 border-gray-200">
                      <div className="w-2/4 ">
                        <div className="mt-4 text-lg font-bold">ID</div>
                        <div className="py-2">{std?._id}</div>
                      </div>
                      <div className="w-2/4 pl-4 border-l-2 border-gray-200">
                        <div className="mt-4 text-lg font-bold">Name</div>
                        <div className="py-2">{std?.stdName}</div>
                      </div>
                    </div>
                    <div className="w-full flex border-b-2 border-gray-200">
                      <div className="w-2/4 ">
                        <div className="mt-4 text-lg font-bold">Batch</div>
                        {/* {user_information.stdBatch} */}
                        <div className="py-2">{std?.stdBatch.batch_name}</div>
                      </div>
                      <div className="w-2/4 pl-4 border-l-2 border-gray-200">
                        <div className="mt-4 text-lg font-bold">Gender</div>
                        <div className="py-2">{std?.gender}</div>
                      </div>
                    </div>

                    <div className="w-full flex border-b-2 border-gray-200">
                      <div className="w-2/4 ">
                        <div className="mt-4 text-lg font-bold">Conatact</div>

                        <div className="py-2">{std?.stdPhoneNumber}</div>
                      </div>
                      <div className="w-2/4 pl-4 border-l-2 border-gray-200">
                        <div className="flex justify-between">
                          <div className="mt-4 text-lg font-bold">Email</div>{" "}
                          <div
                            onClick={() => {
                              setUpdateEmailPage(true);
                              setEmail(std?.memberID.email);
                              setWhichAction("Email");
                            }}
                            className="mr-4 text-blue-500 cursor-pointer"
                          >
                            Update Email
                          </div>
                        </div>
                        <div className="py-2">{std?.memberID.email}</div>
                      </div>
                    </div>

                    <div className="w-full flex border-b-2 border-gray-200">
                      <div className="w-2/4 ">
                        <div className="mt-4 text-lg font-bold">Semester</div>

                        <div className="py-2">1</div>
                      </div>
                      <div className="w-2/4 pl-4 border-l-2 border-gray-200">
                        <div className="mt-4 text-lg font-bold">Section</div>{" "}
                        <div className="py-2">{std?.stdSection.sec_name}</div>
                      </div>
                    </div>

                    <div className="w-full flex border-b-2 border-gray-200">
                      <div className="w-2/4 ">
                        <div className="mt-4 text-lg font-bold">Address</div>

                        <div className="py-2">{std?.stdAddress}</div>
                      </div>
                      <div className="w-2/4 pl-4 border-l-2 border-gray-200">
                        <div className="flex justify-between">
                          <div className="mt-4 text-lg font-bold">Password</div>{" "}
                          <div 
                            onClick={() => {
                              setUpdateEmailPage(true);
                              setEmail(std?.memberID.password);

                              setWhichAction("Password");
                            }}
                            className="mr-4 text-blue-500 cursor-pointer"
                          >
                            Update Password
                          </div>
                        </div>
                        <div className="py-2" style={{display:"none"}}>{std?.memberID.password}</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Loader></Loader>
              )}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className="w-80 px-4 h-14 border-2 mb-4 rounded"
                placeholder="Enter New Password"
                onChange={(e: any) => {
                  setNewMail(e.target.value);
                }}
              ></input>
              <div
                onClick={(e) => {
                  let obj;
                  if (whichAction === "Email") {
                    setEmail(newMail);
                    obj = {
                      email: newMail,
                    };
                  } else {
                    setPassword(newMail);
                    obj = {
                      password: newMail,
                    };
                  }
                  updateMem(obj);
                  // call an api and update the email
                }}
                className="w-80 p-4 px-8 bg-green-500 rounded text-white flex justify-center items-center cursor-pointer"
              >
                Update {whichAction}
              </div>
            </div>
          )}
        </>
      </PageContainor>
    </>
  );
};

export default Profile;
