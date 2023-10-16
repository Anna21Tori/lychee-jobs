import { Box, Button, FormControl, Input, InputLabel} from "@mui/material"
import { ICompany } from "../page"
import { ChangeEvent, MouseEvent } from "react";

export interface IAddEditFormProps {
    data: ICompany,
    handleData: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    handleSubmit: (e: MouseEvent<HTMLElement>) => void
}

const AddEditForm = (props: IAddEditFormProps) => {
    const {data, handleData, handleSubmit} = props;
    const {name, description, size, industry} = data;
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >
            <div className="row">
                <div className="col-6">
                <FormControl variant="standard" style={{width: "100%"}}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" name="name" value={name} onChange={handleData}/>
                </FormControl>
                </div>
                <div className="col-6">
                <FormControl variant="standard" style={{width: "100%"}}>
                    <InputLabel htmlFor="industry">Industry</InputLabel>
                    <Input id="industry" name="industry" value={industry} onChange={handleData}/>
                </FormControl>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                <FormControl variant="standard" style={{width: "100%"}}>
                    <InputLabel htmlFor="size">Size</InputLabel>
                    <Input id="size" name="size" value={size} onChange={handleData}/>
                </FormControl>
                </div>
                <div className="col-6">
                <FormControl variant="standard" style={{width: "100%"}}>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input id="description" name="description" value={description} onChange={handleData}/>
                </FormControl>
                </div>
            </div>
            <div className="row">
                <div className="col-2 offset-5 mt-2">
                    <Button variant="contained" style={{width: "100%"}} onClick={(e) => handleSubmit(e)}>Save</Button>
                </div>
            </div>
        </Box>
    )
}
export default AddEditForm;