import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

function AdministracaoRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => {setRestaurantes(response.data)});
    }, [])

    function excluirRestaurante(restaurante: IRestaurante){
        http.delete(`restaurantes/${restaurante.id}/`)
            .then(response => {
                const listaRestaurantes = restaurantes.filter(r => r.id !== restaurante.id);
                setRestaurantes([...listaRestaurantes]);
            }
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>[<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]</TableCell>
                            <TableCell>
                                <Button color="error" onClick={() => excluirRestaurante(restaurante)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;