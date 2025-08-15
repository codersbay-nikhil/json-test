const fetch = require("node-fetch");

const API_URL = "http://localhost:3000/api/save";

// Test data - whatever comes from frontend
const testData = {
  name: "Test User",
  age: 25,
  email: "test@example.com",
  preferences: {
    theme: "dark",
    notifications: true,
  },
  hobbies: ["reading", "coding", "gaming"],
  metadata: {
    source: "test-script",
    timestamp: new Date().toISOString(),
  },
  // You can send any JSON structure from frontend
  userData: {
    profile: {
      avatar: "https://example.com/avatar.jpg",
      bio: "Software Developer",
    },
    settings: {
      language: "en",
      timezone: "UTC",
    },
  },
};

async function testAPI() {
  try {
    console.log("Testing API endpoint...");
    console.log("Sending data:", JSON.stringify(testData, null, 2));

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log("\nResponse status:", response.status);
    console.log("Response:", JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log("\n✅ API test successful!");
    } else {
      console.log("\n❌ API test failed!");
    }
  } catch (error) {
    console.error("Error testing API:", error.message);
    console.log("\nMake sure the server is running on port 3000");
  }
}

// Run the test
testAPI();
