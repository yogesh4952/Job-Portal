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

    const payload = req.body; // raw buffer
    const evt = wh.verify(payload, headers); // returns verified + parsed data

    const { data, type } = evt;

    if (process.env.NODE_ENV === "development") {
      console.log("📩 Clerk Webhook Event:", type);
    }

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        };

        const existingUser = await User.findById(data.id);
        if (!existingUser) {
          await User.create(userData);
          console.log("✅ User created:", userData.email);
        }
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        console.log("🔄 User updated:", userData.email);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("❌ User deleted:", data.id);
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
