import axios from 'axios'
import { useState } from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Col,
  Row,
  Upload,
  DatePicker,
  Spin,
  notification,
  message
} from 'antd';
import {
  UploadOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import icon from '../../../assets/images/icono.png'
import './login.css'
import { handleInputChange } from '../../../helpers/handleInputChange';
import { openNotificationWithIcon } from '../../../helpers/openNotificationWithIcon';
import { handleSetState } from '../../../helpers/handleSetState';
import { STATES, ROLES } from "../../../utils/enums"
import { resetForm } from '../../../helpers/resetForm';
import { normFile, setUrlImgBase64 } from '../../../helpers/handleUpload';
/* Component used to validate user input */

const LoginView = (/*{ setToken }*/) => {

  /* General states for receiving user data */
  const [formCustomer] = Form.useForm();
  const [user, setUser] = useState(false)
  const [equalPasswords, setEqualPasswords] = useState(false)
  const [modelRegister, setModelRegister] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    documentNumber: '',
    phone: '',
    birthDate: '',
    urlImg: '',
    email: '',
    state: STATES.ACTIVE,
    role: ROLES.CUSTOMER,
    password: '',
  })
  const [loginUser, setLoginUser] = useState({
    user: '',
    password: ''
  })

  /*Función para enviar los datos ingresados por el usuario para saber si puede ingresar o no*/
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("login: ", loginUser)
    try {
      setUser(!user)
      let res = await axios.post('http://localhost:3001/usuario/login', loginUser)
      setTimeout(() => {

        const accessToken = res.data.token
        // setToken(accessToken)
        localStorage.setItem('token', accessToken)

        setLoginUser({
          user: '',
          password: ''
        })

        /* Local storage variables */
        localStorage.setItem('name', res.data.nombre_usuario)
        localStorage.setItem('urlImg', res.data.url_img_usuario)
        localStorage.setItem('role', res.data.nombre_rol)
        localStorage.setItem('id', res.data.id_usuario)
      }, 1000)
    } catch (error) {
      const type = 'warning'
      const message = '¡Ocurrió algo inusual!'
      const description = error.message
      setUser(false)
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
                <div className='card-body p-5'>
                  <div className='d-flex justify-content-center align-items-center container-title'>
                    <img src={icon} className='imgIcon' alt='' />
                    <h1 className='fs-4 card-title fw-bold'>Bienvenido</h1>
                    <img src={icon} className='imgIcon' alt='' />
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className='needs-validation'
                    noValidate={true}
                    autoComplete='off'
                    aria-label='form-login'
                  >
                    <div className='mb-3'>
                      <label className='mb-2 text-muted' htmlFor='email'>
                        Usuario
                      </label>
                      <input
                        id='user'
                        type='text'
                        onChange={(event) => handleInputChange(loginUser, setLoginUser, null, null, null, event)}
                        value={loginUser.user}
                        className='form-control'
                        name='user'
                        required
                        autoFocus
                      />
                      <div className='invalid-feedback'>Usuario inválido</div>
                    </div>
                    <div className='mb-3'>
                      <div className='mb-2 w-100'>
                        <label className='text-muted' htmlFor='password'>
                          Contraseña
                        </label>
                      </div>
                      <input
                        id='password'
                        type='password'
                        onChange={(event) => handleInputChange(loginUser, setLoginUser, null, null, null, event)}
                        value={loginUser.password}
                        className='form-control'
                        name='password'
                        required
                      />
                      <div className='invalid-feedback'>Contraseña es requirida</div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                      <button type='submit' className='btn btn-primary'>
                        <i className='bi bi-box-arrow-in-right'></i> Ingresar
                      </button>

                      <button type="button" className='btn btn-primary' onClick={() => handleSetState(true, setModelRegister)}>
                        <i className='bi bi-box-arrow-in-right'></i> Registrarse
                      </button>
                    </div>
                    <div className={user ? "text-center mt-3" : "loading"}>
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </div>
                  </form>
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
        title="Registrar cliente"
        onCancel={() => handleSetState(false, setModelRegister)}
        width="800px"
        footer={[
        ]}
      >

        <Form
          form={formCustomer}
          name="crearCliente"
          className="crearCliente"
          id="crearCliente"
          onFinish={() => console.log("create customer")}
          onFinishFailed={() => console.log("some field are not ready to send it")}
        >
          <Row className='col-12 d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center'>
              <Col span={12} className="m-3">
                <Form.Item
                  name="name"
                  label="Nombre completo"
                  rules={[{ required: true, message: "Este campo es obligatorio" }]}
                  className="d-flex flex-column">
                  <Input
                    type="text"
                    pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
                    title="Ingresa un nombre válido"
                    onChange={(event) => handleInputChange(newUser, setNewUser, null, null, null, event)}
                    name="name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Correo electrónico"
                  rules={[{ required: true, message: "Este campo es obligatorio" }]}
                  className="d-flex flex-column">
                  <Input
                    type="email"
                    pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
                    title="Ingresa un correo válido"
                    onChange={(event) => handleInputChange(newUser, setNewUser, null, null, null, event)}
                    name="email" />
                </Form.Item>
                <Form.Item
                  name="documentNumber"
                  label="Número de cédula"
                  rules={[{ required: true, message: "Este campo es obligatorio" }]}
                  className="d-flex flex-column">
                  <Input
                    type="text"
                    pattern="^[0-9]{6,10}$"
                    title="Ingresa un número de cédula válido"
                    onChange={(event) => handleInputChange(newUser, setNewUser, null, null, null, event)}
                    name="documentNumber" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[{ required: true, message: "Este campo es obligatorio" }]}
                  className="d-flex flex-column">
                  <Input.Password
                    type="password"
                    pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$"
                    title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, 
                    al menos una mayúscula y al menos un caracter no alfanumérico."
                    onChange={(event) => handleInputChange(newUser, setNewUser, null, null, null, event)}
                    name="password" />
                </Form.Item>
                <Form.Item
                  name="password_confirm"
                  label="Confirmar contraseña"
                  rules={[{ required: true, message: "Este campo es obligatorio" }]}
                  className="d-flex flex-column">
                  <Input.Password
                    type="password"
                    pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$"
                    title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, 
                  al menos una mayúscula y al menos un caracter no alfanumérico."
                    onChange={(event) => handleInputChange(newUser, setNewUser, null, null, null, event)}
                    name="contraseña_cliente" />
                </Form.Item>
              </Col>
              <Col span={12} className="m-3">
                <Form.Item
                  name="phone"
                  label="Número de celular"
                  rules={[{ required: true, message: "Este campo es obligatorio" }]}
                  className="d-flex flex-column">
                  <Input type="text"
                    pattern="([0-9]{10})"
                    title="Ingresa un número de celular válido"
                    onChange={(event) => handleInputChange(newUser, setNewUser, null, null, null, event)}
                    name="phone" />
                </Form.Item>

                <Form.Item
                  name="birthDate"
                  label="Fecha de nacimineto"
                  rules={[{ required: true, message: "Este campo es obligatorio" }]}
                  className="d-flex flex-column">
                  <DatePicker
                    onChange={(date, dateString) => handleInputChange(newUser, setNewUser, "birthDate", date, dateString)}
                    name="birthDate"
                    className='w-100' />
                </Form.Item>
                <Form.Item
                  accept="image/svg+xml, image/png, image/jpeg, image/jpg"
                  name="urlImg"
                  label="Imágen de perfil"
                  valuePropName="fileList"
                  getValueFromEvent={(event) => normFile(event)}
                  // onChange={getUrl}s
                  rules={[{ required: true, message: "Este campo es obligatorio" }]}
                  className="d-flex flex-column">
                  <Upload
                    beforeUpload={async (file) => {
                      const notImage =
                        file.type === 'image/jpg' ||
                        file.type === 'image/jpeg' ||
                        file.type === 'image/png' ||
                        file.type === 'image/svg+xml'
                      if (!notImage) {
                        message.error(`${file.name} no es un archivo válido`)
                      } else {
                        message.success(`${file.name} añadido exitosamente`)
                        setUrlImgBase64(file, newUser, setNewUser)
                      }
                      return notImage || Upload.LIST_IGNORE
                    }}
                    name="urlImg"
                    listType="picture"
                    maxCount={1}
                    id="urlImg">
                    <Button icon={<UploadOutlined />} >Subir imágen</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </div>
          </Row>

          <div className='d-flex justify-content-center'>
            <Form.Item >
              <Button htmlType="button" className="m-2" onClick={() => resetForm(formCustomer)}>
                Limpiar
              </Button>
              <Button type="primary" htmlType="submit" onClick={() => console.log(newUser)} /* loading={loadingClient} */ className="btnCrearCliente m-2">
                Crear
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default LoginView
