import avatar from "../../assets/img/avatar.png"
import frame from "../../assets/img/grand-chief.png"

export const InfoHero = ({ hero }) => {
    return (
        <div className="container flex p-12 justify-center">
            <div className="relative flex justify-center">
                <div className=" flex justify-center">
                    <div className="flex justify-center ">
                        <div className="flex justify-center w-95%">
                            <img src={avatar} alt="avatar" className="" />
                        </div>
                        <div className="bg-black absolute w-5/6 h-10% opacity-70 text-white top-2 flex justify-center items-center">
                            <span className=" text-3xl">{hero.rank}</span>
                        </div>
                    </div>
                    <div className="absolute top-0 h-full bg-avarta bg-cover bg-center rounded-lg">
                        <img
                            src={frame}
                            alt="avatar"
                            className="w-full h-full"
                        />
                    </div>
                </div>
                <div className=" w-95% h-18 grid grid-cols-2 font-bold absolute -bottom-20 ">
                    <div className="bg-graytag bg-cover items-center flex">
                        <div className="ml-4">
                            <span>Race</span>
                            <br />
                            <span>{hero.race}</span>
                        </div>
                    </div>
                    <div className="bg-graytag bg-cover items-center flex">
                        <div className="ml-4">
                            <span>Class</span>
                            <br />
                            <span>{hero.class}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
