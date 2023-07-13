import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const indexController = {
  getSinglePageApp: (req, res) => {
    console.log("getting single page app", req.params);
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  },
};
