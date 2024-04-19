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
                carddetail: "url('./src/assets/img/carddetailhero.png')",
                bgdetailhero: "url('./src/assets/img/detailhero.png')",
                nav: "url('./src/assets/img/nav.png')",
            },
        },
    },
    plugins: [],
}
