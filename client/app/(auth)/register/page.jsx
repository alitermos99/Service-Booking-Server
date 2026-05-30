'use client'

import React, { useState } from 'react'
import Main from '@/app/components/layouts/Main'
import AuthHeader from '@/app/components/auth/AuthHeader';
import Card from '@/app/components/ui/Card';
import RegisterForm from '@/app/components/forms/RegisterForm';
import AuthFooter from '@/app/components/auth/AuthFooter';

const RegisterPage = () => {
    return (
        <Main className={'animate-fade-up'}>
            <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-[#a78bfa] top-0 right-0 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
            <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-10 bg-[#38bdf8] bottom-0 left-0 -translate-x-1/3 translate-y-1/3 pointer-events-none"/>

            <div className="relative z-10 w-full max-w-lg">
                <AuthHeader 
                    title="Create your account"
                    subtitle="Start booking or managing services today"
                />

                <Card>
                    <p className='text-sm font-medium text-tx mb-3'>I want to...</p>

                    <RegisterForm />

                    <AuthFooter 
                        text="Already have an account?"
                        linkText="Sign in →"
                        link="/login"
                    />
                </Card>
            </div>
        </Main>
    )
}

export default RegisterPage