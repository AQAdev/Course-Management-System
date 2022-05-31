import { FC } from "react";
import PageContainor from "../../../components/page-containor";
import { ADMIN } from "../../../constants/role";

export const AddCourses: FC = () => {
  return (
    <>
      <PageContainor role={ADMIN}>
        <div></div>
      </PageContainor>
    </>
  );
};
