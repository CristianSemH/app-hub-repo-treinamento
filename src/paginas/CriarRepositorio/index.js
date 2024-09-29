import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { criarRepositorioUsuario } from '../../servicos/requisicoes/repositorio';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [idUsuario, setIdUsuario] = useState(route.params.idUsuario);

    async function criar() {
        const resultado = await criarRepositorioUsuario(
            idUsuario,
            nome,
            data
        )

        if (resultado === 'sucesso') {
            Alert.alert("Repositório criado!")
            navigation.goBack();
        } else {
            Alert.alert("Erro ao criar repositório!")
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity style={estilos.botao} onPress={criar}>
                <Text style={estilos.textoBotao}>
                    Criar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
