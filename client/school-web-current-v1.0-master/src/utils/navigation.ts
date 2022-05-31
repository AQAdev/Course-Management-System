import { ADMIN, STUDENT, TEACHER } from "../constants/role";

export const landMeToPage = (navigation: any, role: string) => {
  console.log(role)
  if (role === ADMIN) {
    navigation("/admin/dashboard");
  } else if (role === STUDENT) {
    navigation("/student/dashboard");
  } else if (role === TEACHER) {
    navigation("/teacher/dashboard");
  } else {
    console.log("no route found");
  }
};
