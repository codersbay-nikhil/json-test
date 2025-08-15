const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Allow large JSON payloads

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/json-data-db";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Define Schema for DataSave Model
const dataSaveSchema = new mongoose.Schema(
  {
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const DataSave = mongoose.model("datasave", dataSaveSchema);

// API Routes

// POST /api/save - Save JSON data to MongoDB
app.post("/api/save", async (req, res) => {
  try {
    // Save whatever comes from frontend as JSON
    const frontendData = req.body;

    // Validate that request body is not empty
    if (!frontendData || Object.keys(frontendData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body cannot be empty",
      });
    }

    // Create new document with the entire request body as data
    const newData = new DataSave({
      data: frontendData,
    });

    // Save to MongoDB
    const savedData = await newData.save();

    res.status(201).json({
      success: true,
      message: "Data saved successfully in datasave model",
      data: {
        id: savedData._id,
        timestamp: savedData.timestamp,
        createdAt: savedData.createdAt,
      },
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET /api/health - Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "JSON Save Backend API",
    endpoints: {
      "POST /api/save": "Save JSON data to MongoDB",
      "GET /api/health": "Health check",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/save`);
});
