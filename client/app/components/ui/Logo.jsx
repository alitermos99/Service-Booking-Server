import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <>
      	<Link
			href="/"
			className="flex items-center gap-2.5 font-['Syne',sans-serif] text-[1.3rem] font-extrabold text-text no-underline mb-16"
		>
			<span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
			ReservEase
      	</Link>
    </>
  )
}

export default Logo