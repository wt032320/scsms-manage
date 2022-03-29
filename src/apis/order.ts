import { AuditInfo, OrderList } from "../types/types";
import { get } from "./index.ts";

export const getOrder = (data: OrderList): Promise<any> => {
  return get("/admin/list", data);
};

export const auditOrder = (auditInfo: AuditInfo): Promise<any> => {
  return get("/admin/publish", auditInfo);
};
