// @ts-nocheck

import { tv } from 'tailwind-variants/lite';

const buttonVariants = tv({
    // base styles for all buttons
    base: 'font-kanit flex items-center justify-center cursor-pointer drop-shadow-[0_4px_4px_rgba(0,0,0,0.05)] hover:opacity-80 transition-all duration-200',

    // all button variants
    variants: {
        shape: {
            sm: 'px-6 py-2 text-lg font-medium rounded-full',
            md: 'px-12 py-3 text-xl font-medium rounded-full',
            auth: 'px-14 py-4 text-xl rounded-3xl w-full bg-berry text-cream',
            circ: 'h-12 w-12 rounded-full p-2'
        }
    },
    // default button styles if no specified props
    defaultVariants: {
        shape: 'md'
    }
});

export default function Button({ shape, className, label, ...props }) {
    return (
        // keep it flexible with props for handlers
        <button className={buttonVariants({ shape, className })}{...props}>
            {label}
        </button>
    )
}