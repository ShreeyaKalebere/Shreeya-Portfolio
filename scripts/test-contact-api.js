// Comprehensive test script for POST /api/contact
const testPayloads = [
  {
    name: "Valid Submission",
    payload: {
      name: "Maya Chen",
      email: "maya.chen@example.com",
      subject: "Software Engineering Opportunity",
      message: "Hi Shreeya, we came across your projects and would love to discuss an SDE internship role."
    },
    expectedStatus: 200
  },
  {
    name: "Missing Name",
    payload: {
      email: "maya@example.com",
      message: "Looking to connect on robotics and computer vision."
    },
    expectedStatus: 400
  },
  {
    name: "Invalid Email",
    payload: {
      name: "Maya Chen",
      email: "not-an-email",
      message: "Looking to connect on robotics and computer vision."
    },
    expectedStatus: 400
  },
  {
    name: "Message Too Short",
    payload: {
      name: "Maya Chen",
      email: "maya@example.com",
      message: "Hi"
    },
    expectedStatus: 400
  },
  {
    name: "Honeypot Triggered (Bot Trap)",
    payload: {
      name: "Spam Bot",
      email: "bot@spam.com",
      message: "Cheap marketing services for your website now!",
      _gotcha: "I am a bot"
    },
    expectedStatus: 200 // Bot receives 200 but nothing is sent
  }
];

async function runTests() {
  console.log("=== RUNNING CONTACT API TEST SUITE ===\n");
  let passed = 0;

  for (const test of testPayloads) {
    try {
      const res = await fetch("http://localhost:5173/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(test.payload)
      });

      const data = await res.json().catch(() => ({}));
      const isSuccess = res.status === test.expectedStatus;

      console.log(`[${isSuccess ? 'PASS' : 'FAIL'}] ${test.name}`);
      console.log(`  Expected HTTP: ${test.expectedStatus}, Got: ${res.status}`);
      console.log(`  Response:`, JSON.stringify(data));
      console.log("");

      if (isSuccess) passed++;
    } catch (err) {
      console.error(`[ERROR] Test "${test.name}" failed with network error:`, err.message);
    }
  }

  console.log(`\nResults: ${passed} / ${testPayloads.length} tests passed.`);
}

runTests();
