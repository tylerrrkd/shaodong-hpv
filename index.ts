import axios from "axios";
import { isAfter } from "date-fns";

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
      headers: {
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
      },
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

const commandArgument = process?.argv?.slice?.(2) || [];
const [queryString, cookie] = commandArgument;

const startDate = new Date("2022-04-08 08:52:00");
const endDate = new Date("2022-04-08 09:20:00");

if (queryString && cookie) {
  const params = new URLSearchParams(queryString);
  const timer: NodeJS.Timer = globalThis.setInterval(async () => {
    if (isAfter(new Date(), endDate)) {
      console.log("Activity ended");
      return timer && clearInterval(timer);
    }
    if (isAfter(new Date(), startDate)) {
      // release resources
      const weMadeIt = await queue({ params, cookie });
      if (weMadeIt) {
        console.log("We made it!!!!!!!");
        timer && clearInterval(timer);
      }
    } else {
      console.log("Activity not start yet");
    }
  }, 200);
} else {
  console.warn("Missing arguments");
}
