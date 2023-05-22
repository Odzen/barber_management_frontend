import { openNotificationWithIcon } from '../../helpers/openNotificationWithIcon'
import { handleInputChange } from '../../helpers/handleInputChange'
import { handleSetState } from '../../helpers/handleSetState'
import { resetForm } from '../../helpers/resetForm'
import { normFile, setUrlImgBase64 } from '../../helpers/handleUpload'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { ROLES } from '../../utils/enums'
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
  message,
  Select
} from 'antd'
import { getUsers } from '../../helpers/getUsers'
import { getState } from '../../helpers/getState'
import { optionsSelectState } from '../../helpers/optionsSelectState'
import { headers } from '../../utils/headers'
import { newUserFields } from '../../utils/newUserFields'
import axios from 'axios'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

export const UserModal = ({
  edit = false,
  title,
  notifMessage,
  form,
  newUser,
  modelRegister,
  registeredUser,
  setUser,
  setModelRegister,
  setRegisteredUser,
  setData,
  setLoading
}) => {
  const API_URL = import.meta.env.VITE_API_URL
  const _type = 'barbers'
  const dateFormat = 'YYYY-MM-DD'

  /* Function to create an user*/
  const handleRegisterSubmit = async () => {
    let type = ''
    let message = ''
    let description = ''

    if (newUser.password === newUser.password_confirm) {
      type = 'success'
      message = notifMessage
      description = `Bienvenido ${newUser.name}`

      let user = Object.assign({}, newUser)
      delete user.password_confirm

      try {
        await axios.post(`${API_URL}api/users`, user)
        setRegisteredUser(true)
        setTimeout(async () => {
          handleSetState(false, setModelRegister)
          setRegisteredUser(false)
          openNotificationWithIcon(type, message, description)
          await getUsers(ROLES.BARBER, _type, setData, setLoading)
          resetForm(form)
        }, 1000)
      } catch (error) {
        console.log(error)
        let error_field = newUserFields[error.response.data.err.meta.target]
        type = 'warning'
        message = '¡Hubo un error!'
        description = 'El ' + error_field + ' ingresado ya existe, inténtalo con uno diferente'
        openNotificationWithIcon(type, message, description)
      }
    } else {
      type = 'warning'
      message = '¡Las contraseñas no son iguales!'
      description = 'Inténtalo de nuevo'
      openNotificationWithIcon(type, message, description)
    }
  }

  /* Function to update an user*/
  const handleUpdate = async () => {
    let type = ''
    let message = ''
    let description = ''

    type = 'success'
    message = notifMessage
    description = `Bienvenido ${newUser.name}`

    let id = localStorage.getItem('currentUser')

    delete newUser['id']
    newUser.birthDate = newUser.birthDate + 'T00:00:00.000+00:01'
    const requestOptions = {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(newUser)
    }
    console.log(newUser)
    try {
      const response = await fetch(`${API_URL}api/users/${id}`, requestOptions)
      if (response.status === 500) {
        const error = await response.json()
        let error_field = newUserFields[error.err.meta.target]
        type = 'warning'
        message = '¡Hubo un error!'
        description = 'El ' + error_field + ' ingresado ya existe, inténtalo con uno diferente'
        openNotificationWithIcon(type, message, description)
      } else {
        setRegisteredUser(true)
        setTimeout(async () => {
          handleSetState(false, setModelRegister)
          setRegisteredUser(false)
          openNotificationWithIcon(type, message, description)
          await getUsers(ROLES.BARBER, _type, setData, setLoading)
          resetForm(form)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      centered
      open={modelRegister}
      title={title}
      onCancel={() => handleSetState(false, setModelRegister)}
      width='50vw'
      footer={[]}
    >
      <Form
        form={form}
        name='crearCliente'
        className='crearCliente'
        id='crearCliente'
        onFinish={() => (edit ? void handleRegisterSubmit() : void handleUpdate())}
        onFinishFailed={() => {
          const type = 'warning'
          const message = '¡No se pudo completar el registro!'
          const description = 'Algunos campos obligatorios no están diligenciados'
          openNotificationWithIcon(type, message, description)
        }}
      >
        <Row className='col-12 col-md-12 d-flex flex-column align-items-center'>
          <div className='d-flex justify-content-center form_r'>
            <Col span={12} className='m-3 col_r'>
              <Form.Item
                name='name'
                label='Nombre completo'
                rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
                className='d-flex flex-column'
              >
                <Input
                  type='text'
                  pattern='^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+${2,60}'
                  title='Ingresa un nombre válido'
                  onChange={(event) => handleInputChange(newUser, setUser, null, null, null, event)}
                  name='name'
                  defaultValue={newUser?.name}
                />
              </Form.Item>
              <Form.Item
                name='email'
                label='Correo electrónico'
                rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
                className='d-flex flex-column'
              >
                <Input
                  type='email'
                  pattern='^[^@]+@[^@]+\.[a-zA-Z]{2,}$'
                  title='Ingresa un correo válido'
                  onChange={(event) => handleInputChange(newUser, setUser, null, null, null, event)}
                  name='email'
                  defaultValue={newUser?.email}
                />
              </Form.Item>
              <Form.Item
                name='documentNumber'
                label='Número de cédula'
                rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
                className='d-flex flex-column'
              >
                <Input
                  type='text'
                  pattern='^[0-9]{6,10}$'
                  title='Ingresa un número de cédula válido'
                  onChange={(event) => handleInputChange(newUser, setUser, null, null, null, event)}
                  name='documentNumber'
                  defaultValue={newUser?.documentNumber}
                />
              </Form.Item>
              {edit ? (
                <>
                  <Form.Item
                    name='password'
                    label='Contraseña'
                    rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
                    className='d-flex flex-column'
                  >
                    <Input.Password
                      type='password'
                      pattern='^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡\-_~`^{}¿\+*#]){1})\S{8,16}$'
                      title='La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una mayúscula y al menos un caracter especial.'
                      onChange={(event) =>
                        handleInputChange(newUser, setUser, null, null, null, event)
                      }
                      name='password'
                    />
                  </Form.Item>
                  <Form.Item
                    name='password_confirm'
                    label='Confirmar contraseña'
                    rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
                    className='d-flex flex-column'
                  >
                    <Input.Password
                      type='password'
                      pattern='^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡\-_~`^{}¿\+*#]){1})\S{8,16}$'
                      title='La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una mayúscula y al menos un caracter especial.'
                      onChange={(event) =>
                        handleInputChange(newUser, setUser, null, null, null, event)
                      }
                      name='password_confirm'
                    />
                  </Form.Item>
                </>
              ) : (
                ''
              )}
            </Col>
            <Col span={12} className='m-3 col_r'>
              <Form.Item
                name='phone'
                label='Número de celular'
                rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
                className='d-flex flex-column'
              >
                <Input
                  type='text'
                  pattern='([0-9]{10})'
                  title='Ingresa un número de celular válido'
                  onChange={(event) => handleInputChange(newUser, setUser, null, null, null, event)}
                  name='phone'
                  defaultValue={newUser?.phone}
                  value={newUser?.phone}
                />
              </Form.Item>

              <Form.Item
                name='birthDate'
                label='Fecha de nacimiento'
                rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
                className='d-flex flex-column'
              >
                <DatePicker
                  onChange={(date, dateString) =>
                    handleInputChange(newUser, setUser, 'birthDate', date, dateString)
                  }
                  name='birthDate'
                  className='w-100'
                  defaultValue={dayjs(newUser.birthDate?.split('T')[0], dateFormat)}
                />
              </Form.Item>
              <Form.Item
                accept='image/svg+xml, image/png, image/jpeg, image/jpg'
                name='urlImg'
                label='Imágen de perfil'
                valuePropName='fileList'
                getValueFromEvent={(event) => normFile(event)}
                rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
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
                      setUrlImgBase64(file, newUser, setUser)
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
          {!edit ? (
            <Form.Item
              name='state'
              rules={edit ? [{ required: true, message: 'Este campo es obligatorio' }] : []}
              className='d-flex flex-column'
            >
              <Select
                defaultValue={getState(newUser.state)}
                style={{ width: 120 }}
                onChange={(value) =>
                  handleInputChange(newUser, setUser, null, null, null, {
                    target: {
                      name: 'state',
                      value
                    }
                  })
                }
                options={optionsSelectState}
                name='state'
              />
            </Form.Item>
          ) : (
            ''
          )}
        </Row>

        <div className='d-flex justify-content-center'>
          <Form.Item>
            {edit ? (
              <Button htmlType='button' className='m-2' onClick={() => resetForm(form)}>
                Limpiar
              </Button>
            ) : (
              ''
            )}
            <Button
              type='primary'
              htmlType='submit'
              disabled={registeredUser ? true : false}
              className='btnCrearCliente m-2'
            >
              {edit ? 'Crear' : 'Actualizar'}
            </Button>
          </Form.Item>
        </div>

        <div className={registeredUser ? 'text-center mt-3' : 'loading'}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      </Form>
    </Modal>
  )
}

UserModal.propTypes = {
  edit: PropTypes.bool,
  title: PropTypes.string.isRequired,
  notifMessage: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  modelRegister: PropTypes.bool.isRequired,
  registeredUser: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  setModelRegister: PropTypes.func.isRequired,
  setRegisteredUser: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}
