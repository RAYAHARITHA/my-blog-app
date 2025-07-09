import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this post.'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
      type: String, // Storing the HTML content from Quill
      required: [true, 'Please provide the content for this post.'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
    },
  },
  { timestamps: true } // This automatically adds createdAt and updatedAt fields
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);