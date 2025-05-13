// main/setup.ts
import { defineAppSetup } from "@slidev/types";
import naive from "slidev-naive-addon";

export default defineAppSetup(({ app, router }) => {
  app.use(naive);
});
