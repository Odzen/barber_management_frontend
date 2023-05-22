export const backUpLocalStorage = () => {
  const _id = localStorage.getItem('id')
  const _name = localStorage.getItem('name')
  const _role = localStorage.getItem('role')
  const _urlImg = localStorage.getItem('urlImg')
  const _token = localStorage.getItem('token')

  return {
    _id,
    _name,
    _role,
    _urlImg,
    _token
  }
}
