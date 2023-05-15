import { useState } from 'react'
import { handleInputChange } from '../../../helpers/handleInputChange'
import { openNotificationWithIcon } from '../../../helpers/openNotificationWithIcon'
import { handleSetState } from '../../../helpers/handleSetState'
import { newUserFields } from '../../../utils/newUserFields'
import { resetForm } from '../../../helpers/resetForm'
import { normFile, setUrlImgBase64 } from '../../../helpers/handleUpload'
import {
  Modal,
  Form,
  Input,
  Button,
  Col,
  Row,
  Upload,
  DatePicker,
  Spin,
  notification,
  message
} from 'antd'
import { UploadOutlined, LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import PropTypes from 'prop-types'
import icon from '../../../assets/images/icono.png'
import './login.css'

/* Component used to validate user input */

const LoginView = ({ setToken }) => {
  /* General states for receiving user data */
  const API_URL = 'https://api.barbermanagment.live/api/auth/login'
  const [formCustomer] = Form.useForm()
  const [user, setUser] = useState(false)
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
    password_confirm: ''
  })
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: ''
  })

  /* Function to send the data entered by the user to know if they can enter or not */
  const handleLoginSubmit = async () => {
    try {
      setUser(!user)
      let response = await axios.post(`${API_URL}/api/auth/login`, loginUser)
      let { data, token } = await response.data

      const id = data.id
      const name = data.name
      const role = data.role
      const urlImg = data.urlImg

      /* Local storage variables */
      localStorage.setItem('id', id)
      localStorage.setItem('name', name)
      localStorage.setItem('role', role)
      localStorage.setItem('urlImg', urlImg)

      setTimeout(() => {
        localStorage.setItem('token', token)
        setToken(token)
        setUser(!user)
      }, 1000)
    } catch (error) {
      const type = 'warning'
      const message = '¡Ocurrió algo inusual!'
      const description =
        error.response.status === 401
          ? 'Las credenciales ingresadas con incorrectas, ¡Inténtalo de nuevo!'
          : error.message
      console.log(error)
      setUser(false)
      openNotificationWithIcon(notification, type, message, description)
    }
  }

  const handleRegisterSubmit = async () => {
    let type = ''
    let message = ''
    let description = ''

    if (newUser.password === newUser.password_confirm) {
      type = 'success'
      message = '¡Registro exitoso!'
      description = `Bienvenido ${newUser.name}`

      let user = Object.assign({}, newUser)
      delete user.password_confirm

      try {
        await axios.post(`${API_URL}/api/users`, user)
        setRegisteredUser(true)
        setTimeout(() => {
          handleSetState(false, setModelRegister)
          setRegisteredUser(false)
          openNotificationWithIcon(notification, type, message, description)
        }, 1000)
      } catch (error) {
        let error_field = newUserFields[error.response.data.err.meta.target]
        type = 'warning'
        message = '¡Hubo un error!'
        description = 'El ' + error_field + ' ingresado ya existe, inténtalo con uno diferente'
        openNotificationWithIcon(notification, type, message, description)
      }
    } else {
      type = 'warning'
      message = '¡Las contraseñas no son iguales!'
      description = 'Inténtalo de nuevo'
      openNotificationWithIcon(notification, type, message, description)
    }
  }

  return (
    <>
      <section className='background h-100'>
        <div className='h-100'>
          <div className='row g-0 align-items-center justify-content-center h-100 px-5'>
            <div className='col-xxl-3 col-xl-5 col-lg-5 col-md-7 col-sm-9 col-lg-auto sw-lg-70'>
              <div className='card shadow-lg'>
                <div className='card-body p-3'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <div className='d-flex container-title p-3 m-2'>
                      <img src={icon} className='imgIcon' alt='' />
                      <span className='fs-4 card-title fw-bold'>Bienvenido</span>
                      <img src={icon} className='imgIcon' alt='' />
                    </div>
                  </div>
                  <div className='d-flex justify-content-center align-items-center m-3'>
                    <Form
                      name='normal_login'
                      className='login-form'
                      initialValues={{ remember: true }}
                      onFinish={() => void handleLoginSubmit()}
                    >
                      <Form.Item
                        name='email'
                        rules={[{ required: true, message: 'Ingresa tu correo!' }]}
                      >
                        <Input
                          prefix={<UserOutlined className='site-form-item-icon' />}
                          placeholder='Correo'
                          onChange={(event) =>
                            handleInputChange(loginUser, setLoginUser, null, null, null, event)
                          }
                          value={loginUser.email}
                          name='email'
                        />
                      </Form.Item>
                      <Form.Item
                        name='password'
                        rules={[{ required: true, message: 'Ingresa tu contraseña!' }]}
                      >
                        <Input
                          prefix={<LockOutlined className='site-form-item-icon' />}
                          type='password'
                          placeholder='Contraseña'
                          onChange={(event) =>
                            handleInputChange(loginUser, setLoginUser, null, null, null, event)
                          }
                          value={loginUser.password}
                          name='password'
                        />
                      </Form.Item>
                      <Form.Item style={{ color: 'white', marginBottom: '0' }}>
                        <Button
                          type='primary'
                          htmlType='submit'
                          className='login-form-button btn-primary'
                          disabled={user ? true : false}
                        >
                          Ingresar
                        </Button>
                        O{' '}
                        <a className='' onClick={() => handleSetState(true, setModelRegister)}>
                          Registrarse
                        </a>
                      </Form.Item>
                      <div className={user ? 'text-center mt-3' : 'loading'}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                      </div>
                    </Form>
                  </div>
                </div>
                <div className='card-footer py-3 border-0'>
                  <div className='text-center text-white'>
                    Todos los derechos reservados &copy; 2023
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        centered
        open={modelRegister}
        title='Registrar cliente'
        onCancel={() => handleSetState(false, setModelRegister)}
        width='50vw'
        footer={[]}
      >
        <Form
          form={formCustomer}
          name='crearCliente'
          className='crearCliente'
          id='crearCliente'
          onFinish={() => void handleRegisterSubmit()}
          onFinishFailed={() => {
            const type = 'warning'
            const message = '¡No se pudo completar el registro!'
            const description = 'Algunos campos obligatorios no están diligenciados'
            openNotificationWithIcon(notification, type, message, description)
          }}
        >
          <Row className='col-12 col-md-12 d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center form_r'>
              <Col span={12} className='m-3 col_r'>
                <Form.Item
                  name='name'
                  label='Nombre completo'
                  rules={[{ required: true, message: 'Este campo es obligatorio' }]}
                  className='d-flex flex-column'
                >
                  <Input
                    type='text'
                    pattern='^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+${2,60}'
                    title='Ingresa un nombre válido'
                    onChange={(event) =>
                      handleInputChange(newUser, setNewUser, null, null, null, event)
                    }
                    name='name'
                  />
                </Form.Item>
                <Form.Item
                  name='email'
                  label='Correo electrónico'
                  rules={[{ required: true, message: 'Este campo es obligatorio' }]}
                  className='d-flex flex-column'
                >
                  <Input
                    type='email'
                    pattern='^[^@]+@[^@]+\.[a-zA-Z]{2,}$'
                    title='Ingresa un correo válido'
                    onChange={(event) =>
                      handleInputChange(newUser, setNewUser, null, null, null, event)
                    }
                    name='email'
                  />
                </Form.Item>
                <Form.Item
                  name='documentNumber'
                  label='Número de cédula'
                  rules={[{ required: true, message: 'Este campo es obligatorio' }]}
                  className='d-flex flex-column'
                >
                  <Input
                    type='text'
                    pattern='^[0-9]{6,10}$'
                    title='Ingresa un número de cédula válido'
                    onChange={(event) =>
                      handleInputChange(newUser, setNewUser, null, null, null, event)
                    }
                    name='documentNumber'
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  label='Contraseña'
                  rules={[{ required: true, message: 'Este campo es obligatorio' }]}
                  className='d-flex flex-column'
                >
                  <Input.Password
                    type='password'
                    pattern='^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡\-_~`^{}¿\+*]){1})\S{8,16}$'
                    title='La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una mayúscula y al menos un caracter especial.'
                    onChange={(event) =>
                      handleInputChange(newUser, setNewUser, null, null, null, event)
                    }
                    name='password'
                  />
                </Form.Item>
                <Form.Item
                  name='password_confirm'
                  label='Confirmar contraseña'
                  rules={[{ required: true, message: 'Este campo es obligatorio' }]}
                  className='d-flex flex-column'
                >
                  <Input.Password
                    type='password'
                    pattern='^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡\-_~`^{}¿\+*]){1})\S{8,16}$'
                    title='La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una mayúscula y al menos un caracter especial.'
                    onChange={(event) =>
                      handleInputChange(newUser, setNewUser, null, null, null, event)
                    }
                    name='password_confirm'
                  />
                </Form.Item>
              </Col>
              <Col span={12} className='m-3 col_r'>
                <Form.Item
                  name='phone'
                  label='Número de celular'
                  rules={[{ required: true, message: 'Este campo es obligatorio' }]}
                  className='d-flex flex-column'
                >
                  <Input
                    type='text'
                    pattern='([0-9]{10})'
                    title='Ingresa un número de celular válido'
                    onChange={(event) =>
                      handleInputChange(newUser, setNewUser, null, null, null, event)
                    }
                    name='phone'
                  />
                </Form.Item>

                <Form.Item
                  name='birthDate'
                  label='Fecha de nacimiento'
                  rules={[{ required: true, message: 'Este campo es obligatorio' }]}
                  className='d-flex flex-column'
                >
                  <DatePicker
                    onChange={(date, dateString) =>
                      handleInputChange(newUser, setNewUser, 'birthDate', date, dateString)
                    }
                    name='birthDate'
                    className='w-100'
                  />
                </Form.Item>
                <Form.Item
                  accept='image/svg+xml, image/png, image/jpeg, image/jpg'
                  name='urlImg'
                  label='Imágen de perfil'
                  valuePropName='fileList'
                  getValueFromEvent={(event) => normFile(event)}
                  // onChange={getUrl}s
                  rules={[{ required: true, message: 'Este campo es obligatorio' }]}
                  className='d-flex text-center'
                >
                  <Upload
                    style={{ maxWidth: '200px' }}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    beforeUpload={async (file) => {
                      const notImage =
                        file.type === 'image/jpg' ||
                        file.type === 'image/jpeg' ||
                        file.type === 'image/png' ||
                        file.type === 'image/svg+xml'
                      if (!notImage) {
                        await message.error(`${file.name} no es un archivo válido`)
                      } else {
                        await message.success(`${file.name} añadido exitosamente`)
                        setUrlImgBase64(file, newUser, setNewUser)
                      }
                      return notImage || Upload.LIST_IGNORE
                    }}
                    name='urlImg'
                    listType='picture'
                    maxCount={1}
                    id='urlImg'
                  >
                    <Button icon={<UploadOutlined />}>Subir imágen</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </div>
          </Row>

          <div className='d-flex justify-content-center'>
            <Form.Item>
              <Button htmlType='button' className='m-2' onClick={() => resetForm(formCustomer)}>
                Limpiar
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                disabled={registeredUser ? true : false}
                className='btnCrearCliente m-2'
              >
                Crear
              </Button>
            </Form.Item>
          </div>

          <div className={registeredUser ? 'text-center mt-3' : 'loading'}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          </div>
        </Form>
      </Modal>
    </>
  )
}

LoginView.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginView
