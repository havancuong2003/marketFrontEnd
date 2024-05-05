/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            textColor:{
                'my-brown': '#423429',
                'light-brown':'#B7A284',
                'dark-brown':'#2D1D11',
                'dark-yellow': '#968469',
                'main':'#F1E9DC'

            },
            backgroundColor:{
                'brown-op':'#170A02CC',
                'light-brown':'#B7A284',
                'bg-black':'#151515',
                'my-brown': '#423429',
                'brown-black':'#170A02'
            },
            borderColor:{
                'light-brown':'#B7A284',
            },
            fontFamily: {
            'Skranji': ['Skranji', 'sans-serif'],
            'Nunito': ['Nunito Sans', 'sans-serif'],
            'Avenir':['Avenir', 'sans-serif']
            },
            height:{
                '17%':'17%',
                '18':'18%',
                '19%':'19%',
                '43%':'43%',
                '29%':'29%',
                '11%':'11%',
                '95%': '95%',
                '90%': '90%',
                 "99%": "99%",
            },
            width: {
                "48%": "48%",
                "41%": "41%",
                "33%": "33%",
                "53%": "53%",
                "79%": "79%",
                "95%": "95%",
                "99%": "99%",
            },
            backgroundImage: {
                bglogin: "url('../src/assets/img/background.png')",
                login: "url('../src/assets/img/bg-login.png')",
                market: "url('../src/assets/img/bg-market.png')",
                herocard: "url('../src/assets/img/hero-card.png')",
                avarta: "url('../src/assets/img/avatar.png')",
                pre: "url('../src/assets/img/pre.png')",
                next: "url('../src/assets/img/next.png')",
                bginfo: "url('../src/assets/img/detail-hero.png')",
                frame: "url('../src/assets/img/grand-chief.png')",
                graytag: "url('../src/assets/img/gray-tag.png')",
                bgdetail: "url('../src/assets/img/bg-detail.png')",
                group36885: "url('../src/assets/img/group36885.png')",
                frame36889: "url('../src/assets/img/frame36889.png')",
                framebuy: "url('../src/assets/img/frame_buy.png')",
                rectangle2580: "url('../src/assets/img/Rectangle2580.png')",
                yellow_m_button: "url('../src/assets/img/Yellow_M.png')",
                carddetail: "url('./src/assets/img/carddetailhero.png')",
                bgdetailhero: "url('./src/assets/img/detailhero.png')",
                nav: "url('./src/assets/img/nav.png')",
                bgconfirm: "url('../src/assets/img/confirm_listing.png)",
                bginventory: "url('./assets/img/bginventory.png')",
                bgprofile: "url('../src/assets/img/profile.png')",
                yellow_l: "url('../src/assets/img/Yellow_L.png')",
                group37032: "url('../src/assets/img/Group37032.png')",
                
                bgactivities: "url('../src/assets/img/bgactivities.png')",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
}
