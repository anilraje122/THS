const { model, Schema } = require("mongoose");

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
    // new fields
    type: String,
  },
  isOpen: {
    type: String,
    default: false,
  },
  skills: {
    type: Array,
    required: true,
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
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
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
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
