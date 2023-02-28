import axios, { AxiosResponse } from "axios";
import { writeFileSync } from "fs";

interface IData {
  blockNumber: number;
  label: string;
  name: string;
  owner: string;
}

interface IRegister {
  lastBlock: number;
  results: IData[];
}

const target = 9999;

const main = async () => {
  /**
   * blockNumber: 20721233
   * label: "0xf6fdc32f6a1fd87129b13b78fb1f502055de3357a8ae2400309117eddd1de4e5"
   * name: "homepage"
   * owner: "0xF69BF4c17687880347b7999066837BD00834F029"
   */
  const res: AxiosResponse<IRegister> = await axios.get(
    "https://spaceid.stevenlei.com/api/register"
  );

  const dimension = String(target).length;

  const dataList = new Array(target)
    .fill(0)
    .map((_, index) => String(index + 1).padStart(dimension, "0"));

  const result =
    res?.data?.results?.filter?.((domain) => dataList.includes(domain.name)) ||
    [];

  const remain = dataList?.filter?.(
    (digit) => !result.find((domain) => digit === domain.name)
  );

  const AAAB = remain.filter((digit) => {
    const first = digit[0];
    const second = digit[1];
    const third = digit[2];
    const fourth = digit[3];
    if (first === fourth && second === third) {
      return true;
    }
    return false;
  });

  console.log(`${dimension}d remain: `, AAAB, "total: ", AAAB.length);

  writeFileSync("./test.txt", String(AAAB));
};

main();
