const { test } = require("node:test");
const assert = require("node:assert/strict");

const API_URL = (
  process.env.API_URL || "https://taskflow-api-muvn.onrender.com"
).replace(/\/$/, "");

async function request(path, options = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

test("TaskFlow API end-to-end test", async () => {
  const username = `testuser_${Date.now()}`;
  const password = "TestPassword123!";
  let token;
  let taskId;

  // Check API availability
  const home = await request("/");
  assert.equal(home.status, 200);

  // Register a test user
  const registration = await request("/api/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  assert.ok(
    [200, 201].includes(registration.status),
    "Registration should succeed"
  );

  // Log in
  const login = await request("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  assert.equal(login.status, 200);

  const loginData = await login.json();
  token =
    loginData.token ||
    loginData.accessToken ||
    loginData.data?.token;

  assert.ok(token, "Login should return an authentication token");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  // Protected route should reject unauthenticated requests
  const unauthorized = await request("/api/tasks");
  assert.ok([401, 403].includes(unauthorized.status));

  // Get tasks
  const tasksResponse = await request("/api/tasks", {
    headers: authHeaders,
  });

  assert.equal(tasksResponse.status, 200);

  // Create a task
  const createResponse = await request("/api/tasks", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ title: "Automated test task" }),
  });

  assert.ok([200, 201].includes(createResponse.status));

  const createdData = await createResponse.json();
  const createdTask =
    createdData.task ||
    createdData.data ||
    createdData;

  taskId = createdTask.id;

  assert.ok(taskId, "Created task should have an ID");

  try {
    // Complete the task
    const updateResponse = await request(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ completed: true }),
    });

    assert.equal(updateResponse.status, 200);

    // Delete the task
    const deleteResponse = await request(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: authHeaders,
    });

    assert.ok([200, 204].includes(deleteResponse.status));

    console.log("All TaskFlow API checks passed!");
  } finally {
    // Attempt cleanup if the task still exists
    if (taskId) {
      await request(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
    }
  }
});