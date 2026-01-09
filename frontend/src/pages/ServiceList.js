import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const ServiceList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Appel à ton endpoint Django : GET /api/services/list/
        api.get('/services/list/')
            .then(response => setServices(response.data))
            .catch(err => console.error("Erreur de chargement", err));
    }, []);

    return (
        <div>
            <h2>Catalogue des Services</h2>
            <div className="service-grid">
                {services.map(service => (
                    <div key={service.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <p><strong>Prix : {service.price} €</strong></p>
                        <button>Commander</button>
                    </div>
                ))}
            </div>
            <p>Liste des services disponibles ici.</p>
        </div>
    );
};

export default ServiceList;