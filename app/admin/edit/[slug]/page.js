'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuillEditor from '../../../../../components/QuillEditor'; // <-- CHECK THIS PATH

export default function EditPost({ params }) {
  const { slug } = params;
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.data.title);
        setContent(data.data.content);
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to update post.');
    }
  };

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Content</label>
          <QuillEditor value={content} onChange={setContent} />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Update Post</button>
      </form>
    </div>
  );
}