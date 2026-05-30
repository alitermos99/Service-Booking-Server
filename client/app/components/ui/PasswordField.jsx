import React from 'react'
import FormField from './FormField'
import { useState } from 'react';
import Button from './Button';

const LABELS = ['Weak','Fair','Good','Strong'];
const COLORS = ['bg-weak','bg-fair','bg-good','bg-strong'];

const PasswordField = ({ label = "Password", showStrength = false, ...rest }) => {
    const [score, setScore] = useState(0);
    const [show, setShow] = useState(false);
    const [strength, setStrength] = useState(null);
    const [text, setText] = useState("Enter a password");

    const handleInput = (event) => {
        let score = 0;
        const { value } = event.target;

        if(value.length >= 6) score++
        if(/[A-Z]/.test(value)) score++;
        if(/[0-9]/.test(value)) score++;
        if(/[^A-Za-z0-9]/.test(value)) score++;

        setScore(() => score);
        setText(() => score ? LABELS[score - 1] : "Enter a password");
        setStrength(() => score ? COLORS[score - 1] : "bg-[rgba(255,255,255,0.1)]");
    }

    return (
        <div className="relative">
            <FormField
                label={ label }
                type={show ? "text" : "password"}
                onInput={handleInput}
                { ...rest }
            />

            <Button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-9 text-[#8888aa]"
                label={show ? "⌣" : "👁"}
            />

            {
                showStrength && 
                (
                    <div>
                        <div className='mt-2 flex gap-1'>
                            {
                                [1, 2, 3, 4].map((level) => (
                                    <div key={level}
                                        className={`
                                            h-0.75 w-full rounded-full transition duration-300 bg-[rgba(255,255,255,0.1)]
                                            ${
                                                level <= score ? strength : ''
                                            }
                                        `}
                                    >
                                    </div>
                                ))
                            }
                        </div>

                        <span className='text-xs text-muted mt-1'>{ text }</span>
                    </div>
                )
            }
        </div>
    )
}

export default PasswordField