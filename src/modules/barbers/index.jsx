import { useEffect, useState } from 'react'
import { Spin, Empty, Form, Input, Button } from 'antd'
import { ROLES } from '../../utils/enums'
import { onSearch } from '../../helpers/onSearch'
import { getUsers } from '../../helpers/getUsers'
import { UserModal } from '../../components/UserModal/UserModal'
import BarberCard from './components/BarberCard/index'
import '../../style.scss'
import './style.scss'
import { handleSetState } from '../../helpers/handleSetState'
/* Component used to display each of the barber */

const BarbersView = () => {
  /* General states */
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(false)
  const type = 'barbers'

  const [formNewBarber] = Form.useForm()
  const [registeredUser, setRegisteredUser] = useState(false)
  const [modelRegister, setModelRegister] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    documentNumber: '',
    phone: '',
    birthDate: '',
    urlImg: '',
    email: '',
    password: '',
    password_confirm: '',
    role: 'BARBER'
  })

  /* Functions to be executed when the page is rendered */
  useEffect(() => {
    getUsers(ROLES.BARBER, type, setData, setLoading)
  }, [])

  return (
    <>
      <div className='contenedor_main'>
        <div className='container'>
          <div
            className='d-flex justify-content-between align-items-center mb-3'
            style={{ margin: '10px 20px' }}
          >
            <h1 className='_title' style={{ marginBottom: '0 important' }}>
              Barberos
            </h1>
            <Button type='primary' onClick={() => handleSetState(true, setModelRegister)}>
              Contratar barbero
            </Button>
            <Input
              placeholder='Buscar...'
              onChange={(event) => onSearch(event, setData, type)}
              style={{
                width: 400
              }}
            />
          </div>

          <div className='titles'>
            <div className='field'>
              <div className='d-flex align-items-center justify-content-center'>
                <span className='info_text text-white'>Nombre</span>
              </div>
            </div>
            <div className='field'>
              <div className='d-flex align-items-center justify-content-center'>
                <span className='info_text text-white'>Correo</span>
              </div>
            </div>
            <div className='field'>
              <div className='d-flex align-items-center justify-content-center'>
                <span className='info_text text-white'>Teléfono</span>
              </div>
            </div>
            <div className='field'>
              <div className='d-flex align-items-center justify-content-center'>
                <span className='info_text text-white'>Cumpleaños</span>
              </div>
            </div>
            <div className='field'>
              <div className='d-flex align-items-center justify-content-center'>
                <span className='info_text text-white'>Estado</span>
              </div>
            </div>
            <div style={{ width: '110px' }}>
              <div className='d-flex align-items-center justify-content-center'>
                <span className='info_text text-white'>Acciones</span>
              </div>
            </div>
          </div>

          <div style={{ maxHeight: '77vh', overflowY: 'auto' }}>
            {!data && !loading ? (
              <Spin size='large' className='m-4'>
                <div className='content' />
              </Spin>
            ) : !!data && data.length < 1 ? (
              <Empty />
            ) : (
              data.map(({ id, name, urlImg, phone, email, state, birthDate }) => {
                return (
                  <BarberCard
                    key={id}
                    id={id}
                    name={name}
                    urlImg={urlImg}
                    email={email}
                    phone={phone}
                    state={state}
                    birthDate={birthDate}
                    setData={setData}
                    setLoading={setLoading}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal to create barbers */}
      <UserModal
        edit={true}
        title='Contratar barbero'
        notifMessage='¡Contratación exitosa!'
        form={formNewBarber}
        newUser={newUser}
        modelRegister={modelRegister}
        registeredUser={registeredUser}
        setUser={setNewUser}
        setModelRegister={setModelRegister}
        setRegisteredUser={setRegisteredUser}
        setData={setData}
        setLoading={setLoading}
      />
    </>
  )
}

export default BarbersView
