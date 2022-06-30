import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";

function FormularioRestaurantes() {

    const parametros = useParams();

    useEffect(() => {
        if(parametros.id){
            http.get(`restaurantes/${parametros.id}/`)
                .then(response => {
                    setNome(response.data.nome);
                }
            )
        }
    }, [parametros])

    const [nome, setNome] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(parametros.id){
            http.put(`restaurantes/${parametros.id}/`, {nome})
                .then(response => {
                    alert("Restaurante atualizado com sucesso!");
                }
            )
            return;
        }

        http.post("restaurantes/", {nome})
            .then(() => {
                alert("Restaurante cadastrado com sucesso!");
            })
    }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography component="h1" variant="h6">
            Formulário de restaurantes
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
            <TextField 
                value={nome} 
                onChange={((e) => setNome(e.target.value))} 
                id="standard-basic"
                variant="standard"
                label="Nome do restaurante"
                fullWidth
                required
            />
            <Button fullWidth sx={{marginTop: '10px'}} type="submit" variant="outlined">Cadastrar</Button>
        </Box>
    </Box>
  )
}

export default FormularioRestaurantes