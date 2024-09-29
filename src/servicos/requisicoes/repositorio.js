import api from "../api";

export async function buscaRepositorioUsuario(id) {
    try {
        const resultado = await api.get(`/repos?postId=${id}`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function atualizaRepositorioUsuario(postId, name, data, id) {
    try {
        await api.put(`/repos/${id}`, {
            name,
            data,
            postId
        })
        return 'sucesso'
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}

export async function buscaRepositorioUsuarioNome(id, nome) {
    try {
        const resultado = await api.get(`/repos?postId=${id}&name=${nome}`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function criarRepositorioUsuario(postId, name, data) {
    try {
        await api.post(`/repos`, {
            name,
            data,
            postId
        })
        return 'sucesso'
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}

export async function deleteRepositorioUsuario(id) {
    try {
        await api.delete(`/repos/${id}`)
        return 'sucesso'
    } catch (error) {
        return 'erro'
    }
}