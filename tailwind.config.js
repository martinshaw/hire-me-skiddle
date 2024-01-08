import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

const allViewportVariants = ['@sm', '@md', '@lg', '@xl', '@2xl', '@3xl', '@4xl', '@5xl', '@6xl', '@7xl'];

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        forms,
        containerQueries,
    ],

    safelist: [
        // While I am using the VIEWPORT_ constants in utilities.ts to generate the container query Tailwind classes, these safelist entries are needed.
        { pattern: /overflow-hidden/ },
        { pattern: /flex/ },
        { pattern: /flex-row/ },
        { pattern: /block/ },
        { pattern: /inline-block/ },
        { pattern: /hidden/ },
        { pattern: /rounded-lg/ },
        { pattern: /w-(28|32)/ },
        { pattern: /gap-([^-\n]*)/ },
        { pattern: /p-([^-\n]*)/ },
        { pattern: /pt-([^-\n]*)/ },
        { pattern: /px-([^-\n]*)/ },
        { pattern: /grid-cols-([^-\n]*)/ },
        { pattern: /col-span-([^-\n]*)/ },
    ].map(item => ({
        ...item,
        variants: allViewportVariants,
    })),
};
