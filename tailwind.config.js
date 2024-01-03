import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

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
        {
            pattern: /px-([^-\n]*)/,
            variants: ['@sm', '@md', '@lg', '@xl', '@2xl', '@3xl', '@4xl', '@5xl', '@6xl', '@7xl'],
        },
        {
            pattern: /grid-cols-([^-\n]*)/,
            variants: ['@sm', '@md', '@lg', '@xl', '@2xl', '@3xl', '@4xl', '@5xl', '@6xl', '@7xl'],
        },
    ],
};
