const { Schema, model } = require("mongoose");

const customerProfileSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  address: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  skills: {
    type: Array,
  },
  bio: {
    type: String,
  },
  social: {
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    youtube: {
      type: String,
    },
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = model(
  "CustomerProfile",
  customerProfileSchema,
  "customer_profiles"
);
