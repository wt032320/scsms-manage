import { PeopleList } from "../types/types";
import { Delete } from "./index";
import { get } from "./index.ts";

export const getPeople = (data: PeopleList): Promise<any> => {
  return get("/admin/userList", data);
};
export const deletePeople = (data: any): Promise<any> => {
  //console.log(data);
  return Delete("/admin/delete", data);
};
