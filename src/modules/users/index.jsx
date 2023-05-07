import { useEffect, useState } from 'react';
import CardUser from './components/CardUser';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Col,
  Row,
  Upload,
  notification,
  Result,
  Avatar, List, Skeleton, Divider
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UploadOutlined } from '@ant-design/icons';
import { headers } from '../../utils/headers';
import './users.css'
import '../../global.css'
import photo from '../../assets/images/UserPhoto.png'
const { Option } = Select;
const { Search } = Input;

/* Layout for form inputs */

const layout = {
  labelCol: { span: 20 },
  wrapperCol: { span: 50 },
};


/* Component used to display each of the users */

const UsersView = () => {

  /* General states */

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);



  let id_admin = localStorage.getItem('id');
  const [user, setUser] = useState(false);
  const [rol, setRol] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [busqueda, setBusqueda] = useState({
    page: '',
    type: 'usuarios'
  });
  const [dataUser, setDataUser] = useState(false);
  const [result, setResult] = useState(true);
  const [form] = Form.useForm();
  const [datos, setDatos] = useState({
    nombre_usuario: '',
    documento_usuario: '',
    telefono_usuario: '',
    fecha_nacimiento_usuario: '',
    correo_usuario: '',
    estado_usuario: '',
    url_img_usuario: '',
    rol_usuario: '',
    id_admin: id_admin
  })

  /* Global variables for requests */
  const API_URL = import.meta.env.VITE_API_URL

  const url = `http://${document.domain}:3001/usuarios/`;
  const urlRol = `http://${document.domain}:3001/roles/`;
  const urlCrearUsuario = `http://${document.domain}:3001/crearUsuario/`;
  const urlBusqueda = `http://${document.domain}:3001/busqueda/`;

  /*Elementos del DOM*/
  let elementos = document.querySelector(".displaying-num");
  let lista = document.querySelector(".lista");

  /*Función para obtener la data de todos los usuarios*/
  const getUsers = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    try {

      const res = await fetch(API_URL + 'api/users', requestOptions);
      const data = await res.json();
      setInitLoading(false);
      setList(data.data)

    } catch (error) {
      console.log("error: ", error)
    }

  }

  /*Función para obtener los roles del software*/
  const getRoles = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const res = await fetch(urlRol, requestOptions);
    const data = await res.json();

    setRol(data);

  }

  /*Función que muestra el modal que tiene el formulario para crear usuarios*/
  const showModal = () => {
    setVisible(true);
  };

  /*Función que crea usuarios*/
  const handleSubmitUsers = async (e) => {

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...datos
      }
      )
    }

    const res = await fetch(urlCrearUsuario, requestOptions);

    openNotificationWithIcon('success');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      onReset();
      window.location.reload();
    }, 1000);

  };

  /*Función que cierra el modal del formulario para crear usuarios*/
  const handleCancel = () => {
    setVisible(false);
  };

  /*Función que limpia los inputs del formulario para crear usuarios*/
  const onReset = () => {
    form.resetFields();
  };

  /*Función para actualizar los datos del usuario cada vez que hace cambios en los inputs del formulario de crear usuarios*/
  const handleInputChange = (e) => {

    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })

  }

  /*Función que actualiza cual item de la lista desplegable es seleccionado*/
  const handleSelectChange = (value) => {

    setDatos({
      ...datos,
      estado_usuario: '1',
      rol_usuario: `${value}`
    })

  };


  /*Función para convertir la URL del adjunto que suben al formulario de crear usuarios en base64 y almacenarlo en el estado global*/
  const getUrlCreateUser = async () => {
    const fileInput = document.getElementById('url_img_usuario');
    const selectedFile = fileInput.files[0];
    console.log(selectedFile)
    const btn = document.getElementsByClassName('btnCrearUsuario');

    if (selectedFile.type != "image/png" && selectedFile.type != "image/jpeg" && selectedFile.type != "image/jpg") {
      console.log('LLEGO');
      alert("Solo se permiten imágenes en PNG, JPG y JPEG")
      fileInput.value = "";
      console.log(btn[0])
      btn[0].setAttribute('disabled', 'true');
    } else {
      btn[0].removeAttribute('disabled');


      let result = await useGetBase64(selectedFile);
      let url = result;

      setDatos({
        ...datos,
        [fileInput.id]: url
      })
    }
  }

  /*Función que muestra una notificación cuando se ha logrado crear un usuario*/
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: '¡Usuario creado correctamente!',
      description:
        'Los datos ingresados son correctos :)',
    });
  };

  /*Función para hacer búsquedas de usuarios*/
  const onSearchUsers = async (value) => {

    if (value == '') {
      getUsers()
      setDataUser(false);
      setResult(true);
      lista.removeAttribute('style')
    }

    setBusqueda({
      search: value,
      page: 1
    });

    localStorage.setItem('search', value);

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...busqueda
      })
    }

    const ruta = urlBusqueda + value;
    const res = await fetch(ruta, requestOptions);
    const data = await res.json();
    let busquedaArr = Object.values(data["result"]);

    if (data["result"].length == 0) {
      setResult(false)
    }

    setDataUser(busquedaArr);
    setUser(false);
    lista.setAttribute('style', 'display:none')

    if (data['result'].length == 1) {
      elementos.innerHTML = `
        1 elemento
      `;
    } else {
      elementos.innerHTML = `
      ${data["count"]} elementos
    `;
    }

  }

  /*Funciones que se ejecutarán cuando se renderice la página*/
  useEffect(() => {

    getUsers();
    // getRoles();

  }, [])

  /*Función y objetos del antd requeridos para el uso del componente Upload*/
  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    }
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e.fileList;
    }

    return e.fileList;
  };

  return (
    <div className='contenedor_main'>
      <h1>Usuarios</h1>

      <div className='d-flex justify-content-around mb-3'>

        <Button type="primary" onClick={showModal} className="btnAgregarUsuario">
          Añadir usuario
        </Button>
        <Search
          placeholder="input search text"
          onSearch={onSearchUsers}
          style={{
            width: 200,
          }}
          enterButton />

        <span className="displaying-num m-2"></span>
      </div>

      <Modal
        open={visible}
        title="Crear usuario"
        onCancel={handleCancel}
        width="800px"
        footer={[


        ]}
      >

        <Form {...layout} form={form} name="crearUsuario" className="crearUsuario" id="crearUsuario" onFinish={handleSubmitUsers}>

          <Row className='d-flex align-items-center justify-content-center foto_perfil'>
            <Form.Item
              name="url_img_usuario"
              label=""
              valuePropName="fileList"
              onChange={getUrlCreateUser}
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Este campo es obligatorio" }]}
            >
              <Upload name="url_img_usuario" listType="picture" {...props} maxCount={1} id="url_img_usuario" accept="image/png, image/jpeg, image/jpg">
                <Button icon={<UploadOutlined />}>Foto de perfil</Button>
              </Upload>
            </Form.Item>
          </Row>

          <Row className='col-12 d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center'>
              <Col span={12} className="m-3">
                <Form.Item name="nombre_usuario" label="Nombre" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" title="Ingresa un nombre válido" onChange={handleInputChange} name="nombre_usuario" />
                </Form.Item>
                <Form.Item name="fecha_nacimiento_usuario" label="Nacimiento" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="date" onChange={handleInputChange} name="fecha_nacimiento_usuario" />
                </Form.Item>
                <Form.Item name="rol_usuario" label="Rol" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Select required
                    defaultValue='Seleccione:'
                    placeholder=""
                    onChange={handleSelectChange}
                    allowClear
                    name="rol_usuario"
                  >
                    {!rol ? 'Cargando...' :

                      rol.map((rol) => {
                        return <Option key={rol.id_rol} value={rol.id_rol}>{rol.nombre_rol}</Option>

                      })

                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} className="m-3">
                <Form.Item name="correo_usuario" label="Correo" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$" title="Ingresa un correo válido" onChange={handleInputChange} name="correo_usuario" />
                </Form.Item>
                <Form.Item name="documento_usuario" label="Documento" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" pattern="([0-9]{6,10})" title="Ingresa un número de documento válido" onChange={handleInputChange} name="documento_usuario" />
                </Form.Item>
                <Form.Item name="telefono_usuario" label="Teléfono" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" pattern="([0-9]{7,10})" title="Ingresa un número de teléfono/celular válido" onChange={handleInputChange} name="telefono_usuario" />
                </Form.Item>
              </Col>
            </div>
          </Row>
          <div className='d-flex justify-content-center'>
            <Form.Item >
              <Button htmlType="button" onClick={onReset}>
                Limpiar
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} className="btnCrearUsuario">
                Crear
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <div id='bodyUsers'>
        <InfiniteScroll
          dataLength={list.length}
          hasMore={list.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={"data:image/png;base64," + item.urlImg} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
        <ul className='lista'>
          {!user ? '' :

            user.map(user => {
              return <CardUser
                key={user.id_usuario}
                nombre={user.nombre_usuario}
                correo={user.correo_usuario}
                telefono={user.telefono_usuario}
                estado={user.estado_usuario}
                url={user.url_img_usuario}
                id={user.id_usuario}
              />

            })

          }
        </ul>
        <ul>
          {!dataUser ? '' :

            dataUser.map(dataUser => {
              return <CardUser
                key={dataUser.id_usuario}
                nombre={dataUser.nombre_usuario}
                correo={dataUser.correo_usuario}
                telefono={dataUser.telefono_usuario}
                estado={dataUser.estado_usuario}
                url={dataUser.url_img_usuario}
                id={dataUser.id_usuario}
              />

            })

          }
        </ul>
        <div>
          {
            !result ? <Result
              title="Sin resultados"
            /> : ''
          }
        </div>
      </div>


    </div >
  )
}

export default UsersView;