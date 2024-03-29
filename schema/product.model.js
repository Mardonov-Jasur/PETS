const mongoose = require("mongoose");
const {
  product_collection_enums,
  product_status_enums,
  product_volue_enums,
  product_related_enums,
  product_volume_enums,
  product_size_enums
} = require("../lib/config");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_collection: {
      type: String,
      required: true,
      enum: {
        values: product_collection_enums,
        message: "{VALUE} is not among permitted enum values"
      }
    },
    product_status: {
      type: String,
      required: false,
      default: "ACTIVE",
      enum: {
        values: product_status_enums,
        message: "{VALUE} is not among permitted enum values}"
      }
    },
    product_volume: {
      type: String,
      default: 1,
      required: function () {
        return this.product_collection === "food";
      },
      enum: {
        values: product_volume_enums,
        message: "{VALUE} is not among permitted enum values}"
      }
    },
    product_related: {
      type: String,
      required: true,
      enum: {
        values: product_related_enums,
        message: "{VALUE} is not among permitted enum values}"
      }
    },
    product_size: {
      type: String,
      default: "normal",
      required: function () {
        const sized_list = ["toys", "house", "etc"];
        return sized_list.includes(this.product_collection);
      },

      enum: {
        values: product_size_enums,
        message: "{VALUE} is not among permitted enum values}"
      }
    },
    product_price: {
      type: Number,
      required: true
    },
    product_discount: {
      type: Number,
      required: false,
      default: 0
    },
    product_color: {
      type: String,
      required: false
    },
    product_description: {
      type: String,
      required: true
    },
    product_images: {
      type: Array,
      required: true,
      default: []
    },
    product_likes: {
      type: Number,
      required: false,
      default: 0
    },
    product_views: {
      type: Number,
      required: false,
      default: 0
    },
    store_mb_id: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Member"
    }
  },
  { timestamps: true }
); //createdAt, updateAt

productSchema.index({ store_mb_id: 1, product_name: 1 }, { unique: true });

module.exports = mongoose.model("Product", productSchema);
