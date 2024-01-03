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
        {
            pattern: /flex-row/,
            variants: allViewportVariants,
        },
        {
            pattern: /gap-([^-\n]*)/,
            variants: allViewportVariants,
        },
        {
            pattern: /pt-([^-\n]*)/,
            variants: allViewportVariants,
        },
        {
            pattern: /overflow-hidden/,
            variants: allViewportVariants,
        },
        {
            pattern: /flex/,
            variants: allViewportVariants,
        },
        {
            pattern: /block/,
            variants: allViewportVariants,
        },
        {
            pattern: /inline-block/,
            variants: allViewportVariants,
        },
        {
            pattern: /hidden/,
            variants: allViewportVariants,
        },
        {
            pattern: /px-([^-\n]*)/,
            variants: allViewportVariants,
        },
        {
            pattern: /grid-cols-([^-\n]*)/,
            variants: allViewportVariants,
        },
    ],
};
