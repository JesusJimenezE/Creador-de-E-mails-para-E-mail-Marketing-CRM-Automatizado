import React from 'react'

export const Nuecont = () => {
  return (
    <div>
      <Cabe />
    <div className={styles.NuevoPage}> 
      
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
            <Label for="conte">Numero:</Label>
            <Input id="numeroc" name="numero" type="number" />
          </FormGroup>

          <FormGroup>
              <Label for="conte">Dirrecion:</Label>
              <Input id="dirrecion" name="text" type="textarea" />
            </FormGroup>

            <Button className={styles.env}>Guardar</Button>
            <Button className={styles.lim}>Limpiar</Button>
          </Form>
      </div>
      
    </div>
    <Piep />
    </div>
  )
}
