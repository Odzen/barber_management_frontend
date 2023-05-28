export const getRole = (state) => {
  const roles_label = {
    ADMIN: 'Administrador',
    BARBER: 'Barbero',
    CUSTOMER: 'Cliente'
  }

  return roles_label[state]
}
