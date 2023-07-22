import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { uploadFileSmall, uploadFileLarge } from '../assets/js/firebase';

const base_url= import.meta.env.VITE_BASE_URL;

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
            console.log(token);
            // Agregar el token al encabezado de la solicitud
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            
            const resultSmall= await uploadFileSmall(smallImage);
            console.log("Imagen pequeña: ",resultSmall);
            const resultLarge= await uploadFileLarge(largeImage);
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


            const response = await axios.post(base_url+'/nuevo_producto', productInfo, config);

            if (response.data) {
                toast.success('Producto agregado satisfactoriamente');
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
                        <Button variant="contained" style={{ backgroundColor: 'black', color: '#ebca6d', marginLeft: '10px', fontSize: '12px', border: '2px solid #ebca6d' }} type="submit">Agregar Producto</Button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AgregarProducto;