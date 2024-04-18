import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Typography,
  useTheme
} from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { IFirebaseAuthErrorState, authErrorTranslater } from '../../utils/firebaseErrorHelper'
import { stringIncludeArray } from '../../utils/formHelper'
import { useAuth } from '../../hooks/auth'

export default function LoginPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { LoginEmail } = useAuth()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputPasswordType, setInputPasswordType] = useState<string>('password')
  const [FirebaseError, setFirebaseError] = useState<IFirebaseAuthErrorState | null>(null)

  const loginFormHook = useForm()

  const oneEmpty = (): boolean => {
    return !Boolean(loginFormHook.watch('email')) || !Boolean(loginFormHook.watch('password'))
  }

  const loginFormSubmit = async (data: any) => {
    setIsLoading(true)
    setFirebaseError(null)
    const { error, shouldRefresh } = await LoginEmail(data.email, data.password)
    if (error?.code) setFirebaseError(authErrorTranslater(error.code))
    if (shouldRefresh) navigate(0)
    setIsLoading(false)
  }

  return (
    <Stack
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: theme.palette.primary,
        padding: 3
      }}
    >
      <Card>
        <Typography level='h2' textAlign='center'>
          Login
        </Typography>
        <Divider inset='none' />
        <CardContent>
          <Stack
            component='form'
            onSubmit={loginFormHook.handleSubmit(loginFormSubmit)}
            direction='column'
            alignItems='center'
            justifyContent='center'
            spacing={1.5}
          >
            <FormControl sx={{ width: '100%' }}>
              <FormLabel>{'Email'}</FormLabel>
              <Input {...loginFormHook.register('email')} required type='email' />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='input-password'>{'Password'}</FormLabel>
              <Input
                id='input-password'
                type={inputPasswordType}
                required
                {...loginFormHook.register('password')}
                endDecorator={
                  <IconButton
                    onClick={() => setInputPasswordType(Boolean(inputPasswordType === 'text') ? 'password' : 'text')}
                  >
                    {Boolean(inputPasswordType === 'password') ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
              <FormHelperText color='danger'>
                {stringIncludeArray(FirebaseError?.code ?? '', ['password', 'auth/invalid-credential'])
                  ? FirebaseError?.message
                  : null}
              </FormHelperText>
            </FormControl>

            <Typography
              level='title-sm'
              textAlign='left'
              fontWeight={500}
              onClick={() => navigate(`/auth/forgot-password?e=${loginFormHook.watch('email')}`)}
              sx={{
                cursor: 'pointer',
                transition: '.3s',
                '&:hover': { color: 'primary.main', transform: 'scale(1.05)' }
              }}
            >
              {'Lupa kata sandi?'}
            </Typography>

            <Button
              type='submit'
              size='lg'
              variant={'outlined'}
              loading={isLoading}
              disabled={oneEmpty()}
              // color={oneEmpty()?"primary":"secondary"}
              sx={{ height: 60, width: 60 }}
            >
              <ArrowForwardIcon />
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
