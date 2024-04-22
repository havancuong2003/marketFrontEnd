import clsx from "clsx"

type InputProps = {
    classes?: {
        [key: string]: string
    }
}

export const Input: React.FC<InputProps> = ({ classes, ...inputProps }) => {
    return (
        <div>
            <input
                {...inputProps}
                className={clsx(
                    classes?.inputSize,
                    " rounded-lg bg-[#B7A284] p-1 mx-2 lg:p-7 placeholder-slate-700"
                )}
            />
        </div>
    )
}
