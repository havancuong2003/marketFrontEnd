const Input = ({ ...inputProps }) => {
    return (
        <div>
            <input
                {...inputProps}
                className="w-[534px] h-[15px] rounded-lg bg-[#B7A284] p-7 placeholder-slate-700"
            />
        </div>
    )
}

export default Input
