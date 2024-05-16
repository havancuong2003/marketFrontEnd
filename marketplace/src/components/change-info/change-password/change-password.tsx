import clsx from "clsx";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
type ChangePasswordProps = {
    classes?: {
        [key: string]: string;
    };
    valueConfirm: string;
    valueNewPass: string;
    valueOldPass: string;
    onChangeConfirm: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeNewPass: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeOldPass: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
};

export const ChangePassword: React.FC<ChangePasswordProps> = ({
    classes,
    valueConfirm,
    valueNewPass,
    valueOldPass,
    onChangeConfirm,
    onChangeNewPass,
    onChangeOldPass,
    onClick,
}) => {
    return (
        <div className={clsx(classes?.bg, " w-full  text-white")}>
            <div className="w-full h-full  text-center">
                <div className="flex justify-center items-end h-1/6 ">
                    <h1 className={clsx(classes?.text, "")}>CHANGE PASSWORD</h1>
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
                            label="Old password"
                            variant="outlined"
                            type="password"
                            value={valueOldPass}
                            onChange={onChangeOldPass}
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
                            label="New password"
                            variant="outlined"
                            type="password"
                            value={valueNewPass}
                            onChange={onChangeNewPass}
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
                            label="Confirm password"
                            variant="outlined"
                            type="password"
                            value={valueConfirm}
                            onChange={onChangeConfirm}
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
                <div className="w-full h-1/6 ">
                    <div
                        className={clsx(classes?.btn, "w-full h-full relative")}
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
    );
};
