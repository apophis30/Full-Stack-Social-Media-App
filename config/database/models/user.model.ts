import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/023/465/688/original/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg",
  },
  bio: {
    type: String,
    maxlength: 250,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model("User", UserSchema);
