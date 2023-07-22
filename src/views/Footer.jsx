import Badge from 'react-bootstrap/Badge';
export default function FooterView() {

    return (
        <div style={{ color: '#ebca6d' }}>
            <p>Todos los derechos resevados 2023<br /><a href={`mailto:"contacto@comicskites.cl"`}><Badge bg="secondary p-2">contacto@comicskites.cl</Badge></a></p>
        </div>
    )
}
