import { Fragment } from 'react'
import { CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// import { LocalizationProvider } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AuthProvider } from './hooks/auth'
import { DialogProvider } from './hooks/dialogHook'
import MyRoutes from './routes/MyRoutes'

function App() {
  return (
    <Fragment>
      <CssVarsProvider>
        <CssBaseline />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <AuthProvider>
          <DialogProvider>
            <MyRoutes />
          </DialogProvider>
        </AuthProvider>
        {/* </LocalizationProvider> */}
      </CssVarsProvider>
    </Fragment>
  )
}

export default App
