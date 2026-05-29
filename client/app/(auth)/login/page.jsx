'use client';

import Logo from "@/app/components/ui/Logo";
import Card from "@/app/components/ui/Card";
import Main from "@/app/components/layouts/Main";
import LoginForm from "@/app/components/forms/LoginForm";

export default function LoginPage() {
    return (
        <Main>
            {/* ORBS */}
            <div className="absolute orb w-96 h-96 bg-[#6c63ff] opacity-20 top-0 left-0 -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute orb w-80 h-80 bg-[#38bdf8] opacity-10 bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 w-full max-w-md">
                {/* LOGO */}
                <div className="text-center mb-8">
                    <Logo />

                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-sm text-[#8888aa] mt-1">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* CARD */}
                <Card>
                    {/* FORM */}
                    <LoginForm />
                </Card>
            </div>
        </Main>
    );
}