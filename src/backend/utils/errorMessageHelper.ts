export const ErrMsg = {
  FIRESTORE_ERROR: "Terjadi kesalahan pada firestore!",
  UNAUTHORIZED: "Akun tidak memiliki akses untuk melakukan operasi ini!",
  FORBIDDEN: "Operasi ini dilarang!",
  NOT_FOUND: "Link yang anda cari tidak ditemukan!",
}

export interface IDatabaseResult {
  data?: any
  error?: any
  message?: string
}