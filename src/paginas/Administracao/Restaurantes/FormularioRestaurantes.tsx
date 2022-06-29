import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";

function FormularioRestaurantes() {

    const [nome, setNome] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        axios.post("http://localhost:8000/api/v2/restaurantes/", {nome})
            .then(() => {
                alert("Restaurante cadastrado com sucesso!");
            })
    }

  return (
    <form onSubmit={handleSubmit}>
        <TextField 
            value={nome} 
            onChange={((e) => setNome(e.target.value))} 
            id="standard-basic"
            variant="standard"
            label="Nome do restaurante"
        />
        <Button type="submit" variant="outlined">Cadastrar</Button>
    </form>
  )
}

export default FormularioRestaurantes