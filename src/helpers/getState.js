export const getState = (state) => {
  const states_label = {
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo'
  }

  return states_label[state]
}
