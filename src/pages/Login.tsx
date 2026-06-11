import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'user' && password === '1') {
      setError(null);
      login();
      navigate('/dashboard');
    } else {
      setError('Incorrect Email or Password.');
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-bg px-4 select-none">
      {/* Brand logo header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-[6px] bg-primary flex items-center justify-center">
          <span className="text-white font-semibold text-lg leading-none">CF</span>
        </div>
        <div>
          <h1 className="text-[18px] font-semibold text-text-primary leading-tight m-0">
            CareFlow CMMS
          </h1>
          <p className="text-[10px] text-text-secondary tracking-wider uppercase font-semibold m-0 mt-0.5">
            Medical Equipment
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[360px] bg-surface border border-border-custom rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <h2 className="text-[16px] font-semibold text-text-primary mb-5">
          Sign In
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-critical-bg text-critical-text border border-critical/20 rounded-[6px] text-[12.5px] leading-snug">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              required
              className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[14px] text-text-primary focus:outline-none focus:border-primary placeholder-text-hint bg-bg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="(ในที่นี้ใส่ user ได้เลย)"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[14px] text-text-primary focus:outline-none focus:border-primary placeholder-text-hint bg-bg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="(ในที่นี้ใส่ 1 ได้เลย)"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-[38px] bg-primary hover:bg-[#086E72] active:bg-primary-dark text-white text-[13px] font-semibold rounded-[6px] transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      {/* Version and Compliance note */}
      <div className="mt-5 text-center max-w-[340px]">
        <p className="text-[11px] text-text-secondary leading-normal m-0">
          CareFlow CMMS v1.0.1
        </p>
      </div>
    </div>
  );
};
