import { useState, useEffect, useRef, Fragment } from 'react'
import { useLocation } from 'react-router-dom'

// import { styled, useTheme } from '@mui/material/styles'
import { Box, Divider, Drawer, LinearProgress, Stack, Typography } from '@mui/material'

// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
// import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import AdminAppbarToolbar from './AppbarToolbar'
import AdminDrawerList from './DrawerList'
import { myScrollToRef } from '../../utils/myScrollToRef'
import { useAuth } from '../../hooks/auth'

// const drawerWidth = 270

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   // padding: theme.spacing(useMediaQuery(theme.breakpoints.up('md'))?3:2),
//   // paddingBottom: 0,
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: useMediaQuery(theme.breakpoints.up('md'))?`-${drawerWidth}px`:0,
//   ...(open && {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && useMediaQuery(theme.breakpoints.up('md')) && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

interface IProps {
  sx?: any
  title?: string
  isLoading?: boolean
  openBackdrop?: boolean
  handleBackdropClick?: () => void
  children: JSX.Element | any
  // fabConfig?: IFabConfig
}

export default function AdminLayout(props: IProps) {
  const location = useLocation()
  const { userNow } = useAuth()
  // const theme = useTheme()

  const { sx, children } = props
  const { isLoading } = props
  const { title = 'Logs' } = props

  // const navData = {
  //   alt: 'Logo Aplikasi',
  //   title: 'Logo Aplikasi',
  //   path: '/images/logo.png'
  // }

  const mainDivRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!!mainDivRef && !!mainDivRef.current) {
      myScrollToRef(mainDivRef)
    }
  }, [location.pathname, mainDivRef])

  const [open, setOpen] = useState<boolean>(false)
  // useEffect(() => { setOpen(upMd) }, [upMd])
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ ...sx }}>
      <AdminAppbarToolbar title={title} open={open} handleDrawerOpen={handleDrawerOpen} />
      {isLoading ? <LinearProgress color='primary' /> : <Divider />}
      <Drawer
        // sx={{
        //   width: drawerWidth,
        //   flexShrink: 0,
        //   '& .MuiDrawer-paper': {
        //     width: drawerWidth,
        //     boxSizing: 'border-box'
        //   }
        // }}
        variant='soft'
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
        // onMouseLeave={() => setOpen(false)}
      >
        {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader> */}
        {/* <Divider /> */}
        {/* <Stack direction='row' justifyContent='center' alignItems='center' sx={{ p: 3 }}>
          <Box
            component='img'
            loading='lazy'
            alt={navData.alt}
            title={navData.title}
            src={navData.path}
            width={'50%'}
          />
        </Stack> */}
        {!!userNow ? (
          <Fragment>
            <Box sx={{ py: 1, px: 1.5 }}>
              <Typography>Welcome, {userNow.email}</Typography>
            </Box>
            <Divider />
          </Fragment>
        ) : null}

        <AdminDrawerList setOpenDrawer={setOpen} />
      </Drawer>
      <Box>
        {/* <DrawerHeader /> */}
        <Box ref={mainDivRef} children={children} sx={{ minHeight: '92vh', p: 2 }} />
        <Divider />
        <Stack sx={{ p: 2 }}>
          <Typography level='body-md' fontStyle='italic' fontFamily='Arial'>
            {'Credits for '}
            <Typography
              level='inherit'
              component='a'
              target='_blank'
              href={'https://github.com/arielchristianworks'}
              color='primary'
              fontWeight='bold'
            >
              {'arielchristianworks'}
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
