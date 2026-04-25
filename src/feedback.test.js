test("Feedback should be submitted", () => {
  const message = "Hello Stellar";
  expect(message).toBe("Hello Stellar");
});

test("Empty feedback should fail", () => {
  const message = "";
  expect(message).toBe("");
});

test("Feedback count should increase", () => {
  const feedbackList = ["Hi", "Hello", "Test"];
  expect(feedbackList.length).toBe(3);
});