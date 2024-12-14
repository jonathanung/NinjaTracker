'use client';
import { useState } from "react";

interface User {
  // Define your user properties here
  // For example:
  id?: string;
  username?: string;
  [key: string]: any; // This allows for additional properties
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data: User = await response.json();
      setUser(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch user");
      setUser(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold absolute top-8">NinjaTracker</h1>
      
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-8">Student Login</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}

        {user && (
          <div className="mt-4 p-4 border rounded-md">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
