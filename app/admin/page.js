'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((post) => post.slug !== slug));
      }
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <Link href="/admin/create" className="btn new-post-btn">Create New Post</Link>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item">
            <Link href={`/posts/${post.slug}`} target="_blank">{post.title}</Link>
            <div className="post-actions">
              <Link href={`/admin/edit/${post.slug}`} className="btn-edit">Edit</Link>
              <button onClick={() => handleDelete(post.slug)} className="btn-delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}