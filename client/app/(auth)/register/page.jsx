import Main from '@/app/components/layouts/Main'
import React from 'react'
import AuthHeader from '@/app/components/auth/AuthHeader';
import Card from '@/app/components/ui/Card';
import AuthRoleCard from '@/app/components/auth/AuthRoleCard';

const RegisterPage = () => {
    return (
        <Main className={'animate-fade-up'}>
            <div className="absolute orb w-96 h-96 bg-accent opacity-20 top-0 left-0 -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute orb w-80 h-80 bg-[#38bdf8] opacity-10 bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 w-full max-w-md">
                <AuthHeader 
                    title="Create your account"
                    subtitle="Start booking or managing services today"
                />

                <Card className='p-8 rounded-3xl'>
                    <p className='text-sm font-medium text-tx mb-3'>I want to...</p>

                    <div class="grid grid-cols-2 gap-3 mb-6">
                        <AuthRoleCard 
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
                </Card>
            </div>
        </Main>
    )
}

export default RegisterPage