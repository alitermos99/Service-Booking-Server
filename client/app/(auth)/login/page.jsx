'use client';

import Card from "@/app/components/ui/Card";
import Main from "@/app/components/layouts/Main";
import LoginForm from "@/app/components/forms/LoginForm";
import AuthHeader from "@/app/components/auth/AuthHeader";

export default function LoginPage() {
    return (
        <Main className={'animate-fade-up'}>
            {/* ORBS */}
            <div className="absolute orb w-96 h-96 bg-[#6c63ff] opacity-20 top-0 left-0 -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute orb w-80 h-80 bg-[#38bdf8] opacity-10 bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 w-full max-w-md">
                {/* LOGO */}
                <AuthHeader 
                    title="Welcome back"
                    subtitle="Sign in to your account to continue"
                />

                {/* CARD */}
                <Card className="p-8 rounded-3xl">
                    {/* FORM */}
                    <LoginForm />
                </Card>
            </div>
        </Main>
    );
}