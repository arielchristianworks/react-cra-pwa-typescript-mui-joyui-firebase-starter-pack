import { Box, Button, Typography } from '@mui/material'
import { useAuth } from '../hooks/auth'

export default function Default() {
  const { Logout, userNow } = useAuth()

  return (
    <Box>
      <Typography>Default Page</Typography>

      {!!userNow ? (
        <Box component='ol'>
          <li>email: {userNow.email ?? '-'}</li>
          <li>displayName: {userNow.displayName ?? '-'}</li>
          <li>emailVerified: {userNow.emailVerified ? 'Yes' : 'No'}</li>
          <li>uid: {userNow.uid ?? '-'}</li>
        </Box>
      ) : null}

      <Button color='danger' variant='soft' onClick={() => Logout()}>
        Logout
      </Button>
    </Box>
  )
}
