/* Convert a URL to base 64 */
export const setUrlImgBase64 = (file, state, setState) => {
  const reader = new FileReader()

  reader.addEventListener(
    'load',
    () => {
      const srcData = reader.result
      setState({
        ...state,
        urlImg: srcData
      })
    },
    false
  )

  if (file) reader.readAsDataURL(file)
}

/* Normalize a file */
export const normFile = (e) => {
  return e.fileList
}

