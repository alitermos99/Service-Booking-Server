'use client'
import React, { useState } from 'react';
import Logo from '@/app/components/ui/Logo';

const RegisterPage = () => {
	const [showPwd, setShowPwd] = useState(false);
	const [showCPwd, setShowCPwd] = useState(false);
	const [role, setRole] = useState('customer');

  	return (
		<div className="flex min-h-screen font-['DM_Sans',sans-serif] bg-bg text-text">

		{/* Left Panel */}
		<div className="w-120 min-h-screen bg-surface border-r border-border flex flex-col justify-between p-12 relative overflow-hidden shrink-0">
			
			{/* Background gradients */}
			<div className="absolute inset-0 z-0"
			style={{background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(108,99,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(56,189,248,0.08) 0%, transparent 60%)'}}
			/>
			{/* Grid */}
			<div className="absolute inset-0 z-0"
			style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px'}}
			/>

			<div className="relative z-10">
				{/* Logo */}
				<Logo />

			{/* Tagline */}
			<div className="font-['Syne',sans-serif] text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.04em] mb-5">
				Start managing<br />your bookings<br />
				<span className="bg-linear-to-br from-accent2 to-accent3 bg-clip-text text-transparent">today</span>
			</div>

			<p className="text-muted text-[0.95rem] leading-[1.7] max-w-[320px] mb-12">
				Join thousands of business owners who trust ReservEase to streamline their scheduling.
			</p>

			{/* Features */}
			<div className="flex flex-col gap-4">
				{[
				{ icon: '🚀', title: 'Quick setup', desc: 'Get started in minutes, not days' },
				{ icon: '🔒', title: 'Secure & reliable', desc: 'Enterprise-grade security built-in' },
				{ icon: '⚡', title: 'Lightning fast', desc: 'Optimized for speed and reliability' },
				].map(({ icon, title, desc }) => (
				<div key={title} className="flex items-start gap-3.5">
					<div className="w-9 h-9 rounded-[10px] bg-[rgba(108,99,255,0.15)] border border-[rgba(108,99,255,0.25)] flex items-center justify-center text-base shrink-0">
					{icon}
					</div>
					<div>
					<strong className="block text-[0.9rem] font-semibold mb-0.5">{title}</strong>
					<span className="text-[0.82rem] text-muted">{desc}</span>
					</div>
				</div>
				))}
			</div>
			</div>

			<div className="relative z-10 text-[0.8rem] text-muted">
			© 2025 ReservEase · Privacy · Terms
			</div>
		</div>

		{/* Right Panel */}
		<div className="flex-1 flex items-center justify-center px-10 py-16">
			<div className="w-full max-w-105">

			{/* Header */}
			<div className="mb-9">
				<h1 className="font-['Syne',sans-serif] text-[1.8rem] font-extrabold tracking-[-0.03em] mb-2">
				Create account
				</h1>
				<p className="text-muted text-[0.9rem]">
				Already have an account?{' '}
				<a href="/login" className="text-accent2 no-underline">Sign in →</a>
				</p>
			</div>

			{/* Role Selector */}
			<div className="grid grid-cols-2 gap-3 mb-7">
				{[
				{ value: 'customer', icon: '👤', label: 'Customer' },
				{ value: 'admin',    icon: '🏢', label: 'Business' },
				].map(({ value, icon, label }) => (
				<div
					key={value}
					onClick={() => setRole(value)}
					className={`p-4 rounded-[10px] border-2 bg-surface cursor-pointer text-center transition-all
					${role === value
						? 'border-accent bg-[rgba(108,99,255,0.1)]'
						: 'border-border2 hover:border-border3'
					}`}
				>
					<div className="flex flex-col items-center gap-2 text-[0.9rem] font-semibold cursor-pointer">
					<span className="text-2xl">{icon}</span>
					<span>{label}</span>
					</div>
				</div>
				))}
			</div>

			{/* Social Buttons */}
			<div className="flex gap-3 mb-7">
				{[{ icon: 'G', label: 'Google' }, { icon: '⌘', label: 'Apple' }].map(({ icon, label }) => (
				<a key={label} href="#"
					className="flex-1 flex items-center justify-center gap-2 py-[11px] rounded-[10px] border border-border2 bg-surface text-text text-[0.88rem] font-medium no-underline transition-all hover:border-border3 hover:bg-surface2">
					<span>{icon}</span> {label}
				</a>
				))}
			</div>

			{/* Divider */}
			<div className="flex items-center gap-3.5 mb-7 text-muted text-[0.8rem] before:flex-1 before:h-px before:bg-border after:flex-1 after:h-px after:bg-border">
				or continue with email
			</div>

			{/* Form */}
			<div>
				{/* Name row */}
				<div className="grid grid-cols-2 gap-3 mb-5">
				{[{ id: 'fname', label: 'First name', placeholder: 'John' }, { id: 'lname', label: 'Last name', placeholder: 'Doe' }].map(({ id, label, placeholder }) => (
					<div key={id}>
					<label htmlFor={id} className="block text-[0.82rem] font-semibold text-muted mb-2 tracking-[0.02em]">{label}</label>
					<div className="relative">
						<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-[0.9rem] pointer-events-none">👤</span>
						<input id={id} type="text" placeholder={placeholder} className="w-full pl-10 pr-3.5 py-3 rounded-[10px] border border-border2 bg-surface text-text text-[0.9rem] outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] placeholder:text-muted" />
					</div>
					</div>
				))}
				</div>

				{/* Email */}
				<div className="mb-5">
				<label htmlFor="email" className="block text-[0.82rem] font-semibold text-muted mb-2 tracking-[0.02em]">Email address</label>
				<div className="relative">
					<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">✉</span>
					<input id="email" type="email" placeholder="you@example.com" className="w-full pl-10 pr-3.5 py-3 rounded-[10px] border border-border2 bg-surface text-text text-[0.9rem] outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] placeholder:text-muted" />
				</div>
				</div>

				{/* Password */}
				{[
				{ id: 'password', label: 'Password', placeholder: 'Create a strong password', show: showPwd, toggle: () => setShowPwd(p => !p) },
				{ id: 'cpassword', label: 'Confirm password', placeholder: 'Confirm your password', show: showCPwd, toggle: () => setShowCPwd(p => !p) },
				].map(({ id, label, placeholder, show, toggle }) => (
				<div key={id} className="mb-5">
					<label htmlFor={id} className="block text-[0.82rem] font-semibold text-muted mb-2 tracking-[0.02em]">{label}</label>
					<div className="relative">
					<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">🔒</span>
					<input id={id} type={show ? 'text' : 'password'} placeholder={placeholder}
						className="w-full pl-10 pr-14 py-3 rounded-[10px] border border-border2 bg-surface text-text text-[0.9rem] outline-none transition focus:border-accent focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] placeholder:text-muted" />
					<button type="button" onClick={toggle}
						className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-muted text-[0.85rem] p-0">
						{show ? 'Hide' : 'Show'}
					</button>
					</div>
				</div>
				))}

				{/* Terms */}
				<div className="mb-5">
				<label className="flex items-center gap-2 text-[0.85rem] text-muted cursor-pointer">
					<input type="checkbox" required className="w-auto p-0" />
					I agree to the{' '}
					<a href="#" className="text-accent2 no-underline">Terms of Service</a>
					{' '}and{' '}
					<a href="#" className="text-accent2 no-underline">Privacy Policy</a>
				</label>
				</div>

				{/* Submit */}
				<button type="button"
				className="w-full py-2.25 rounded-[10px] border-none bg-accent text-white text-base font-semibold cursor-pointer transition-all shadow-[0_4px_20px_rgba(108,99,255,0.35)] hover:bg-[#7c74ff] hover:shadow-[0_4px_30px_rgba(108,99,255,0.5)] active:scale-[0.99]">
				Create account →
				</button>
			</div>

			<div className="text-center mt-6 text-[0.85rem] text-muted">
				Already have an account?{' '}
				<a href="/login" className="text-accent2 no-underline">Sign in</a>
			</div>
			</div>
		</div>
	</div>
  	);
}

export default RegisterPage