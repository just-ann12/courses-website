import axios from "axios";
import { TOKEN } from "../utils/courses-constants";

export const api = axios.create({
  baseURL: "https://api.wisey.app/api/v1/core",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
