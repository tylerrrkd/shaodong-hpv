import axios from "axios";

const test = async () => {
  const res = await axios.get("https://google.com")
  console.log(res.headers)
}

test()