import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const FilterInventory = ({name,actionValues, eventSearch, handleChange}) => {
    return (
        <div>
            <FormControl
                sx={{
                    m: 1,
                    minWidth: 100, // Default minWidth
                    "@media (max-width: 768px)": {
                        minWidth: 300, // Adjust minWidth for screens with max-width of 600px
                    },
                    "& .MuiInputLabel-root": {
                        // Màu text của InputLabel
                        color: "#F1E9DC",
                    },
                    "& .MuiInputBase-root": {
                        color: "#F1E9DC", // Màu text của Select khi không focus
                    },

                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                            borderColor: "#B7A284",
                        },
                        backgroundColor: "#170A02CC",
                }}
                size="small"
            >
                <InputLabel id="demo-select-small-label">Search {name}</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={eventSearch}
                    label={eventSearch}
                    onChange={handleChange}
                >
                    <MenuItem value="ALL">
                        <span>ALL</span>
                    </MenuItem>
                    {actionValues.map((value) => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
