/** @type {import('tailwindcss').Config} */

export default {
    
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                bglogin: "url('./src/assets/img/background.png')",
                login: "url('./src/assets/img/bglogin.png')",
                market: "url('./src/assets/img/bgmarket.png')",
                herocard: "url('./src/assets/img/herocard.png')",
                avarta: "url('./src/assets/img/avatar.png')",
                pre: "url('./src/assets/img/pre.png')",
                next: "url('./src/assets/img/next.png')",
                border_avatar: "url('./assets/img/boder-avatar.png')",
                bginventory: "url('./assets/img/bginventory.png')",
                bgprofile: "url('./assets/img/profile.png')"
            },
        },
    },
    plugins: [],
    
}
