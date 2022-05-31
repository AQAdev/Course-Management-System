import axios from "axios";
import { URL } from "../../../constants/url";

export const addNewScholership = async (ann_object: any) => {
  const url = URL + "scholership";
  const new_announcement = await axios.post(url, ann_object);
  if (new_announcement.data.data.scholership) {
    console.log(new_announcement.data.data.scholership);
    return new_announcement.data.data.scholership;
  } else {
    return null;
  }
};

export const getAllScholership = async () => {
  const url = URL + "scholership";
  const new_announcement = await axios.get(url);
  if (new_announcement.data.data.scholership) {
    return new_announcement.data.data.scholership;
  } else {
    return null;
  }
};

export const deleteNewScholership = async (id: any) => {
  const url = URL + `scholership/${id}`;
  const new_announcement = await axios.delete(url);
  return new_announcement.data.status;
};

export const updateNewScholership = async (id: any, ann_object: any) => {
  const url = URL + `scholership/${id}`;
  const new_announcement = await axios.patch(url, ann_object);
  if (new_announcement.data.data.scholership) {
    return new_announcement.data.data.scholership;
  } else {
    return null;
  }
};
