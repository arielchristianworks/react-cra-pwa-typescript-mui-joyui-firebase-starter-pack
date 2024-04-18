import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material'

interface IProps {
  value?: number
  variant: LinearProgressProps['variant']
}

export default function LinearProgressWithLabel(props: IProps) {
  const { value = 100, variant = 'soft' } = props
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress {...props} variant={variant} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography level='body-md' color='neutral'>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}
