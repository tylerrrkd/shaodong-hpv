import axios, { AxiosRequestHeaders } from "axios";
import { isAfter, format } from "date-fns";

/**
 * headers
 */
const getHeaders = (): AxiosRequestHeaders => {
  return {
    Host: "holiday.lvcampaign.com",
    Connection: "keep-alive",
    "Content-Length": "30",
    token: "",
    "content-type": "application/json",
    "Accept-Encoding": "gzip",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.32(0x18002030) NetType/WIFI Language/zh_CN",
    Referer: "https://servicewechat.com/wx48412ab344ba1bd0/289/page-frame.html",
  };
};

const queue = async (): Promise<boolean> => {
  try {
    const res = await axios({
      withCredentials: true,
      method: "POST",
      url: "https://holiday.lvcampaign.com/api/v4/estore/oms/crmStockChecking/v2/112?notCache=false",
      data: [{ item_id: "M81085", qty: 1 }],
      headers: getHeaders(),
    });
    console.log(res.data);
    const data = res?.data?.data?.["M81085"];
    if (data?.inStock || data?.backOrder) {
      return true;
    }
    return false;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
    return false;
  }
};

const startDate = new Date("2023-02-07 08:59:57");
const endDate = new Date("2023-07-15 09:10:00");

const getLogTimeString = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");
const log = (msg: string) => console.log(`${msg}(${getLogTimeString()})`);

console.log("LV BOT START!");

let times = 0;
const timer: NodeJS.Timer = globalThis.setInterval(async () => {
  if (isAfter(new Date(), endDate)) {
    log(`Activity ended`);
    return timer && clearInterval(timer);
  }
  if (isAfter(new Date(), startDate)) {
    // release resources
    const weMadeIt = await queue();
    console.log(`第${times++}次`);
    if (weMadeIt) {
      log(`冲啊啊啊啊啊啊啊啊啊啊啊啊!!!!!!!`);
      timer && clearInterval(timer);
    } else {
      log(`再等等！！`);
    }
  } else {
    log(`Activity not start yet`);
  }
}, 1000);
