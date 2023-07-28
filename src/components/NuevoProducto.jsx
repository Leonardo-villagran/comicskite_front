import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { uploadFileSmall, uploadFileLarge } from '../assets/js/firebase';

const base_url = import.meta.env.VITE_API_URL;

const AgregarProducto = () => {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        // Validar campos obligatorios al enviar el formulario
        if (formData.nombre.trim() === '') {
            newErrors.nombre = 'El nombre no puede estar vacío';
            formIsValid = false;
        }

        if (formData.numero.trim() === '') {
            newErrors.numero = 'El número no puede estar vacío';
            formIsValid = false;
        }

        if (formData.detalle.trim() === '') {
            newErrors.detalle = 'El detalle no puede estar vacío';
            formIsValid = false;
        }

        if (formData.precio.trim() === '') {
            newErrors.precio = 'El precio no puede estar vacío';
            formIsValid = false;
        }

        if (formData.stock.trim() === '') {
            newErrors.stock = 'El stock no puede estar vacío';
            formIsValid = false;
        }
        // Validar si las imágenes están vacías
        if (!smallImage) {
            newErrors.imagen_pequena = 'La imagen pequeña es obligatoria';
            formIsValid = false;
        }

        if (!largeImage) {
            newErrors.imagen_grande = 'La imagen grande es obligatoria';
            formIsValid = false;
        }

        if (!formIsValid) {
            setErrors(newErrors);
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
            console.log(token);
            // Agregar el token al encabezado de la solicitud
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const resultSmall = await uploadFileSmall(smallImage);
            console.log("Imagen pequeña: ", resultSmall);
            const resultLarge = await uploadFileLarge(largeImage);
            console.log("Imagen grande: ", resultLarge);
            // Crear un objeto con los campos del formulario
            const productInfo = {
                nombre: formData.nombre,
                numero: formData.numero,
                detalle: formData.detalle,
                imagen_pequena: resultSmall,
                imagen_grande: resultLarge,
                precio: formData.precio,
                stock: formData.stock,
            };


            const response = await axios.post(base_url + '/nuevo_producto', productInfo, config);

            if (response.data) {
                toast.success('Producto agregado satisfactoriamente');
                setIsLoading(false); // Finalizar el estado de envío del formulario
                navigate('/publicaciones');
            } else {
                toast.error('Error. Por favor, complete correctamente el formulario.');
            }
        } catch (error) {
            toast.error('Error al procesar el formulario. ' + errors);
        }
    };

    const textFieldStyle = {
        background: 'white',
    };

    const handleSmallImageChange = (e) => {
        const file = e.target.files[0];

        // Validar si se seleccionó una imagen
        if (!file) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                imagen_pequena: 'Por favor, seleccione una imagen pequeña.',
            }));
            setSmallImage(null);
            return;
        }

        // Validar tamaño o tipo de imagen si es necesario
        // Puedes agregar más validaciones aquí si es necesario

        setErrors((prevErrors) => ({ ...prevErrors, imagen_pequena: '' }));
        setSmallImage(file);

    };

    const handleLargeImageChange = (e) => {
        const file = e.target.files[0];

        // Validar si se seleccionó una imagen
        if (!file) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                imagen_grande: 'Por favor, seleccione una imagen grande.',
            }));
            setLargeImage(null);
            return;
        }

        // Validar tamaño o tipo de imagen si es necesario
        // Puedes agregar más validaciones aquí si es necesario

        setErrors((prevErrors) => ({ ...prevErrors, imagen_grande: '' }));
        setLargeImage(file);
    };

    return (
        <div>
            <ToastContainer />
            <h2 style={{ color: '#ebca6d' }}>AGREGAR PRODUCTO</h2>
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
                    <div className="col-sm-10">
                        <input type="file" name="imagen_pequena" onChange={handleSmallImageChange} />
                        {errors.imagen_pequena && <div style={{ color: 'red', fontSize: '16px' }}>{errors.imagen_pequena}</div>}
                        {/*smallImage && (
                            <img src={URL.createObjectURL(smallImage)} alt="Imagen pequeña" style={{ maxWidth: '50px', marginTop: '10px' }} />
                        )*/}
                    </div>
                </div>
                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Imagen grande:</label>
                    <div className="col-sm-10">
                        <input type="file" name="imagen_grande" onChange={handleLargeImageChange}
                        />
                        {errors.imagen_grande && <div style={{ color: 'red', fontSize: '16px' }}>{errors.imagen_grande}</div>}
                        {/*largeImage && (
                            <img src={URL.createObjectURL(largeImage)} alt="Imagen grande" style={{ maxWidth: '100px', marginTop: '10px' }} />
                        )*/}
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
                                marginLeft: '10px',
                                fontSize: '12px',
                                border: '2px solid #ebca6d'
                            }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Agregar Producto'}
                        </Button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default AgregarProducto;