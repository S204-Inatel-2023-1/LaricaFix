import React from 'react'
import { InputLabel, ListItemIcon, ListItemText, MenuItem, Select, FormControl, Checkbox } from '@mui/material';

export const MulticheckSelect = ({ label, options, selected, setSelected }) => {
    const handleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all")
            return setSelected(selected.length === 0 ? options.map(opt => opt.value) : []);
        setSelected(value);
    };
    return (
        <FormControl sx={{ m: 1, width: "250px" }}>
            <InputLabel id="mutiple-select-label">{label}</InputLabel>
            <Select
                labelId="mutiple-select-label"
                multiple
                value={selected}
                onChange={handleChange}
                renderValue={(selected) => selected.map(select => options.find(opt => opt.value == select)?.label).join(", ")}
            >
                <MenuItem value="all">
                    <ListItemIcon>
                        <Checkbox checked={options.length > 0 && selected.length === options.length}
                            indeterminate={selected.length > 0 && selected.length < options.length}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Select All" />
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        <ListItemIcon>
                            <Checkbox checked={selected.indexOf(option.value) > -1} />
                        </ListItemIcon>
                        <ListItemText primary={option.label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
