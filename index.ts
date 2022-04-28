import axios, { AxiosRequestHeaders } from "axios";
import { isAfter, format } from "date-fns";

/**
 * headers
 */
const getHeaders = (cookie: string): AxiosRequestHeaders => {
  return {
    Host: "miao.ydysoft.com",
    Accept: "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/x-www-form-urlencoded",
    Origin: "http://miao.ydysoft.com",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.18(0x1800123c) NetType/WIFI Language/zh_CN",
    Connection: "keep-alive",
    Referer:
      "http://miao.ydysoft.com/u-huodonginfo-3da855920c07408cb8e7a6c4fffd77c9.shtml",
    cookie,
  };
};

/**
 *获取id
 */
const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface IQueueProps {
  params: URLSearchParams;
  cookie: string;
}
const queue = async ({ params, cookie }: IQueueProps): Promise<boolean> => {
  try {
    const res = await axios({
      withCredentials: true,
      method: "POST",
      url: "http://miao.ydysoft.com/a/u.ashx",
      params,
      headers: getHeaders(cookie),
    });
    console.log(res.data);
    if (res?.data?.Code === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
    return false;
  }
};

const getCode = async ({ cookie }: { cookie: string }): Promise<string> => {
  try {
    const res = await axios({
      withCredentials: true,
      method: "GET",
      url: "http://miao.ydysoft.com/a/code.ashx",
      params: {
        str: guid(),
      },
      headers: getHeaders(cookie),
    });
    console.log(res.data);
    return "";
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
    return "";
  }
};

const commandArgument = process?.argv?.slice?.(2) || [];
const [queryString, cookie] = commandArgument;

const startDate = new Date("2022-04-29 08:59:57");
const endDate = new Date("2022-04-29 09:10:00");

const getLogTimeString = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");
const log = (msg: string) => console.log(`${msg}(${getLogTimeString()})`);

if (queryString && cookie) {
  const timer: NodeJS.Timer = globalThis.setInterval(async () => {
    if (isAfter(new Date(), endDate)) {
      log(`Activity ended`);
      return timer && clearInterval(timer);
    }
    if (isAfter(new Date(), startDate)) {
      // release resources
      const params = new URLSearchParams(`${queryString}`);
      const weMadeIt = await queue({ params, cookie });
      if (weMadeIt) {
        log(`We made it!!!!!!!`);
        timer && clearInterval(timer);
      } else {
        log(`Don't worry, try again`);
      }
    } else {
      log(`Activity not start yet`);
    }
  }, 666);
} else {
  console.warn("Missing arguments");
}
