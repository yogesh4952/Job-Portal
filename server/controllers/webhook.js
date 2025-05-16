import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Ensure req.body is a raw string or buffer
    const payload =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const evt = wh.verify(payload, headers);

    const { data, type } = evt;

    console.log("📩 Clerk Webhook Event:", type, data.id);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email:
            data.email_addresses?.[0]?.email_address ||
            `user_${data.id}@example.com`,
          name:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
            "Unknown User",
          image: data.image_url || "",
          resume: "",
        };

        const existingUser = await User.findById(data.id);
        if (!existingUser) {
          await User.create(userData);
          console.log("✅ User created:", userData.email);
        } else {
          console.log("ℹ️ User already exists:", userData.email);
        }
        break;
      }

      case "user.updated": {
        const userData = {
          email:
            data.email_addresses?.[0]?.email_address ||
            `user_${data.id}@example.com`,
          name:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
            "Unknown User",
          image: data.image_url || "",
        };

        const updatedUser = await User.findByIdAndUpdate(data.id, userData, {
          new: true,
        });
        if (updatedUser) {
          console.log("🔄 User updated:", userData.email);
        } else {
          console.log("⚠️ User not found for update:", data.id);
        }
        break;
      }

      case "user.deleted": {
        const deletedUser = await User.findByIdAndDelete(data.id);
        if (deletedUser) {
          console.log("❌ User deleted:", data.id);
        } else {
          console.log("⚠️ User not found for deletion:", data.id);
        }
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", type);
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
