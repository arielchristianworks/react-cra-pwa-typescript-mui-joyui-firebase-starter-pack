import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'

interface IProps {
  title?: string
  children?: JSX.Element
  elevation?: number
  titleProps: any
}

export default function MyAccordion(props: IProps) {
  const { title = '', children, titleProps } = props
  return (
    <Accordion>
      <AccordionSummary>
        <Typography fontWeight={'bold'} {...titleProps}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
