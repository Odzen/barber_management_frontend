export const onSearch = (event, setData) => {
  let value = event.target.value
  console.log('value: ', value)
  let data = JSON.parse(localStorage.getItem('customers'))

  let result = data.filter(
    (user) => user.name.includes(value) || user.email.includes(value) || user.phone.includes(value)
  )

  console.log('result: ', result)
  setData(result)
}
