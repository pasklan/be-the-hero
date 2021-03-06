import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
    const [id, setID] = useState('');
    const history = useHistory();

    async function handlerLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no login');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="logo"/>

                <form onSubmit={handlerLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={ e => setID(e.target.value) }
                    />
                    <button className="button"  type="submit">Entrar</button>
                    <Link className='back-link' to="/register">
                        <FiLogIn size={ 16 } color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            <img src={ heroesImg } alt="Heroes"/>
        </div>
    );
}