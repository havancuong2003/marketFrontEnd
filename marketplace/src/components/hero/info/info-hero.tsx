import avatar from "../../../assets/img/avatar.png";
import frame from "../../../assets/img/grand-chief.png";
export const InfoHero = ({
    hero,
    // name,
    // price,
    // hp,
    // speed,
    // dps,
    // atk,
    // race,
    // classes,
    // avatar,
    // rank,
    // status,
}) => {
    return (
        <div className="container flex p-12 justify-center">
            <div className="relative flex justify-center">
                <div className=" flex justify-center">
                    <img src={avatar} className="rounded-3xl " />
                    <div className="bg-black absolute w-full h-[60px] opacity-70  top-2 flex justify-center items-center">
                        <span className=" text-2xl">{hero.rank}</span>
                    </div>
                    <img
                        src={frame}
                        className="w-full h-full absolute  bg-cover bg-center rounded-lg"
                    />
                </div>
                <div className=" w-full h-18 grid grid-cols-2 font-bold absolute -bottom-20 text-dark-brown ">
                    <div className="bg-graytag bg-cover items-center flex">
                        <div className="ml-4">
                            <span>Race</span>
                            <br />
                            <span className="font-Skranji text-3xl ">
                                {hero.race}
                            </span>
                        </div>
                    </div>
                    <div className="bg-graytag bg-cover items-center flex ">
                        <div className="ml-4">
                            <span>Class</span>
                            <br />
                            <span className="font-Skranji text-3xl ">
                                {hero.class}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
