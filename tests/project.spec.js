import { Tester } from "neotest";
import { ScratchSession } from "../dist/index.js";

const r = new Tester();
const session = new ScratchSession();

// basic variables
const projectID = 601968190;
const project = session.getProject(projectID);
const apiData = await project.getAPIData();
const comments = await project.getComments();

r.test("make sure project stats are numbers", () => {
  r.expectTypeOf(apiData.stats.views, "number");
  r.expectTypeOf(apiData.stats.favorites, "number");
  r.expectTypeOf(apiData.stats.loves, "number");
  r.expectTypeOf(apiData.stats.remixes, "number");
});

r.test("make sure project comments are object", () => {
  r.expectTypeOf(comments, "object");
});

r.test("make sure project comments are iterable", () => {
  r.expectTypeOf(comments.forEach, "function");
});

r.test("make sure project comment replies work", async () => {
  const id = comments[0].id;
  const replies = await project.getCommentReplies(0, 20, id);
  const reply = replies[0];
  r.expectTypeOf(reply, "object");
});
