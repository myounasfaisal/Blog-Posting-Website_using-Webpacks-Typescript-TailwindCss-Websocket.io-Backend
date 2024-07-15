import { app } from "./app.js";
import { DBName } from "./constant.js";
import { connectDB } from "./database/connectDB.js";

connectDB(DBName)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
