'use client'; // Required for forms and hooks

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' in app router
import QuillEditor from '../../../components/QuillEditor'; // Adjusted path

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        router.push('/admin'); // Redirect to admin dashboard
        router.refresh(); // Refresh the page to show the new post
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="container">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the post title"
          />
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