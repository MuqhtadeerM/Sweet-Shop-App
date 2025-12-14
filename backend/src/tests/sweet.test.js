import request from "supertest";
import app from "../app.js";

describe("Sweet API", () => {
  it("should fetch all sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
  });
});
