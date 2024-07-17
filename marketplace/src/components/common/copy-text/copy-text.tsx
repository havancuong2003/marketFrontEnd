import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Tooltip } from "@mui/material";
import img_copy from "../../../assets/img/copy_1.png";
import { useState } from "react";
import clsx from "clsx";

type CopyTextProps = {
    text: string;
    classes?: {
        [key: string]: string;
    };
};

export const CopyText: React.FC<CopyTextProps> = ({ text, classes }) => {
    const [tooltipTitle, setTooltipTitle] = useState("Copy");

    const handleCopy = () => {
        setTooltipTitle("Copied");
        setTimeout(() => {
            setTooltipTitle("Copy");
        }, 3000);
    };

    return (
        <CopyToClipboard text={text} onCopy={handleCopy} className={"p-0"}>
            <Tooltip title={tooltipTitle} placement="top">
                <Button>
                    <img
                        src={img_copy}
                        alt="copy"
                        className={clsx(classes?.copy)}
                    />
                </Button>
            </Tooltip>
        </CopyToClipboard>
    );
};
