import { Fragment } from 'react'
import {
  Button,
  ButtonProps,
  Modal,
  DialogTitle,
  DialogActions,
  DialogContent,
  ModalDialog,
  Typography
} from '@mui/material'

interface IMyConfirmDialogProps {
  open: boolean
  onClose?: () => void
  fullWidth?: boolean
  allowFullScreen?: boolean
  title?: string
  content?: string
  agreeBtnText?: string
  cancelBtnText?: string
  onAgreeBtnClick?: () => void
  onCancelBtnClick?: () => void
  actionButtons?: ButtonProps[]
  // setOpenDialog: () => void
  // setFinalLink: React.Dispatch<React.SetStateAction<string|null>>
  // onLinkChange: (newValue: string|null) => void
}

export default function MyConfirmDialog(props: IMyConfirmDialogProps) {
  const { open, onClose } = props
  const { title = 'Judul', content = 'Isi' } = props
  const { agreeBtnText = 'OK', cancelBtnText = 'BATAL', actionButtons } = props
  const { onAgreeBtnClick, onCancelBtnClick = onClose } = props

  return (
    <Modal
      open={open}
      keepMounted={false}
      onClose={onClose}
      aria-describedby='my-confirm-dialog'
    >
      <ModalDialog>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{content}</Typography>
      </DialogContent>
      <DialogActions>
        {!!actionButtons && actionButtons.length ? (
          <Fragment>
            {actionButtons?.map((btnProps, index) => (
              <Button key={`my-confirm-dialog-action-button-item-${index}`} {...btnProps} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            <Button onClick={onAgreeBtnClick} autoFocus>
              {agreeBtnText}
            </Button>
            <Button color='danger' onClick={onCancelBtnClick}>
              {cancelBtnText}
            </Button>
          </Fragment>
        )}
      </DialogActions>
      </ModalDialog>
    </Modal>
  )
}
