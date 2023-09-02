export const isImage = (file: File) => {
  return file['type'].split('/')[0] == 'image' //returns true or false
}

export const isMax100KB = (file: File) => {
  const maxSize = 100 * 1024 // 100KB in bytes

  if (!file) {
    return false
  }
  if (file.size >= maxSize) {
    return false
  }

  return true
}
