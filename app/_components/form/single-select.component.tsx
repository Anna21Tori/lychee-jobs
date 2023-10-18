'use client'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";


export interface ISingleSelectProps {
    choices: { [key: string]: string },
    value: string,
    name: string,
    label: string,
    handleData: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> |  SelectChangeEvent) => void
}
const SingleSelect = (props: ISingleSelectProps) => {
    const {choices, value, name, label, handleData} = props;

    const items = Object.entries(choices).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>);
    return (
        <FormControl variant="standard" style={{width: "100%"}}>
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                id={name}
                value={value}
                onChange={handleData}
                label={label}
                name={name}
            >
                {items}
            </Select>
        </FormControl>
    );
}
export default SingleSelect;