'use client';
import { useState } from "react";

interface Staff {
  id?: string;
  username?: string;
  [key: string]: any;
}

export default function StaffLogin() {
  const [username, setUsername] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [staff, setStaff] = useState<Staff | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, pin })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data: Staff = await response.json();
      setStaff(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setStaff(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold absolute top-8">NinjaTracker</h1>
      
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-8">Staff Login</h2>
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
          <div className="mb-4">
            <input
              type="password"
              value={pin}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Staff Login
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}

        {staff && (
          <div className="mt-4 p-4 border rounded-md">
            <pre>{JSON.stringify(staff, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
