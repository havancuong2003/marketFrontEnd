import { Header } from "../../components";
import { ButtonInventory } from "../../components/common/inventory/button-inventory";

import avatar from "../../assets/img/avatar-account.png";
import { useAccountInformation, useActivities } from "../../hooks";
import dayjs from "dayjs";

export const Activities = () => {
    const { account } = useAccountInformation();
    const { activities } = useActivities();
    return (
        <div>
            <div>
                <Header />
            </div>

            <div className="bg-bginventory w-full h-full font-home">
                <div className="">
                    <div className="flex">
                        <div className=" w-1/4 bg-bgprofile flex justify-center text-center h-[800px] ml-24 mt-24">
                            <div className="pt-10">
                                <img src={avatar} alt="" className="pb-3 p-5" />
                                <p className="text-4xl font-semibold text-white pb-3">
                                    {account["username"]}
                                </p>
                                <p className="text-sm font-semibold text-white pb-14">
                                    #{account["id"]}
                                </p>
                                <ButtonInventory selectedItem={"Activities"} />
                            </div>
                        </div>
                        <div className="bg-bgactivities w-full ml-24 mr-24 mt-24 justify-center  ">
                            <div className="mt-5 ml-10 mr-10 h-[700px]">
                                <div>
                                    <span className="text-2xl text-white">
                                        Activities
                                    </span>
                                </div>
                                <table className=" w-full table-auto border-collapse mt-20 ">
                                    <thead className="text-[#968469] text-2xl border-b-2 border-[#B7A284] border-opacity-20 mt-5 mb-5 flex w-full">
                                        <tr className="flex w-full">
                                            <td className="w-1/5">Event</td>
                                            <td className="w-1/5">Item</td>
                                            <td className="w-1/5">Value</td>
                                            <td className="w-1/5">Opposite</td>
                                            <td className="w-1/5">Time</td>
                                        </tr>
                                    </thead>

                                    <tbody className="text-[#CCC3B5] text-sm mt-5 mb-5 flex flex-col  justify-between overflow-y-scroll w-full h-[500px]">
                                        {activities.map((item) => (
                                            <tr className="border-b border-[#B7A284] border-opacity-20 flex w-full">
                                                <td className="w-1/5 mt-5 mb-5">
                                                    {item["event"]
                                                        ? item["event"]
                                                        : "-"}
                                                </td>
                                                <td className="w-1/5 mt-5 mb-5">
                                                    ID:
                                                    {item.hero_id
                                                        ? item.hero_id
                                                        : "-"}
                                                </td>
                                                <td className="w-1/5 mt-5 mb-5">
                                                    {item.value
                                                        ? item.value + " OKG"
                                                        : "-"}
                                                </td>
                                                <td className="w-1/5 mt-5 mb-5">
                                                    {item.opposite_user_id
                                                        ? item.opposite_user_id.substring(
                                                              0,
                                                              5
                                                          ) +
                                                          "....." +
                                                          item.opposite_user_id.substring(
                                                              item
                                                                  .opposite_user_id
                                                                  .length - 8
                                                          )
                                                        : "-"}
                                                </td>
                                                <td className="w-1/5 mt-5 mb-5">
                                                    {item["time"]
                                                        ? dayjs(
                                                              item["time"]
                                                          ).format(
                                                              "DD MMM YYYY, HH:mm"
                                                          )
                                                        : "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
