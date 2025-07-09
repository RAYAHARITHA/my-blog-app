import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QuillEditor from '../../../components/QuillEditor';

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // Fetch the specific post data when the component mounts or slug changes
  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.data.title);
        setContent(data.data.content);
      } else {
        setError('Failed to fetch post. It may not exist.');
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert('Post updated successfully!');
      router.push('/admin'); // Redirect back to the dashboard
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to update post.');
    }
  };

  return (
    <div className="container">
      <h1>Edit Post</h1>
      { !title && !error ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <QuillEditor value={content} onChange={setContent} />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">Update Post</button>
        </form>
      )}
    </div>
  );
}