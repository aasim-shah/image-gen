// import request from "@/lib/api/request";
import { mainUrl } from "@/constants";

import axios from "axios";

export const getInspirations = async (): Promise<any> => {
  const response = await axios.get(mainUrl + "/inspirations");
  return response.data;
};
