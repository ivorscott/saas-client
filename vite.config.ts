import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const fs = require("fs");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost.pem"),
    },
  },
  plugins: [reactRefresh()],
});
