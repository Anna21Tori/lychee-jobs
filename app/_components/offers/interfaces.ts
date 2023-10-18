type TExperience = "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "";
type TOperationMode = "HYBRID" | "REMOTE" | "OFFICE" | "";
type TTypesOfWork = "FULL-TIME" | "PART-TIME" | "INTERNSHIP" | "";

export const experiences = {
    "INTERN": "Intern",
    "JUNIOR": "Junior",
    "MID": "Mid/Rgular",
    "SENIOR": "Senior"
}

export const operationModes = {
    "HYBRID": "Hybrid",
    "REMOTE": "Remote",
    "OFFICE": "Office"
}

export const typesOfWork = {
    "FULL-TIME": "Full-Time",
    "PART-TIME": "Part-Time",
    "INTERNSHIP": "Internship"
}

export interface ISalary {
    amount: number,
    isGross: boolean,
    per: string,
    type: string
}

export interface IOffer {
    id?: number,
    position: string,
    location: string,
    experience: TExperience,
    operation_mode: TOperationMode,
    paid_holidays: number,
    description: string,
    type_of_work: TTypesOfWork,
    tech_stack: string[],
}