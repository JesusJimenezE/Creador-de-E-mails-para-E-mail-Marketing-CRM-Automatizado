import React from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos componentes de Reactstrap para formularios
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página
import styles from './Infcont.module.css'; // Importamos estilos específicos para esta página

export const Infcont = () => {
    return (
        <div>
            {/* Componente de la cabecera */}
            <Cabe />

            {/* Contenedor principal de la página de información de contacto */}
            <div className={styles.Infpage}>

                {/* Contenedor para el formulario */}
                <div className={styles.FormContainer}>
                    <Form>
                        {/* Campo para el nombre del contacto */}
                        <FormGroup>
                            <Label for="asunto">Nombre:</Label>
                            <Input id="nombrec" name="nombre" type="text" />
                        </FormGroup>

                        {/* Campo para la edad del contacto */}
                        <FormGroup>
                            <Label for="conte">Edad:</Label>
                            <Input id="edad" name="edad" type="number" />
                        </FormGroup>

                        {/* Selector para el género del contacto */}
                        <FormGroup>
                            <Label for="exampleSelect">Género:</Label>
                            <Input id="genero" name="select" type="select">
                                <option>Masculino</option>
                                <option>Femenino</option>
                                <option>Otros</option>
                            </Input>
                        </FormGroup>

                        {/* Campo para el correo electrónico */}
                        <FormGroup>
                            <Label for="conte">Correo:</Label>
                            <Input id="correoc" name="correo" type="email" />
                        </FormGroup>

                        {/* Campo para el número telefónico */}
                        <FormGroup>
                            <Label for="conte">Número telefónico:</Label>
                            <Input id="numeroc" name="numero" type="number" />
                        </FormGroup>

                        {/* Campo para la dirección */}
                        <FormGroup>
                            <Label for="conte">Dirección:</Label>
                            <Input id="dirrecion" name="text" type="textarea" />
                        </FormGroup>

                        {/* Botones para editar y eliminar información */}
                        <Button className={styles.edit}>Editar</Button>
                        <Button className={styles.eli}>Eliminar</Button>
                    </Form>
                </div>

            </div>

            {/* Componente del pie de página */}
            <Piep />
        </div>
    );
}

export default Infcont; // Exportamos el componente como predeterminado
