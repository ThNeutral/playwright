import { test, expect } from "@playwright/test";

test.describe.parallel("Api testing", () => {
  const baseURL = "https://reqres.in/api";

  test("Simple API test - Assert Response Status", async ({ request }) => {
    const response = await request.get(`${baseURL}/users/2`);
    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
  });

  test("Simple API test - Assert Invalid Endpoint", async ({ request }) => {
    const response = await request.get(
      `${baseURL}/users/missileknowswhereitsisatalltime`
    );
    expect(response.status()).toBe(404);
  });

  test("GET Request - Get User Detail", async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);
    const body = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(body.data.id).toBe(1);
    expect(body.data.first_name).toBe("George");
    expect(body.data.email).toBeTruthy();
  });

  test("POST Request - Create New User", async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      data: {
        id: 420,
      },
    });
    expect(response.status()).toBe(201);
    const body = JSON.parse(await response.text());
    expect(body.id).toBe(420);
    expect(body.createdAt).toBeTruthy();
  });

  test("POST Request - Successful Login User", async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    });
    expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    expect(body.token).toBeTruthy();
  });

  test("POST Request - Unsuccessful Login User", async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: "eve.holt@reqres.in",
      },
    });
    expect(response.status()).toBe(400);
    const body = JSON.parse(await response.text());
    expect(body.error).toBe("Missing password");
  });

  test("PUT Request - Update User", async ({ request }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      data: {
        name: "morpheus",
        job: "zion resident",
      },
    });
    expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    expect(body.name).toBe("morpheus");
    expect(body.job).toBe("zion resident");
    expect(body.updatedAt).toBeTruthy();
  });

  test("DELETE Request - Delete User", async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/2`);
    expect(response.status()).toBe(204);
  });
});
