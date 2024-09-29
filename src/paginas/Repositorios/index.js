import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import estilos from './estilos';
import { buscaRepositorioUsuario, buscaRepositorioUsuarioNome } from '../../servicos/requisicoes/repositorio';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [idUsuario, setIdUsuario] = useState(route.params.id);
    const [nomeRepo, setNomeRepo] = useState('');
    const isAtiveScreen = useIsFocused();

    async function buscaRepositorio() {
        const resultado = await buscaRepositorioUsuario(idUsuario)
        setRepo(resultado)
    }

    async function buscaRepositorioNome() {
        const resultado = await buscaRepositorioUsuarioNome(idUsuario, nomeRepo)
        setRepo(resultado)
    }

    useEffect(() => {
        buscaRepositorio()
    }, [isAtiveScreen])

    return (
        <View style={estilos.container}>

            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nomeRepo}
                onChangeText={setNomeRepo}
            />

            <TouchableOpacity
                style={estilos.botao}
                onPress={() => nomeRepo ? buscaRepositorioNome() : buscaRepositorio()}
            >
                <Text style={estilos.textoBotao}>
                    Buscar
                </Text>
            </TouchableOpacity>

            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio', { idUsuario })}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>
            <FlatList
                data={repo}
                style={{ width: '100%' }}
                keyExtractor={repo => repo.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={estilos.repositorio}
                        onPress={() => navigation.navigate('InfoRepositorio', { item })}
                    >
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>Atualizado em: {item.data}</Text>
                    </TouchableOpacity>
                )}
            >

            </FlatList>
        </View>
    );
}
