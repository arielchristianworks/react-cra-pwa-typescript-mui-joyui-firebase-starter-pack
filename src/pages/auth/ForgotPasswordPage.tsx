import { Fragment, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  useTheme
} from '@mui/material'

import { useAuth } from '../../hooks/auth'

export default function ForgotPasswordPage() {
  const [params] = useSearchParams()
  const theme = useTheme()
  const { ResetPassword } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [passwordReseted, setPasswordReseted] = useState<boolean>(false)

  const forgotPasswordFormHook = useForm({
    defaultValues: {
      email: params.get('e') ?? ''
    }
  })

  const forgotPasswordSubmit = async (data: any) => {
    setIsLoading(true)
    await ResetPassword(String(data?.email), `${window.location.origin}/auth/login`)
      .then(res => {
        setPasswordReseted(true)
      })
      .catch(err => {})
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Stack
      direction='column'
      alignItems='center'
      justifyContent='center'
      component='form'
      onSubmit={forgotPasswordFormHook.handleSubmit(forgotPasswordSubmit)}
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: theme.palette.primary,
        padding: 3
      }}
    >
      <Typography color='neutral' fontSize={'2rem'} fontWeight={400} textAlign='center' mb={1.5}>
        {'Atur Ulang Password'}
      </Typography>

      <Card>
        {passwordReseted ? (
          <CardContent>
            <Typography textAlign='justify'>
              {'Sebuah email telah terkirim ke email anda, silahkan melakukan pengecekan.'}
            </Typography>
            <Typography textAlign='justify'>
              {'Jika tidak ditemukan, mohon untuk mencoba cari pada bagian spam juga.'}
            </Typography>
            <br />
            <Typography textAlign='justify' fontWeight={600}>
              {'Terimakasih!'}
            </Typography>
          </CardContent>
        ) : (
          <Fragment>
            <CardContent>
              <Stack direction='column' alignItems='center' justifyContent='center' spacing={2}>
                <FormControl>
                  <FormLabel>{'Email'}</FormLabel>
                  <Input {...forgotPasswordFormHook.register('email')} required type='email' />
                </FormControl>
              </Stack>
            </CardContent>
            <CardActions>
              <Button loading={isLoading} type='submit' variant='solid' fullWidth>
                {'Kirim'}
              </Button>
            </CardActions>
          </Fragment>
        )}
      </Card>
    </Stack>
    // <Box sx={{ width: "100vw", minHeight: "100vh", overflow: "hidden", bgcolor: "secondary.main" }}>
    //   <Box component="form" onSubmit={forgotPasswordFormHook.handleSubmit(forgotPasswordSubmit)} sx={{ minHeight: "100vh" }}>
    //     <Stack justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", py: 6 }}>
    //       { passwordReseted ? (
    //         <Card elevation={3} sx={{ width: "80%" }}>
    //           <CardHeader
    //             title="Atur Ulang Sandi"
    //             titleTypographyProps={{ variant: "h5" }}
    //             sx={{ pb: 1 }}
    //           />
    //           <CardContent>
    //             <Typography align="justify">{"Sebuah email telah terkirim ke email anda, silahkan melakukan pengecekan."}</Typography>
    //             <Typography align="justify">{"Jika tidak ditemukan, mohon untuk mencoba cari pada bagian spam juga."}</Typography>
    //             <br />
    //             <Typography align="justify" fontWeight={600}>{"Terimakasih!"}</Typography>
    //           </CardContent>
    //         </Card>
    //       ) : (
    //         <Card elevation={3} sx={{ width: "80%" }}>
    //           <CardHeader
    //             title="Atur Ulang Sandi"
    //             titleTypographyProps={{ variant: "h5" }}
    //             sx={{ pb: 1 }}
    //           />
    //           <CardContent>
    //             <TextField
    //             />
    //           </CardContent>
    //           <CardActions sx={{ justifyContent: "end" }}>
    //             <LoadingButton loading={isLoading} type="submit" variant="contained" color="secondary">{"Kirim"}</LoadingButton>
    //           </CardActions>
    //         </Card>
    //       ) }
    //     </Stack>
    //   </Box>
    // </Box>
  )
}
