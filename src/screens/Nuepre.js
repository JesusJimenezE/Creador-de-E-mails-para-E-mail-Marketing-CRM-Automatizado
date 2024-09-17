import React from 'react'
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import styles from './Nuecont.module.css';


export const Nuepre = () => {
    return (
        <div>
            <Cabe />
            <div className={styles.NueprPage}>

                <div className={styles.FormContainer}>
                    <Form>
                        <FormGroup>
                            <Label for="asunto">Nombre:</Label>
                            <Input id="nombrep" name="nombre" type="text" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="conte">Correo:</Label>
                            <Input id="correop" name="correo" type="email" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="conte">Numero telefonico:</Label>
                            <Input id="numerop" name="numero" type="number" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="conte">Contraseña:</Label>
                            <Input id="contrasena" name="contrasena" type="password" />
                        </FormGroup>

                        <Button className={styles.guar}>Agregar</Button>
                    </Form>
                </div>

            </div>
            <Piep />
        </div>
    )
}

export default Nuepre;