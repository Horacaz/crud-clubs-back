import request from "supertest";
import { app, server } from "../index";

afterAll(() => {
  server.close();
});
describe("GET /api", () => {
  test("should return 200 OK", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
  });
  test("should return a list of clubs", async () => {
    const response = await request(app).get("/api");
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("GET /api/club/:id", () => {
  test("should return 200 OK", async () => {
    const response = await request(app).get("/api/club/1");
    expect(response.status).toBe(200);
  });
  test("should return a club", async () => {
    const clubId = 61;
    const response = await request(app).get(`/api/club/${clubId}`);
    expect(response.body.data.id).toBe(clubId);
  });
});
