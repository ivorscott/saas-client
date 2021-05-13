import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      "@material-ui/icons": "@material-ui/icons/esm",
    },
  },
  plugins: [reactRefresh()],
});
