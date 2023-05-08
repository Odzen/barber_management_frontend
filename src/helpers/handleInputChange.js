/* Function to handle input changes */
export const handleInputChange = (state, setState, name, date, dateString, event = null) => {
  if (event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  } else {
    setState({
      ...state,
      [name]: dateString
    })
  }
}
