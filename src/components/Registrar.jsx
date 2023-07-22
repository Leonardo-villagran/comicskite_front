import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const base_url= import.meta.env.VITE_BASE_URL;


const RegistroUsuario = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        telefono: '',
        contrasena: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí va la URL del backend donde se procesará el formulario
            const response = await axios.post(base_url+'/registrar', formData);
            // Si el registro fue exitoso, muestra el toast de éxito y redirecciona a la página de inicio de sesión
            if (response.data) {
                toast.success('Usuario creado satisfactoriamente');
                navigate('/iniciar_sesion');
            } else {
                // Si ocurrió un error en el registro, muestra el toast de error
                toast.error('Error. Por favor, complete correctamente el formulario.');
            }
        } catch (error) {
            // Si hubo un error en la petición, muestra el toast de error
            toast.error('Error al procesar el formulario. Intente nuevamente más tarde.');
        }
    };

    const textFieldStyle = {
        background: 'white',
    };

    return (
        <div>
            <h2 style={{ color: '#ebca6d' }}>REGISTRO DE USUARIO</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Nombre:</label>
                    <div className="col-sm-10">
                        <TextField
                            key="1"
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                                autoComplete: 'given-name', // suggested autocomplete attribute
                            }}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Apellido:</label>
                    <div className="col-sm-10">
                        <TextField
                        key="2"
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                                autoComplete: 'family-name', // suggested autocomplete attribute
                            }}
                            
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>E-mail:</label>
                    <div className="col-sm-10">
                        <TextField
                            key="3"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                                autoComplete: 'email', // suggested autocomplete attribute
                            }}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Dirección:</label>
                    <div className="col-sm-10">
                        <TextField
                            key="4"
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                                autoComplete: 'street-address', // suggested autocomplete attribute
                            }}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Teléfono:</label>
                    <div className="col-sm-10">
                        <TextField
                            key="5"
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                                autoComplete: 'tel', // suggested autocomplete attribute
                            }}
                        />
                    </div>
                </div>

                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Contraseña:</label>
                    <div className="col-sm-10">
                        <TextField
                            key="6"
                            type="password"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                                autoComplete: 'current-password', // suggested autocomplete attribute
                            }}
                        />
                    </div>
                </div>

                <div className="form-group row justify-content-end">
                    <div className="col-sm-10 text-right">
                        <Button variant="contained" style={{ backgroundColor: 'black', color: '#ebca6d', marginLeft: '10px', fontSize: '12px', border: '2px solid #ebca6d'  }} type="submit">Registrar</Button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default RegistroUsuario;
