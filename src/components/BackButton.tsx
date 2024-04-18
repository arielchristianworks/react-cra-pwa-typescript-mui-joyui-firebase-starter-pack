import { useNavigate } from 'react-router-dom'
import { IconButton, IconButtonProps } from '@mui/material'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

interface IProps {
  direction?: string
  color?: IconButtonProps['color']
}

export default function BackButton(props: IProps) {
  const navigate = useNavigate()
  const { direction, color = 'primary' } = props

  return (
    <IconButton
      color={color ?? 'primary'}
      onClick={() => {
        if (direction) navigate(direction)
        else navigate(-1)
      }}
    >
      <ArrowBackOutlinedIcon />
    </IconButton>
  )
}
