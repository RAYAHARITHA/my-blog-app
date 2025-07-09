import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export async function generateMetadata({ params }) {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug }).lean();
  return { title: post?.title || 'Post Not Found' };
}

async function getPost(slug) {
  await dbConnect();
  const post = await Post.findOne({ slug }).lean();
  if (!post) return null;
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  post.content = DOMPurify.sanitize(post.content);
  post.createdAt = post.createdAt.toISOString();
  return post;
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) return <div>Post not found.</div>;
  return (
    <div className="container">
      <article className="blog-post">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>Published on: {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}