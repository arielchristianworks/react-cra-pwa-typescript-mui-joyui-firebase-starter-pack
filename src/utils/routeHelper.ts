import { NavigateFunction } from 'react-router-dom'

export const checkedNavigate = (path: string, navigate: NavigateFunction, windowR?: Window) => {
  if (!path.includes('http')) {
    navigate(path)
    return
  }

  if (window) {
    window.open(path, '_blank')
    return
  }
  if (windowR) {
    windowR.open(path, '_blank')
    return
  }
}
