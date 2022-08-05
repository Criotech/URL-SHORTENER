import AxiosInstance from "./axiosInstance";

class ShortenerService {
  getAll() {
    return AxiosInstance.get("/");
  }

  get(shortUrl: string) {
    return AxiosInstance.get(`/${shortUrl}`);
  }

  create(data: { fullUrl: string }) {
    return AxiosInstance.post("/", data);
  }
}

export default new ShortenerService();