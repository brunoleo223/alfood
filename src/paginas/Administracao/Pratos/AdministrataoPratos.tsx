import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

function AdministracaoPratos() {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(response => {setPratos(response.data)});
    }, [])

    function excluirPrato(prato: IPrato){
        http.delete(`pratos/${prato.id}/`)
            .then(response => {
                const listaPratos = pratos.filter(r => r.id !== prato.id);
                setPratos([...listaPratos]);
            }
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.descricao}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>[<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]</TableCell>
                            <TableCell>
                                <Button color="error" onClick={() => excluirPrato(prato)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos;