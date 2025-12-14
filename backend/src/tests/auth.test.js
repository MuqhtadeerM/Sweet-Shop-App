
import request from "suertest"
describe("Auth API", () => {
  it("should register a user", async () => {
    const res = await request(app).app("/api/auth/register").send({
      name: "Test User",
      email: "test@gmail.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(201);
  });
});
