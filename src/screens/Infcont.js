import React from 'react'
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import styles from './Infcont.module.css'; 

export const Infcont = () => {
    return (
        <div>
            <Cabe />

            <div className={styles.Infpage}>

                <div className={styles.FormContainer}>
                <Form>
            <FormGroup>
              <Label for="asunto">Nombre:</Label>
              <Input id="nombrec" name="nombre" type="text" />
            </FormGroup>

            <FormGroup>
              <Label for="conte">Edad:</Label>
              <Input id="edad" name="edad" type="number" />
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">Genero:</Label>
              <Input id="genero" name="select" type="select">
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otros</option>
              </Input>
            </FormGroup>

            <FormGroup>
            <Label for="conte">Correo:</Label>
            <Input id="correoc" name="correo" type="email" />
          </FormGroup>

          <FormGroup>
            <Label for="conte">Numero telefonico:</Label>
            <Input id="numeroc" name="numero" type="number" />
          </FormGroup>

          <FormGroup>
              <Label for="conte">Dirrecion:</Label>
              <Input id="dirrecion" name="text" type="textarea" />
            </FormGroup>

            <Button className={styles.edit}>Editar</Button>
            <Button className={styles.eli}>Eliminar</Button>
          </Form>
                </div>

            </div>

            <Piep />
        </div>
    )
}

export default Infcont;