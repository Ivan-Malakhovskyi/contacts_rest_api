import { app } from "./app.js";
import mongoose from "mongoose";
import { DB_HOST } from "./config.js";

const { Schema } = mongoose;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 7,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: Number,
      min: 2,
      max: 10,
      enum: ["Recent", "Blocked"],
      match: /^\d{4}$/,
      required: [true, "Phone is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// contactsSchema.index({ name: 1 });

// const Contact = mongoose.model("Contact", contactsSchema);

// const contact = new Contact({
//   phone: String,
//   email: String,
// });

// contact.methods.fullInfo = function name() {
//   return `${this.phone} ${this.email}`;
// };

//zK8igxDpYBdOCA2j

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("✔ Success conecting");
    app.listen(3000, () =>
      console.log("Server running. Use our API on port: 3000")
    );
  })
  .catch((err) => {
    console.log("❌ ooops...", err.message);
    process.exit(1); //*закриття всіх запущених процесів
  });

// console.log(process.env);
