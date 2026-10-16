const API_BASE = "http://localhost:8080";

export const apiLogin = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Usuário ou senha inválidos");
  }

  return await response.json();
};

export const apiCadastro = async (usuario) => {
  const response = await fetch(`${API_BASE}/usuarios/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: usuario.name,
      username: usuario.email,
      password: usuario.password,
      nivelAcesso: "USER",
      statusUsuario: "ATIVO",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao cadastrar usuário");
  }

  return await response.json();
};

export const apiGetMe = async () => {
  const response = await fetch(`${API_BASE}/usuarios/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Não autorizado");
  }

  return await response.json();
};

export const apiLogout = async () => {
  const response = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer logout");
  }

  return await response.json();
};
