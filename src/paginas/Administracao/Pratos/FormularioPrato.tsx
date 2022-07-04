import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

function FormularioPrato() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);

    const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files?.length){
            setImagem(e.target.files[0]);
        } else {
            setImagem(null);
        }
    }
    
    useEffect(() => {
        http.get<{tags: ITag[]}>('tags/')
            .then(response => {setTags(response.data.tags)});
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => {setRestaurantes(response.data)});
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData();

        formData.append('nome', nome);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);

        if(imagem){
            formData.append('imagem', imagem);
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then(
            () => {
                alert('Prato cadastrado com sucesso');
            }
        ).catch(err => {
            console.log(err)
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
                label="Nome do Prato"
                fullWidth
                required
                margin="dense"
            />
            <TextField 
                value={descricao} 
                onChange={((e) => setDescricao(e.target.value))} 
                id="standard-basic"
                variant="standard"
                label="Descrição"
                fullWidth
                required
                margin="dense"
            />
            <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)}>
                    {tags.map(tag => (
                        <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl margin="dense" fullWidth>
                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                    {restaurantes.map(restaurante => (
                        <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <input type="file" onChange={selecionarArquivo} />
            <Button fullWidth sx={{marginTop: '10px'}} type="submit" variant="outlined">Cadastrar</Button>
        </Box>
    </Box>
  )
}

export default FormularioPrato