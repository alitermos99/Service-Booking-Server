import React from 'react';
import Link from 'next/link';

const AuthFooter = ({ text, linkText, link }) => {
    return (
        <p className="text-center text-sm text-muted mt-6">
            { text }{" "}

            <Link href={link} className="text-accent">
                { linkText }
            </Link>
        </p>
    )
}

export default AuthFooter