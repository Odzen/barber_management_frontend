export const setLocalStorage = (_id, _name, _role, _urlImg, _token) => {
  localStorage.clear()
  localStorage.setItem('id', _id)
  localStorage.setItem('name', _name)
  localStorage.setItem('role', _role)
  localStorage.setItem('urlImg', _urlImg)
  localStorage.setItem('token', _token)
}
