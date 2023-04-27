/* Function to handle input changes */

export const handleInputChange = (event, state, setState) => {
  setState({
    ...state,
    [event.target.name]: event.target.value
  })
  console.log(state)
}
