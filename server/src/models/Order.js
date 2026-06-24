import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    // optional user reference for logged-in users
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    // keep customer details for guest/manual order workflow
    customerName: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String,
      required: true
    },
    customerPhone: {
      type: String,
      required: true
    },
    shippingAddress: {
      type: String,
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        flavor: {
          type: String,
          default: ''
        }
      }
    ],

    subtotal: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      required: true,
      default: 0
    },
    tax: {
      type: Number,
      required: true,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      default: 'Manual'
    },

    // since you are not using Razorpay yet
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },

    orderStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
export default Order;