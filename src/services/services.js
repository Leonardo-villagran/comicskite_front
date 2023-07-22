import jwt_decode from "jwt-decode";
// Función para decodificar el payload del token
export default function decodeTokenPayload(token) {
    try {
        // Divide el token por el punto (.)
        const payload = jwt_decode(token);
        return payload;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

export const decodeJWT = (token) => {

    if (token === null || token === '') {
        // No hay token en el Local Storage o está vacío
        console.log('No hay token almacenado en el Local Storage.');
        return '';
    } else {
        // Hay un token válido en el Local Storage
        console.log('Se encontró un token en el Local Storage');
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
                .join("")
        );

        return JSON.parse(jsonPayload);
    }

};

