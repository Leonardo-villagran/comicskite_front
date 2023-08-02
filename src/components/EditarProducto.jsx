import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadFileSmall, uploadFileLarge } from '../assets/js/firebase';

const base_url = import.meta.env.VITE_API_URL;

const EditarProducto = () => {
    const navigate = useNavigate();
    const { id_producto } = useParams();

    const [smallImage, setSmallImage] = useState(null);
    const [largeImage, setLargeImage] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        numero: '',
        imagen_pequena: '',
        imagen_grande: '',
        detalle: '',
        precio: '',
        stock: ''
    });

    const [errors, setErrors] = useState({
        nombre: '',
        numero: '',
        imagen_pequena: '',
        imagen_grande: '',
        detalle: '',
        precio: '',
        stock: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Validar campos obligatorios mientras se escribe
        if (value.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Este campo es obligatorio' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }

    };

    useEffect(() => {
        // Cargar los datos del producto existente
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token'); // Reemplaza 'jwt_token' por la clave adecuada para el token JWT en el almacenamiento local
                if (!token) {
                    // Manejo del caso donde el token no está disponible
                    toast.error('Token no encontrado. Inicie sesión para continuar.');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get(`${base_url}/producto/${id_producto}`, config);
                const productData = response.data;

                // Actualizar el estado con los datos del producto existente
                setFormData({
                    nombre: productData.nombre,
                    numero: productData.numero,
                    imagen_pequena: productData.imagen_pequena,
                    imagen_grande: productData.imagen_grande,
                    detalle: productData.detalle,
                    precio: productData.precio,
                    stock: productData.stock,
                });
                
            } catch (error) {
                toast.error('Error al cargar los datos del producto. Intente nuevamente más tarde.');
            }
        };

        fetchProduct();
    }, [id_producto]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        //console.log("FormData:", formData);

        // Validar campos obligatorios al enviar el formulario
        if (formData.nombre.trim() === '') {
            newErrors.nombre = 'El nombre no puede estar vacío';
            formIsValid = false;
        }
        if (formData.numero === '') {
            newErrors.numero = 'El número no puede estar vacío';
            formIsValid = false;
        }

        if (formData.detalle.trim() === '') {
            newErrors.detalle = 'El detalle no puede estar vacío';
            formIsValid = false;
        }

        if (formData.precio === '') {
            newErrors.precio = 'El precio no puede estar vacío';
            formIsValid = false;
        }

        if (formData.stock === '') {
            newErrors.stock = 'El stock no puede estar vacío';
            formIsValid = false;
        }

        if (!formIsValid) {
            setErrors(newErrors);
            toast.error('Error. Por favor, complete correctamente el formulario.');
            return;
        }


        try {

            setIsLoading(true); // Iniciar el estado de envío del formulario

            const token = localStorage.getItem('token'); // Reemplaza 'jwt_token' por la clave adecuada para el token JWT en el almacenamiento local
            if (!token) {
                // Manejo del caso donde el token no está disponible
                toast.error('Token no encontrado. Inicie sesión para continuar.');
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            let resultSmall = "";
            let resultLarge = "";

            if (smallImage === null) {
                // El estado está null
                console.log('smallImage está null');
                resultSmall = formData.imagen_pequena
            } else {
                // El estado no está null
                console.log('smallImage no está null');
                resultSmall = await uploadFileSmall(smallImage);
            }
            console.log("Imagen pequeña: ", resultSmall);

            if (largeImage === null) {
                // El estado está null
                console.log('largeImage está null');
                resultLarge = formData.imagen_grande;
            } else {
                // El estado no está null
                console.log('largeImage no está null');
                resultLarge = await uploadFileLarge(largeImage);
            }
            console.log("Imagen grande: ", resultLarge);

            const productInfo = {
                nombre: formData.nombre,
                numero: formData.numero,
                detalle: formData.detalle,
                imagen_pequena: resultSmall,
                imagen_grande: resultLarge,
                precio: formData.precio,
                stock: formData.stock,
            };

            const response = await axios.put(`${base_url}/editar_producto/${id_producto}`, productInfo, config);

            if (response.data) {
                toast.success('Producto actualizado satisfactoriamente');
                setIsLoading(false); // Finalizar el estado de envío del formulario
                localStorage.setItem('ComicEditado', 'true');
                navigate('/publicaciones');
            } else {
                toast.error('Error. Por favor, complete correctamente el formulario.');
            }
        } catch (error) {
            toast.error('Error al procesar el formulario. Intente nuevamente más tarde.');
        }
    };

    const textFieldStyle = {
        background: 'white',
    };

    const handleSmallImageChange = (e) => {
        const file = e.target.files[0];
        setSmallImage(file);
    };

    const handleLargeImageChange = (e) => {
        const file = e.target.files[0];
        setLargeImage(file);
    };


    return (
        <div>
            <ToastContainer position="top-right" autoClose={1000} newestOnTop />
            <h2 style={{ color: '#ebca6d' }}>EDITAR PRODUCTO</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Nombre:</label>
                    <div className="col-sm-10">
                        <TextField
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                            }}
                            error={!!errors.nombre}
                            helperText={errors.nombre && <span style={{ color: 'red', fontSize: '16px' }}>{errors.nombre}</span>}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Número:</label>
                    <div className="col-sm-10">
                        <TextField
                            type="number"
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                            }}
                            error={!!errors.numero}
                            helperText={errors.numero && <span style={{ color: 'red', fontSize: '16px' }}>{errors.numero}</span>}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Imagen pequeña:</label>
                    <div className="col-sm-10 ">
                        <input id="icon-button-file1" hidden type="file" name="imagen_pequena" onChange={handleSmallImageChange} accept="image/*" />
                        <label htmlFor="icon-button-file1">
                            <div
                                style={{
                                    display: 'inline-block',
                                    backgroundColor: 'black',
                                    color: '#ebca6d',
                                    fontSize: '12px',
                                    border: '2px solid #ebca6d',
                                    padding: '10px 30px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >AGREGAR IMAGEN PEQUEÑA</div>
                        </label>
                    </div>
                    <div>
                        {/*smallImage && (
                            <img src={URL.createObjectURL(smallImage)} alt="Imagen pequeña" style={{ maxWidth: '50px', marginTop: '10px' }} />
                        )*/}
                    </div>
                </div>
                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Imagen grande:</label>
                    <div className="col-sm-10">
                        <input id="icon-button-file2" hidden type="file" name="imagen_grande" onChange={handleLargeImageChange} accept="image/*" />
                        <label htmlFor="icon-button-file2">
                            <div
                                style={{
                                    display: 'inline-block',
                                    backgroundColor: 'black',
                                    color: '#ebca6d',
                                    fontSize: '12px',
                                    border: '2px solid #ebca6d',
                                    padding: '10px 30px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >AGREGAR IMAGEN GRANDE</div>
                        </label>                     
                    </div>
                </div>


                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Detalle:</label>
                    <div className="col-sm-10">
                        <TextField
                            type="text"
                            name="detalle"
                            value={formData.detalle}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                            }}
                            error={!!errors.detalle}
                            helperText={errors.detalle && <span style={{ color: 'red', fontSize: '16px' }}>{errors.detalle}</span>}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Precio:</label>
                    <div className="col-sm-10">
                        <TextField
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                            }}
                            error={!!errors.precio}
                            helperText={errors.precio && <span style={{ color: 'red', fontSize: '16px' }}>{errors.precio}</span>}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Stock:</label>
                    <div className="col-sm-10">
                        <TextField
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                            }}
                            error={!!errors.stock}
                            helperText={errors.stock && <span style={{ color: 'red', fontSize: '16px' }}>{errors.stock}</span>}
                        />
                    </div>
                </div>

                <div className="form-group row justify-content-center">
                    <div className="col-sm-10 text-right">
                        <Button variant="contained" 
                        style={{ 
                            backgroundColor: isLoading ? 'gray' : 'black',
                            color: '#ebca6d', 
                            fontSize: '12px', 
                            border: '2px solid #ebca6d' 
                        }} 
                        type="submit" disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Actualizar Producto'}
                        </Button>
                    </div>
                </div>
            </form>

        </div>
    );

};

export default EditarProducto;
