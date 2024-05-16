import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const BasicModal = ({ open, onClose, modalContent, style }) => {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: 24,
        p: 4,
        width: "90%", // Set width to 90%
        height: "70%",
        padding: 0,
        border: "none",
        ...style,
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <div className="w-full h-full">{modalContent}</div>
            </Box>
        </Modal>
    );
};

export default BasicModal;
