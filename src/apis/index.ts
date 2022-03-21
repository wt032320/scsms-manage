import axios from "axios";
import { useMessage } from "naive-ui";

const baseURL = "";

const api = axios.create({
  baseURL,
  timeout: 8000,
});

export const get = async (url: string): Promise<any> => {
  const realUrl = baseURL + url;
  const resData: any = await api.get(realUrl);
  if (resData.data.status) {
    const message = useMessage();
    return {
      warning() {
        message.warning(resData.data.msg);
      },
    };
  }
  return false;
};

export const post = async (
  url: string,
  data: Record<string | number, any>
): Promise<any> => {
  const resData: any = await api.post(`${baseURL}${url}`, data);
  if (resData.data.status) {
    const message = useMessage();
    return {
      warning() {
        message.warning(resData.data.msg);
      },
    };
  }
};
