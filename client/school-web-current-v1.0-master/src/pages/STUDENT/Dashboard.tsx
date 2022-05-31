import { FC, useEffect, useState } from "react";
import PageContainor from "../../components/page-containor";
import { STUDENT } from "../../constants/role";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface INewAnnouncment {
  status?: string;
  object?: any;
}
const Dashboard: FC<INewAnnouncment> = () => {
  const [progress, setProgress] = useState(0);  
  return (
    <PageContainor role={STUDENT}>
      <div className="space-y-4 relative">
        <div
          className=" bg-red-500 rounded h-1"
          style={{
            width: progress + "%",
          }}
        ></div>

        <ToastContainer />
     
        <div>
            <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero deserunt ex quaerat fuga velit, sit suscipit animi accusamus perspiciatis nostrum ullam, quam ut debitis iusto tempore similique placeat optio itaque minima quasi doloremque sapiente ab? Cum maiores corrupti est dolores!</h1>
        </div>
      </div>
    </PageContainor>
  );
};

export default Dashboard;
