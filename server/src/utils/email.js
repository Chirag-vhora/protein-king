import nodemailer from 'nodemailer';

/**
 * Creates a configured Nodemailer transporter using SMTP environment variables.
 * @returns {import('nodemailer').Transporter}
 */
export const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Use secure connection for port 465 (SMTPS), otherwise starttls is used
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Sends a structured HTML email notification containing new order details to the configured admin email.
 * @param {object} order - The saved and populated order object.
 * @returns {Promise<object|null>}
 */
export const sendAdminOrderNotification = async (order) => {
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'ADMIN_EMAIL'];
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    console.warn(
      `[Email Service] Missing configuration variables: ${missing.join(', ')}. Skipping admin email notification.`
    );
    return null;
  }

  const adminEmail = process.env.ADMIN_EMAIL;

  try {
    const transporter = getTransporter();

    // Map through the items to build HTML table rows
    const itemsHtml = order.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          item.product ? item.product.name : 'Unknown Product'
        }</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.flavor || 'N/A'}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      </tr>
    `
      )
      .join('');

    const formattedDate = order.createdAt
      ? new Date(order.createdAt).toLocaleString()
      : new Date().toLocaleString();

    const totalAmountVal =
      typeof order.totalAmount === 'number'
        ? order.totalAmount.toFixed(2)
        : order.totalAmount;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Order Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <h2 style="color: #1a1a1a; border-bottom: 2px solid #eaeaea; padding-bottom: 10px; margin-top: 0;">New Order Notification</h2>
    <p>A new order has been successfully placed on the store. Below are the details:</p>

    <h3 style="color: #2c3e50; border-bottom: 1px solid #eaeaea; padding-bottom: 5px;">Order Summary</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 35%; border-bottom: 1px solid #f1f1f1;">Order ID:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1;">${order._id}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f1f1;">Date/Time:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1;">${formattedDate}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f1f1;">Total Amount:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1; font-weight: bold; color: #e74c3c;">$${totalAmountVal}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f1f1;">Payment Method:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1;">${order.paymentMethod || 'Manual'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f1f1;">Payment Status:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1;">${order.paymentStatus || 'Pending'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f1f1;">Order Status:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1;">${order.orderStatus || 'Pending'}</td>
      </tr>
    </table>

    <h3 style="color: #2c3e50; border-bottom: 1px solid #eaeaea; padding-bottom: 5px;">Customer Details</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 35%; border-bottom: 1px solid #f1f1f1;">Customer Name:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1;">${order.customerName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f1f1;">Email:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1;"><a href="mailto:${order.customerEmail}">${order.customerEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f1f1;">Phone:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1;">${order.customerPhone}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f1f1f1;">Shipping Address:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f1f1; white-space: pre-wrap;">${order.shippingAddress}</td>
      </tr>
    </table>

    <h3 style="color: #2c3e50; border-bottom: 1px solid #eaeaea; padding-bottom: 5px;">Ordered Items</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Product Name</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Flavor</th>
          <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Quantity</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
  </div>
</body>
</html>
`;

    const mailOptions = {
      from: `"AURA PERFORMANCE Store" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `[New Order] Order #${order._id} - ${order.customerName}`,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Admin order notification sent successfully. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[Email Service] Error occurred while sending email: ${error.message}`);
    throw error;
  }
};
