import { enUS } from "date-fns/locale"
import { useHistoryTrans } from "../../hooks/use-history-trans"
import { format } from "date-fns"
import { ShortId } from "../../services"
interface HistoryItem {
    id: string
    time: string
    value: number
    seller: string
    buyer: string
}

export const HistoryTrans = () => {
    const { historyTrans } = useHistoryTrans() as {
        historyTrans: HistoryItem[]
    }
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        const formattedDate = format(date, "dd MMM yyyy", { locale: enUS })
        return formattedDate
    }

    return (
        <div className="flex justify-center ">
            <div className="w-7/12 h-[421px] bg-[#170A02] mt-2 overflow-y-scroll custom-scrollbar flex justify-center ">
                <table className="text-white table-fixed">
                    <thead className="text-[#968469] ">
                        <tr className="">
                            <th className=" px-6 py-4 ">
                                <span>Time</span>
                            </th>
                            <th className="px-6 py-4 ">
                                <span>Value</span>
                            </th>
                            <th className="px-6 py-4">
                                <span>Seller</span>
                            </th>
                            <th className="px-6 py-4 ">
                                <span>Buyer</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-white ">
                        {historyTrans.map((item) => (
                            <tr key={item.id} className="px-6 py-4 ">
                                <td className="px-6 py-4 ">
                                    <span>{formatDate(item.time)}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span>{item.value} OKG</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span>{ShortId(item.seller)}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span>{ShortId(item.buyer)}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
