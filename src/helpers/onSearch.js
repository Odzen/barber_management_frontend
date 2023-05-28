export const onSearch = (event, setData, type = 'customers') => {
  let value = event.target.value
  let data = JSON.parse(localStorage.getItem(type))

  let result = data.filter(
    (user) => user.name.includes(value) || user.email.includes(value) || user.phone.includes(value)
  )

  setData(result)
}
