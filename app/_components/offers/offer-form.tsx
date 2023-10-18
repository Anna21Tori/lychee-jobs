'use client'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, FormControl, Input, InputLabel, SelectChangeEvent, Typography } from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import SingleSelect from "../form/single-select.component";
import CustomInput from "../form/custom-input.component";
import { useRouter } from "next/navigation";
import { IOffer, experiences, operationModes, typesOfWork } from "./interfaces";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export interface OfferFormProps {
    isEdit: boolean
}

const defaultOffer: IOffer = {
    position: "",
    location: "",
    experience: "",
    operation_mode: "",
    paid_holidays: 0,
    description: "",
    type_of_work: "",
    tech_stack: [],
}

const OfferForm = (props: OfferFormProps) => {
    const [offer, setOffer] = useState(defaultOffer);
    const [techInput, setTechInput] = useState("");
    const router = useRouter()
    const {isEdit} = props;

    const handleData = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> |  SelectChangeEvent) => {
        const el = e.target;
        const value = el.value;
        const name = el.name;
        console.log(1);
        setOffer((prev) => {
            return {... prev, [name]: value}
        })
    }

    const handleTechInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> |  SelectChangeEvent) => {
        const el = e.target;
        const value = el.value;
        setTechInput(value)
    }

    const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        
        const data = {...offer, tech_stack: JSON.stringify(offer.tech_stack)};

        const result = await fetch("/api/employers/offers", {
            method: offer.id ? "PATCH" : "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
              },
        })

        if(result.status === 200 || result.status === 201){
            router.push("/")
        }

    }

    const handleMD = (md:  string) => {
        setOffer((prev) => {
            return {... prev, description: md}
        })
    }

    const addTech = (e: MouseEvent<HTMLElement>) => {
        if(techInput){
            setOffer((prev) => {
                return {... prev, tech_stack: [... prev.tech_stack, techInput]}
            })
        }
        
    }

    return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >
            <div className="row">
                <div className="col-4">
                    <CustomInput value={offer.position} label="Position" name="position" handleChange={handleData}/>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                        <CustomInput value={offer.location} label="Location" name="location" handleChange={handleData}/>
                    </div>
                </div>
            <div className="row">
                <div className="col-3">
                    <SingleSelect label="Experience" name="experience" handleData={handleData} choices={experiences} value={offer.experience}/>
                </div>
                <div className="col-3">
                    <SingleSelect label="Operation Mode" name="operation_mode" handleData={handleData} choices={operationModes} value={offer.operation_mode}/>
                </div>
                <div className="col-3">
                    <SingleSelect label="Type of work" name="type_of_work" handleData={handleData} choices={typesOfWork} value={offer.type_of_work}/>
                </div>
                <div className="col-3">
                    <CustomInput value={offer.paid_holidays} label="Paid holidays" name="paid_holidays" handleChange={handleData}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-2">
                <Accordion>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Tech Stack</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="row">
                            <div className="col-2">
                                <FormControl variant="standard" style={{width: "100%"}}>
                                    <InputLabel htmlFor="tech_name">Tech name</InputLabel>
                                    <Input id="tech_name" name="tech_name" value={techInput} onChange={handleTechInput}/>
                                </FormControl>
                            </div>
                            <div className="col-1 d-flex align-items-end">
                                <Button variant="contained" size="small" onClick={e => addTech(e)}>Add</Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex mt-3">
                                {offer.tech_stack.map(item => <Chip style={{marginRight: "5px" }} key={item} label={item} variant="outlined" onDelete={() => console.log("ok")} />)}
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-2">
                <Accordion>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>About Position</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MDEditor value={offer.description} onChange={e => e ? handleMD(e) : handleMD("")}/>
                    </AccordionDetails>
                </Accordion>
                </div>
            </div>
            <div className="row">
                <div className="col-2 offset-5 mt-2">
                    <Button variant="contained" style={{width: "100%"}} onClick={(e) => handleSubmit(e)}>{isEdit ? "Save changes": "Add"}</Button>
                </div>
            </div>
        </Box>
    )
}

export default OfferForm;