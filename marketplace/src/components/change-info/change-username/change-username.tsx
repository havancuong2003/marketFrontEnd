import clsx from "clsx";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
type ChangeUserNameProps = {
    classes?: {
        [key: string]: string;
    };
    value: string;
    onChange: () => void;
    onClick: () => void;
};

export const ChangeUserName: React.FC<ChangeUserNameProps> = ({
    classes,
    value,
    onChange,
    onClick,
}) => {
    return (
        <div className={clsx(classes?.bg, " w-full  text-white")}>
            <div className="h-full">
                <div className="w-full h-full  text-center">
                    <div className="flex justify-center items-end h-1/6 ">
                        <h1 className={clsx(classes?.text, "")}>
                            CHANGE USERNAME
                        </h1>
                    </div>
                    <div className="w-full h-1/6 flex justify-center items-start relative">
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                "& > :not(style)": { m: 1, flex: 1 },
                                marginTop: "50px",
                                width: "90%",
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label="New UserName"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                sx={{
                                    backgroundColor: "#B7A284",
                                    borderRadius: "5px",
                                    "& label": {
                                        color: "white", // Màu chữ mặc định
                                    },
                                    "& fieldset": {
                                        borderColor: "none", // Màu border mặc định
                                    },
                                    "&:focus-within label": {
                                        color: "white", // Thay đổi màu chữ thành màu xanh khi focus
                                        fontSize: "20px",
                                    },
                                    "&:focus-within fieldset": {
                                        borderColor: "#B7A284 !important", // Thay đổi màu border thành màu xanh khi focus
                                    },
                                }}
                                InputProps={{
                                    sx: {
                                        color: "white", // Thay đổi màu chữ của input thành màu xanh
                                    },
                                }}
                            />
                        </Box>
                    </div>
                    <div className="w-full h-1/6 absolute top-1/3 left-0 ">
                        <div
                            className={clsx(
                                classes?.btn,
                                "w-full h-full relative"
                            )}
                        >
                            <span
                                className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-6"
                                onClick={onClick}
                            >
                                Save
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
