import { To } from "react-router-dom"
// import { InputLabelProps, SelectProps } from "@mui/material"

export interface BreadCrumbItems {
  label: string
  path: To
}

export interface IInputSelectProps {
  // controllerProps: any
  formControlProps: Object
  inputLabelProps: any
  selectProps: any
  options: { value: string, label: string }[]
}