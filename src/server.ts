import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/index.js";

const main = async()=>{
  initDB();
  app.listen(config.port, () => {
  console.log(`The Express server is running on the port ${config.port}`);
});
}

main();
