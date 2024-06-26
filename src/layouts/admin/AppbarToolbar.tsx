// import { useState } from 'react'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
// import MoreIcon from '@mui/icons-material/MoreVert'
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuth } from '../../hooks/auth'

// import AdminAccountMenu from './AccountMenu';
// import AdminAccountMenuMobile from './AccountMenuMobile';

interface IProps {
  open: boolean
  title: string
  handleDrawerOpen: any
}

export default function AdminAppbarToolbar(props: IProps) {
  const { open, handleDrawerOpen } = props
  const { title } = props
  const { Logout } = useAuth()

  // const [AccountMenuAnchor, setAccountMenuAnchor] = useState(null)
  // const handleAccountMenuOpen = (e: any) => {
  //   setAccountMenuAnchor(e.currentTarget)
  // }
  // const handleAccountMenuClose = (e: any) => {
  //   setAccountMenuAnchor(null)
  // }
  // const [MobileAccountMenuAnchor, setMobileAccountMenuAnchor] = useState(null)
  // const handleMobileAccountMenuOpen = (e: any) => {
  //   setMobileAccountMenuAnchor(e.currentTarget)
  // }
  // const handleMobileAccountMenuClose = (e: any) => {
  //   setMobileAccountMenuAnchor(null)
  // }

  return (
    <Stack direction='row' alignItems='center' sx={{ px: 2, py: 1 }}>
      <IconButton
        color='neutral'
        aria-label='open drawer'
        onClick={handleDrawerOpen}
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Typography level='body-lg' noWrap component='div'>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button color='danger' variant='soft' size='sm' onClick={() => Logout()}>
        Logout
      </Button>
    </Stack>
  )
}

// <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//   {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//     <Badge badgeContent={4} color="secondary">
//       <MailIcon />
//     </Badge>
//   </IconButton>
//   <IconButton
//     size="large"
//     aria-label="show 17 new notifications"
//     color="inherit"
//   >
//     <Badge badgeContent={17} color="secondary">
//       <NotificationsIcon />
//     </Badge>
//   </IconButton> */}
//   {/* <IconButton
//     size="large" edge="end" color="inherit"
//     // aria-controls={menuId}
//     aria-haspopup="true"
//     onClick={handleAccountMenuOpen}
//     sx={{ padding: 0.5, marginLeft: 0.5 }}
//   >
//     <Avatar alt={"User Photo Alt"} src={""} />
//   </IconButton> */}
//   <IconButton
//     size='lg'
//     color='neutral'
//     // aria-controls={menuId}
//     aria-haspopup='true'
//     // onClick={handleAccountMenuOpen}
//   >
//     <AccountCircleIcon />
//   </IconButton>
//   {/* <AdminAccountMenu anchorEl={AccountMenuAnchor} handleClose={handleAccountMenuClose} /> */}
// </Box>
// {/* Versi Small */}
// <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//   <IconButton
//     size='sm'
//     aria-label='show more'
//     // aria-controls={mobileMenuId}
//     aria-haspopup='true'
//     // onClick={handleMobileAccountMenuOpen}
//     color='neutral'
//   >
//     <MoreIcon fontSize='inherit' />
//   </IconButton>
//   {/* <AdminAccountMenuMobile anchorEl={MobileAccountMenuAnchor} handleClose={handleMobileAccountMenuClose} /> */}
// </Box>
