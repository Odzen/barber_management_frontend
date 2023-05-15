import React, { useState } from 'react'
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Select, Button, Col, Row, Upload, notification } from 'antd'
import { useGetBase64 } from '../../../../hooks/useGetBase64'
import PropTypes from 'prop-types'

import './style.scss'
import { ROLES, STATES } from '../../../../utils/enums'

/*Componente usado para mostrar la información de cada uno de los usuarios, como el nombre, correo, telefono, imagen, y estado*/

export const CardUser = ({ id, name, urlImg, email, phone, state, role }) => {
  const { confirm } = Modal

  /*Estados generales*/
  const [users, setUsers] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleVerUsuario, setVisibleVerUsuario] = useState(false)
  const [form] = Form.useForm()
  const [datos, setDatos] = useState({
    nombre_usuario: '',
    telefono_usuario: '',
    estado_usuario: '',
    url_img_usuario: ''
  })

  /*Variables globales para las peticiones*/
  const urlVerUsuario = `http://${document.domain}:3001/usuarios/`
  const urlEditarUsuario = `http://${document.domain}:3001/editarUsuario/`
  const urlEliminarUsuario = `http://${document.domain}:3001/eliminarUsuario/`

  let idUser = localStorage.getItem('id')

  /*Función para editar/actualizar usuarios*/
  const updateUsers = async (e) => {
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...datos
      })
    }

    const res = await fetch(urlEditarUsuario + id, requestOptions)
    openNotificationWithIcon('success')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
      onReset()
      window.location.reload()
    }, 1000)
  }

  /*Función para eliminar usuarios*/
  const deleteUsers = async (idUserDel) => {
    const requestOptions = {
      method: 'POST',
      headers: headers
    }

    const ruta = urlEliminarUsuario + idUserDel
    console.log(ruta)
    const res = await fetch(ruta, requestOptions)

    openNotificationWithIconDelete('success')

    setLoading(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  /*Función para obtener la data de cada usuario*/
  const getUsers = async (idUserVer) => {
    const requestOptions = {
      method: 'GET',
      headers: headers
    }

    const ruta = urlVerUsuario + idUserVer
    console.log(ruta)
    const res = await fetch(ruta, requestOptions)
    const data = await res.json()
    console.log(data[0])
    setUsers(data[0])
    localStorage.removeItem('idUserVer')
  }

  /*Función que abre el modal del formulario para editar usuarios*/
  const openEditUser = (e) => {
    setVisible(true)
  }

  /*Función que retorna el id del usuario a eliminar*/
  const getIdDelete = (e) => {
    let idUserDel = e.target.id
    return idUserDel
  }

  /*Función que cierra el modal del formulario para editar usuarios*/
  const handleCancel = () => {
    setVisible(false)
  }

  /*Función que limpia los inputs del formulario para editar usuarios*/
  const onReset = () => {
    form.resetFields()
  }

  /*Función para actualizar los datos del usuario cada vez que hace cambios en los inputs del formulario de crear usuarios*/
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  /*Función para convertir la URL del adjunto que suben al formulario de crear usuarios en base64 y almacenarlo en el estado global*/
  const getUrlUpdateUser = async () => {
    const fileInput = document.getElementById('url_img_usuario2')
    const selectedFile = fileInput.files[0]
    const btn = document.getElementsByClassName('btnEditarUsuario')

    if (
      selectedFile.type != 'image/png' &&
      selectedFile.type != 'image/jpeg' &&
      selectedFile.type != 'image/jpg'
    ) {
      //console.log('LLEGO');
      alert('Solo se permiten imágenes en PDF, JPG y JPEG')
      fileInput.value = ''
      //console.log(btn[0])
      btn[0].setAttribute('disabled', 'true')
    } else {
      btn[0].removeAttribute('disabled')
      let result = await useGetBase64(selectedFile)
      let url = result
      //console.log(url)
      setDatos({
        ...datos,
        ['url_img_usuario']: url
      })
    }
  }

  /*Función que actualiza cual item de la lista desplegable es seleccionado*/
  const handleSelectChange = (value) => {
    setDatos({
      ...datos,
      ['estado_usuario']: value
    })
  }

  /*Función que muestra una notificación cuando se ha logrado actualizar un usuario*/
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: '¡Usuario actualizado correctamente!',
      description: 'Los datos ingresados han sido recibidos :)'
    })
  }

  /*Función que muestra una notificación cuando se ha logrado eliminar un usuario*/
  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: '¡Usuario eliminado correctamente!',
      description: 'El usuario ha sido desterrado :)'
    })
  }

  /*Función que muestra un modal con la información del usuario*/
  const openUser = (e) => {
    let idUserVer = e.target.id
    localStorage.setItem('idUserVer', idUserVer)

    getUsers(idUserVer)

    setVisibleVerUsuario(true)
  }

  /*Función quecierra un modal con la información del usuario*/
  const handleCancelUser = () => {
    setVisibleVerUsuario(false)
  }

  const getRole = (role) => {
    const _ROLES = {
      ADMIN: 'Administrador',
      CUSTOMER: 'Cliente',
      BARBER: 'Barbero'
    }

    return _ROLES[role]
  }

  return (
    <>
      <div className='userCard'>
        <div className='d-flex align-items-center field'>
          <img src={'data:image/png;base64,' + urlImg} alt='avatar' className='userImg' />
          <span className='info_text _name'>{name}</span>
        </div>
        <div className='field'>
          <div className='d-flex align-items-center justify-content-center'>
            <span className='info_text text-decoration-underline'>{email}</span>
          </div>
        </div>
        <div className='field'>
          <span className='info_text'>(+57) {phone}</span>
        </div>
        <div className='field'>
          <span className='info_text'>{getRole(role)}</span>
        </div>
        <div className='field'>
          <span
            className={`state ${STATES[state] === state ? 'active' : 'inactive'}`}
            style={{ fontWeight: '500' }}
          >
            {STATES[state] === state ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>

      {/* <Modal
                open={visibleVerUsuario}
                title="Ver usuario"
                onCancel={handleCancelUser}
                width="800px"
                footer={[

                ]}
            >




                {
                    !users ? 'Cargando...' :
                        <>
                            <div className='d-flex justify-content-center align-items-center imgUser m-2'>
                                <img src={users.url_img_usuario} />
                            </div>
                            <table className='tableUser table table-bordered'>
                                <thead>
                                    <tr>
                                        <th scope="col">Campo</th>
                                        <th scope="col">Información</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Nombre</td>
                                        <td>{users.nombre_usuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Documento</td>
                                        <td>{users.documento_usuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Correo</td>
                                        <td>{users.correo_usuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Teléfono</td>
                                        <td>{users.telefono_usuario == null ? 'Sin información' : users.telefono_usuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de nacimiento</td>
                                        <td>{users.fecha_nacimiento_usuario == null ? 'Sin información' : users.fecha_nacimiento_usuario.split('T')[0]}</td>
                                    </tr>
                                    <tr>
                                        <td>Rol</td>
                                        <td>{users.nombre_rol == null ? 'Sin información' : users.nombre_rol}</td>
                                    </tr>
                                    <tr>
                                        <td>Estado</td>
                                        <td>{users.nombre_estado == null || users.nombre_estado == undefined ? 'Sin información' : users.nombre_estado}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </>
                }

            </Modal> */}
    </>
  )
}

CardUser.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  urlImg: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

export default CardUser
