import React, { useState } from 'react';
import FormField from '../ui/FormField';
import PasswordField from '../ui/PasswordField';
import Button from '../ui/Button';
import AuthRoleCard from '../auth/AuthRoleCard';
import { register } from '@/app/services/authService';
import validatePassword from '@/app/validators/passwordValidator';
import LogoSpinner from '../ui/LogoSpinner';
import LoadingOverlay from '../ui/LoadingOverlay';

const RegisterForm = () => {
    const [selectedRole, setSelectedRole] = useState('customer');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        accountType: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
            accountType: selectedRole
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validatePassword(form.password)) {
            setError('Password must be at least 6 characters long and include uppercase, lowercase, number, and special character');
            return;
        }

        if(form.password !== form.confirmPassword) {
            setError('Passwords must match');
            return;
        }

        setLoading(true);

        try {
            const data = await register(form);
        } catch (error) {
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            { error && <span className='text-rose-500 text-sm'>{ error }</span> }
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <AuthRoleCard
                        onSelect={ setSelectedRole }
                        role="customer"
                        selected={ selectedRole === 'customer' }
                        title="Book services"
                        subtitle="As a customer"
                        svg={
                            <svg className="w-5 h-5 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        }
                    />

                    <AuthRoleCard
                        role="business"
                        onSelect={ setSelectedRole }
                        selected={ selectedRole === 'business' }
                        title="Manage services"
                        subtitle="As a business owner"
                        svg={
                            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        }
                    />
                </div>

                <FormField
                    required
                    label={'Name'}
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="John Doe"
                    onChange={handleChange}
                />

                <FormField
                    required
                    label={'Email address'}
                    type="email"
                    name="email"
                    value={form.email}
                    className="input-field"
                    placeholder="you@example.com"
                    onChange={handleChange}
                />

                <PasswordField
                    required
                    showStrength
                    name="password"
                    value={form.password}
                    placeholder="Min. 6 characters"
                    onChange={handleChange}
                />

                <FormField
                    required
                    label={'Confirm password'}
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    onChange={handleChange}
                />

                <div className='flex items-center gap-2'>
                    <FormField
                        required
                        name="privacypolicy"
                        type="checkbox"
                    />

                    <span className="text-sm text-muted">
                        I agree to the <span className='text-accent'>Terms of Service</span> and {' '}
                        <span className='text-accent'>Privacy Policy</span>
                    </span>
                </div>

                <Button
                    label={'Create account'}
                    className={'block text-center btn-primary text-white font-semibold py-3 mt-2 w-full'}
                    type="submit"
                    disabled={loading}
                />

                { loading && <LoadingOverlay /> }
            </form>
        </>
    )
}

export default RegisterForm