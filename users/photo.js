const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const router = express.Router();

// Configure AWS SDK v3 S3 client
const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Multer setup (saves file to disk first)
const upload = multer({ dest: "uploads/" });

router.post(
  "/profilePhoto",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileStream = fs.createReadStream(file.path);
      const fileKey = `profiles/${Date.now()}_${file.originalname}`;

      const uploadParams = {
        Bucket: "samplerinfinite-profile-photos",
        Key: fileKey,
        Body: fileStream,
        ACL: "public-read",
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      // Clean up temp file
      fs.unlinkSync(file.path);

      const region =
        typeof s3.config.region === "function"
          ? await s3.config.region()
          : s3.config.region;

      const imageUrl = `https://${uploadParams.Bucket}.s3.${region}.amazonaws.com/${fileKey}`;
      res.json({ imageUrl });
    } catch (err) {
      console.error("Upload failed:", err);
      res.status(500).json({ error: "Failed to upload file" });
    }
  }
);

module.exports = router;
