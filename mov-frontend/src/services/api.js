import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
});

api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("mov-user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.token) {
        config.headers["Authorization"] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiLogin = async (email, senha) => {
  try {
    const response = await api.post("/usuarios/login", { email, senha });
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getUsuarios = async () => {
  try {
    const response = await api.get("/usuarios");
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const criarUsuario = async (dadosUsuario) => {
  try {
    const response = await api.post("/usuarios/criar", dadosUsuario);
    return { ok: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const excluirUsuario = async (usuarioId) => {
  try {
    const response = await api.delete(`/usuarios/${usuarioId}`);
    return { ok: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getBueiros = async () => {
  try {
    const response = await api.get("/bueiros");
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const cadastrarBueiro = async (dadosBueiro) => {
  try {
    const response = await api.post("/bueiros/cadastrar", dadosBueiro);
    return { ok: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const excluirBueiro = async (bueiroId) => {
  try {
    const response = await api.delete(`/bueiros/${bueiroId}`);
    return { ok: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getManutencoes = async () => {
  try {
    const response = await api.get("/manutencoes");
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const agendarManutencao = async (dadosManutencao) => {
  try {
    const response = await api.post("/manutencoes/agendar", dadosManutencao);
    return { ok: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getMeuPerfil = async (usuarioId) => {
  try {
    const response = await api.get(`/perfil/${usuarioId}`);
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const updateMeuPerfil = async (usuarioId, dadosPerfil) => {
  try {
    const response = await api.put(`/perfil/${usuarioId}`, dadosPerfil);
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const uploadFotoPerfil = async (usuarioId, formData) => {
  try {
    const response = await api.put(`/perfil/${usuarioId}/foto`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getAlertas = async () => {
  try {
    const response = await api.get("/dashboard/alertas");
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getTabelaEventos = async () => {
  try {
    const response = await api.get("/dashboard/tabela-eventos");
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getHistoricoEventos = async () => {
  try {
    const response = await api.get("/dashboard/historico-grafico");
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getGraficoLocalizacoes = async () => {
  try {
    const response = await api.get("/dashboard/localizacoes-grafico");
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};

export const getAllEventos = async () => {
  try {
    const response = await api.get("/dashboard/eventos");
    return { ok: true, data: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Erro de rede";
    return { ok: false, error: message };
  }
};
