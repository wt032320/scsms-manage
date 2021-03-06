import axios from "axios";

const baseURL = "http://192.168.1.107:8080";

const api = axios.create({
  baseURL,
  timeout: 8000,
});

export const get = async (
  url: string,
  data: Record<string | number, any> = {}
): Promise<any> => {
  let realUrl = baseURL + url;
  Object.keys(data).forEach((item, index) => {
    if (index === 0) {
      realUrl += `?${item}=${data[item]}`;
    } else {
      realUrl += `&${item}=${data[item]}`;
    }
  });

  const resData: any = await api.get(realUrl);
  return resData.data || true;
};

export const post = async (
  url: string,
  data: Record<string | number, any>
): Promise<any> => {
  const resData: any = await api.post(`${baseURL}${url}`, data);
  return resData.data || true;
};
export const Delete = async (url: string, data: number): Promise<any> => {
  const resData: any = await api.get(`${baseURL}${url}?uid=${data}`);
  console.log(resData.data);
  return resData.data || true;
};
