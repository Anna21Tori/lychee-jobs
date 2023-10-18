'use client'
import { FormControl, Input, InputLabel, SelectChangeEvent } from "@mui/material"
import { ChangeEvent } from "react"

interface ICustomInputProps {
    name: string,
    label: string
    handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> |  SelectChangeEvent) => void
    value: string | number,
}
const CustomInput = (props: ICustomInputProps) => {
    const {name, handleChange, value, label } = props;
    return (
        <FormControl variant="standard" style={{width: "100%"}}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Input id={name} name={name} value={value} onChange={handleChange}/>
        </FormControl>
    )
}
export default CustomInput;