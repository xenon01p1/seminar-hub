import { User, Mail, LockKeyhole } from 'lucide-react';
import FormInput from "../formInput";
import React, { useState } from 'react';

export default function ProfileForm ({ profile, setProfile }) {
  const [form, setForm] = useState({
    username: profile.username,
    email: profile.email,
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      username: form.username,
      email: form.email,
    }));

    // Clear password fields and show a confirmation message
    setForm(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
    // Using console.log instead of alert as per instructions
    console.log('Profile updated successfully! (Simulated)');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl">
      <h3 className="text-xl font-bold mb-6 text-sky-700 border-b pb-2 border-sky-100 flex items-center">
        <LockKeyhole className="w-6 h-6 mr-2" /> Update Credentials
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. Username Field */}
        <FormInput
          id="username"
          title="Username"
          value={form.username}
          onChange={handleChange}
          Icon={User}
          placeholder="Enter new username"
          isRequired={true}
        />
        
        {/* 2. Email Field */}
        <FormInput
          id="email"
          title="Email Address"
          type="email"
          value={form.email}
          onChange={handleChange}
          Icon={Mail}
          placeholder="Enter new email"
          isRequired={true}
        />
        
        {/* 3. Current Password Field */}
        <FormInput
          id="currentPassword"
          title="Current Password"
          type="password"
          value={form.currentPassword}
          onChange={handleChange}
          Icon={LockKeyhole}
          placeholder="Enter current password to confirm changes"
          isRequired={false} // Assuming current password is required only if changing email/password
        />
        
        {/* 4. New Password Field */}
        <FormInput
          id="newPassword"
          title="New Password"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          Icon={LockKeyhole}
          placeholder="Leave blank to keep current password"
          isRequired={false}
        />

        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 transform hover:scale-[1.02]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};