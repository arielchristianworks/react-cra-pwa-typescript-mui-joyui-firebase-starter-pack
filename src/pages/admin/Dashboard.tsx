import { Box, Button } from '@mui/material'
import { useAuth } from '../../hooks/auth'

import AdminLayout from '../../layouts/admin/Layout'

export default function AdminDashboard() {
  const { Logout, userNow } = useAuth()

  return (
    <AdminLayout title='Dashboard'>
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
    </AdminLayout>
  )
}
