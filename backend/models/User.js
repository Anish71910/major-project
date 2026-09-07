import mongoose from "mongoose";

// One shared User model for all three roles: user / organizer / admin.
// Keeping one model (instead of three) is simpler for a project this size —
// the "role" field is what drives permission checks in middleware/auth.js.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password by default in queries
    },
    role: {
      type: String,
      enum: ["user", "organizer", "admin"],
      default: "user",
    },
    favoriteCategories: {
      // used later by the AI recommendation system (Phase 7)
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
