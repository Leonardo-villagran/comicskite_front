import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadFileSmall, uploadFileLarge } from '../assets/js/firebase';

const base_url= import.meta.env.VITE_API_URL;

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            let resultSmall="";
            let resultLarge="";

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
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Número:</label>
                    <div className="col-sm-10">
                        <TextField
                            type="text"
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                            }}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Imagen pequeña:</label>
                    <div className="col-sm-10">
                        <input type="file" name="imagen_pequena" onChange={handleSmallImageChange} />
                    </div>
                </div>
                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Imagen grande:</label>
                    <div className="col-sm-10">
                        <input type="file" name="imagen_grande" onChange={handleLargeImageChange} />
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
                        />
                    </div>
                </div>

                <div className="form-group row justify-content-end">
                    <div className="col-sm-10 text-right">
                        <Button variant="contained" style={{ backgroundColor: 'black', color: '#ebca6d', marginLeft: '10px', fontSize: '12px', border: '2px solid #ebca6d' }} type="submit">Actualizar Producto</Button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );

};

export default EditarProducto;
