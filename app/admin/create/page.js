'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuillEditor from '../../../components/QuillEditor'; // <-- CHECK THIS PATH

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong.');
    }
  };

  return (
    <div className="container">
      <h1>Create New Post</h1>
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
        <button type="submit" className="btn">Create Post</button>
      </form>
    </div>
  );
}