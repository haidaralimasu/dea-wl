import axios from "axios";

export const mintLimit2 = async (address) => {
  const res = await axios.get(
    `http://localhost:8000/get-id-whitelist2/${address}`
  );
  console.log(res.data);
  return res.data;
};

export const mintLimit3 = async (address) => {
  const res = await axios.get(
    `http://localhost:8000/get-id-whitelist3/${address}`
  );
  console.log(res.data);
  return res.data;
};
