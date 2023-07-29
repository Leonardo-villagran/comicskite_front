import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const base_url = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const RegistroUsuario = ({ mensaje }) => {
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        telefono: '',
        contrasena: '',
    });
    const [formErrors, setFormErrors] = useState({
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

        // Realizar validación del campo y establecer el mensaje de error si es necesario
        let errorMessage = '';
        if (name === 'nombre' && value.trim() === '') {
            errorMessage = 'Este campo es obligatorio.';
        } else if (name === 'apellido' && value.trim() === '') {
            errorMessage = 'Este campo es obligatorio.';
        } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMessage = 'Ingrese un correo electrónico válido.';
        } else if (name === 'direccion' && value.trim() === '') {
            errorMessage = 'Este campo es obligatorio.';
        } else if (name === 'telefono'  && value.trim() === '') {
            errorMessage = 'Ingrese un número de teléfono válido.';
        } else if (name === 'contrasena' && value.length < 4) {
            errorMessage = 'La contraseña debe tener al menos 4 caracteres.';
        }
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí realizas las validaciones del lado del cliente
            if (!formData.nombre || !formData.apellido || !formData.email || !formData.direccion || !formData.telefono || !formData.contrasena) {
                toast.error('Por favor, complete todos los campos.');
                return;
            }

            let formIsValid = true;
            const newErrors = {};
            // Validar campos obligatorios al enviar el formulario
            if (formData.nombre.trim() === '') {
                newErrors.nombre = 'El nombre no puede estar vacío';
                formIsValid = false;
            }
            if (formData.apellido.trim() === '') {
                newErrors.apellido = 'El Apellido no puede estar vacío';
                formIsValid = false;
            }

            if (formData.email.trim() === '') {
                newErrors.email = 'El email no puede estar vacío';
                formIsValid = false;
            }

            if (formData.direccion.trim() === '') {
                newErrors.direccion = 'La dirección no puede estar vacía';
                formIsValid = false;
            }

            if (formData.telefono.trim() === '') {
                newErrors.telefono = 'El teléfono no puede estar vacío';
                formIsValid = false;
            }

            if (!formIsValid) {
                setFormErrors(newErrors);
                toast.error('Error. Por favor, complete correctamente el formulario.');
                return;
            }


            setIsProcessing(true); // Bloquear el botón al inicio de la solicitud
            // Aquí va la URL del backend donde se procesará el formulario
            const response = await axios.post(base_url + '/registrar', formData);
            // Si el registro fue exitoso, muestra el toast de éxito y redirecciona a la página de inicio de sesión
            if (response.data) {
                // Después de registrar exitosamente al usuario:
                localStorage.setItem('usuarioCreado', 'true');
                setIsProcessing(false); //Liberar el botón cuando entra
                navigate('/iniciar_sesion');
            } else {
                // Si ocurrió un error en el registro, muestra el toast de error
                setIsProcessing(false); //Liberar el botón cuando entra
                console.log(response.data)
                toast.error('Error. Por favor, complete correctamente el formulario.');
            }
        } catch (error) {
            // Si hubo un error en la petición, muestra el toast de error
            setIsProcessing(false); //Liberar el botón cuando entra
            toast.error('Error al procesar el formulario. Intente nuevamente más tarde.');
        }
    };

    const textFieldStyle = {
        background: 'white',
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={1000} newestOnTop />
            <h2 style={{ color: '#ebca6d' }}>{mensaje}</h2>
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
                        {formErrors.nombre && <p style={{ color: 'red' }}>{formErrors.nombre}</p>}
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
                        {formErrors.apellido && <p style={{ color: 'red' }}>{formErrors.apellido}</p>}
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
                        {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
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
                        {formErrors.direccion && <p style={{ color: 'red' }}>{formErrors.direccion}</p>}
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
                        {formErrors.telefono && <p style={{ color: 'red' }}>{formErrors.telefono}</p>}
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
                        {formErrors.contrasena && <p style={{ color: 'red' }}>{formErrors.contrasena}</p>}
                    </div>
                </div>

                <div className="form-group row justify-content-end">
                    <div className="col-sm-10 text-right">
                        <Button variant="contained"
                            style={{
                                backgroundColor: 'black',
                                color: '#ebca6d',
                                marginLeft: '10px',
                                fontSize: '12px',
                                border: '2px solid #ebca6d'
                            }} type="submit"
                            disabled={isProcessing || Object.values(formErrors).some((error) => error !== '')} // Deshabilitar el botón mientras se está procesando
                        >{isProcessing ? 'Procesando...' : 'Registrar'}</Button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default RegistroUsuario;
