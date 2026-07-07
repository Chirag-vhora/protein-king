import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file.' });
    }

    // Wrap Cloudinary's stream-based upload in a Promise
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'king-protein/products',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    });
  } catch (error) {
    console.error('[Cloudinary Upload Error]', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to upload image to Cloudinary.', 
      error: error.message 
    });
  }
};
