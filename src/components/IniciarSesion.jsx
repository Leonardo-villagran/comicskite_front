import { useState, useEffect } from 'react';
import Context from '../Context/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@mui/material';

const base_url = import.meta.env.VITE_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        contrasena: '',
    });

    const { tokenContent, setTokenContent } = useContext(Context);
    // New state to track if the button has been clicked
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        const usuarioCreado = localStorage.getItem('usuarioCreado');
        if (usuarioCreado === 'true') {
            toast.success('Usuario creado exitosamente. Ahora puedes iniciar sesión.');
            localStorage.removeItem('usuarioCreado');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Set the state to true to indicate that the button has been clicked
            setIsButtonClicked(true);
            // Aquí va la URL del backend donde se realizará el inicio de sesión
            const response = await axios.post(base_url + '/iniciar_sesion', formData);
            //console.log(response.data);
            // Si el inicio de sesión fue exitoso, guarda el token en el local storage y muestra el toast de éxito
            if (response.data.token) {

                localStorage.setItem('token', response.data.token);

                const token = localStorage.getItem('token');

                const payload = JSON.parse(window.atob(token.split('.')[1]));
                setTokenContent(payload); // Actualizamos el token en el contexto
                // Después de logear exitosamente al usuario:
                localStorage.setItem('usuarioLog', 'true');
                setIsButtonClicked(false);
                navigate('/productos'); // Redirección a /productos después de un inicio de sesión exitoso
            } else {
                toast.error('Error. Por favor, verifica tus credenciales.');
                setIsButtonClicked(false);
            }
        } catch (error) {
            toast.error('Error al procesar el inicio de sesión. Intente nuevamente más tarde.');
            setIsButtonClicked(false);
        }
    };

    useEffect(() => {
        // Verifica si hay un token en el estado global tokenContent
        // y si el estado formData tiene valores para email y contraseña
        if (tokenContent && formData.email && formData.contrasena) {
            setIsButtonClicked(false);
            navigate('/productos');
        }
    }, [tokenContent, formData.email, formData.contrasena, navigate]);


    const textFieldStyle = {
        background: 'white',
    };
    return (
        <div>
            <ToastContainer position="top-right" autoClose={1000} newestOnTop />
            <h2 style={{ color: '#ebca6d' }}>INICIAR SESIÓN</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>E-mail:</label>
                    <div className="col-sm-10">
                        <TextField
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                                autoComplete: 'email-name', // suggested autocomplete attribute
                            }}
                        />
                    </div>
                </div>
                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label label-bold text-uppercase" style={{ color: '#ebca6d' }}>Contraseña:</label>
                    <div className="col-sm-10">
                        <TextField
                            type="password"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: textFieldStyle,
                                autoComplete: 'password-name', // suggested autocomplete attribute
                            }}
                        />
                    </div>
                </div>
                <div className="form-group row justify-content-end">
                    <div className="col-sm-10 text-right">
                        <Button type="submit" variant="contained" style={{ backgroundColor: 'black', color: '#ebca6d', marginLeft: '10px', fontSize: '12px', border: '2px solid #ebca6d' }}
                            disabled={isButtonClicked}>
                            Iniciar sesión
                        </Button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Login;
