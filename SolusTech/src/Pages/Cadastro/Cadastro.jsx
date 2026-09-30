import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import styles from "./Cadastro.module.css";
import bgImg from "../../assets/headerimg.png";

// ---------- Máscaras ----------
const maskCPF = (v) =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

const maskCEP = (v) =>
  v
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");

// ---------- Validação de CPF ----------
function cpfValido(cpf) {
  const n = cpf.replace(/\D/g, "");
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;

  const digito = (base) => {
    let soma = 0;
    for (let i = 0; i < base; i++) soma += Number(n[i]) * (base + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(n[9]) && digito(10) === Number(n[10]);
}

const initialForm = {
  name: "",
  email: "",
  cpf: "",
  cep: "",
  numero: "",
  rua: "",
  bairro: "",
  cidade: "",
  uf: "",
  password: "",
  confirmPassword: "",
};

const TITULOS = ["Seus dados", "Endereço", "Crie sua senha"];

function Cadastro() {
  const [form, setForm] = useState(initialForm);
  const [etapa, setEtapa] = useState(0); // 0, 1 ou 2
  const [cepBuscado, setCepBuscado] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [sending, setSending] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const navigate = useNavigate();

  const setField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cpf") return setField(name, maskCPF(value));
    if (name === "cep") {
      setCepBuscado(false);
      return setField(name, maskCEP(value));
    }
    if (name === "numero") return setField(name, value.replace(/\D/g, ""));
    setField(name, value);
  };

  // Preenche rua/bairro/cidade/UF automaticamente pelo CEP (API ViaCEP)
  const buscarCep = async () => {
    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      setLoadingCep(true);
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        uf: data.uf || "",
      }));
      setCepBuscado(true);
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      alert("Não foi possível buscar o CEP.");
    } finally {
      setLoadingCep(false);
    }
  };

  function handleVoltar(e) {
    e.preventDefault();
    if (etapa > 0) {
      setEtapa(etapa - 1);
      return;
    }
    setSaindo(true);
    setTimeout(() => navigate("/login"), 400);
  }

  const enviarCadastro = async () => {
    const templateParams = {
      user_name: form.name.trim(),
      user_email: form.email.trim(),
      user_cpf: form.cpf,
      user_cep: form.cep,
      user_numero: form.numero,
      user_rua: form.rua,
      user_bairro: form.bairro,
      user_cidade: form.cidade,
      user_uf: form.uf,
      // A senha NÃO é enviada por e-mail
    };

    try {
      setSending(true);
      await emailjs.send(
        "service_augustocamargo",
        "template_hpsbof6",
        templateParams,
        { publicKey: "tNT4SyGzY2a7nWy0m" }
      );
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      alert("Erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (etapa === 0) {
    setEtapa(1);
    return;
  }

  if (etapa === 1) {
    if (!cepBuscado) {
      alert("Digite um CEP válido para continuar.");
      return;
    }
    setEtapa(2);
    return;
  }

  if (form.password !== form.confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }
  enviarCadastro();
};

  return (
    <main  className={styles.container}
       style={{ backgroundImage: `url(${bgImg})` }}>
      <form
        className={`${styles.form} ${saindo ? styles.saindo : ""}`}
        onSubmit={handleSubmit}
      >
        <a href="/login" onClick={handleVoltar} className={styles.voltar}>
          ← Voltar
        </a>

        <h1>Cadastro</h1>

        {/* Indicador de etapas */}
        <div className={styles.progresso}>
          {TITULOS.map((_, i) => (
            <span
              key={i}
              className={`${styles.barra} ${i <= etapa ? styles.ativa : ""}`}
            />
          ))}
        </div>
        <p className={styles.subtitulo}>
          Etapa {etapa + 1} de {TITULOS.length} · {TITULOS[etapa]}
        </p>

        <div key={etapa} className={styles.etapa}>
          {etapa === 0 && (
            <>
              <div className={styles.inputBox}>
                <input
                  name="name"
                  type="text"
                  placeholder="Nome completo"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <i className="bx bxs-user"></i>
              </div>

              <div className={styles.inputBox}>
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <i className="bx bxs-envelope"></i>
              </div>

              <div className={styles.inputBox}>
                <input
                  name="cpf"
                  type="text"
                  inputMode="numeric"
                  placeholder="CPF"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                />
                <i className="bx bxs-id-card"></i>
              </div>
            </>
          )}

          {etapa === 1 && (
            <>
              <div className={styles.row}>
                <div className={styles.inputBox}>
                  <input
                    name="cep"
                    type="text"
                    inputMode="numeric"
                    placeholder="CEP"
                    value={form.cep}
                    onChange={handleChange}
                    onBlur={buscarCep}
                    required
                  />
                  <i
                    className={
                      loadingCep ? "bx bx-loader-alt bx-spin" : "bx bxs-map"
                    }
                  ></i>
                </div>

                <div className={styles.inputBox}>
                  <input
                    name="numero"
                    type="text"
                    inputMode="numeric"
                    placeholder="Nº"
                    value={form.numero}
                    onChange={handleChange}
                    required
                  />
                  <i className="bx bxs-home"></i>
                </div>
              </div>

              {/* Só aparece depois de buscar o CEP */}
              {cepBuscado && (
                <>
                  <div className={styles.inputBox}>
                    <input
                      name="rua"
                      type="text"
                      placeholder="Rua"
                      value={form.rua}
                      onChange={handleChange}
                      required
                    />
                    <i className="bx bxs-directions"></i>
                  </div>

                  <div className={styles.inputBox}>
                    <input
                      name="bairro"
                      type="text"
                      placeholder="Bairro"
                      value={form.bairro}
                      onChange={handleChange}
                      required
                    />
                    <i className="bx bxs-buildings"></i>
                  </div>

                  <p className={styles.cidade}>
                    <i className="bx bxs-city"></i>
                    {form.cidade} - {form.uf}
                  </p>
                </>
              )}
            </>
          )}

          {etapa === 2 && (
            <>
              <div className={styles.inputBox}>
                <input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <i className="bx bxs-lock-alt"></i>
              </div>

              <div className={styles.inputBox}>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmar senha"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <i className="bx bxs-lock-alt"></i>
              </div>
            </>
          )}
        </div>

        <button type="submit" className={styles.login} disabled={sending}>
          {etapa < 2 ? "Continuar" : sending ? "Enviando..." : "Cadastrar"}
        </button>

        <div className={styles.register}>
          <p>
            Já tem conta? <a href="/login">Faça login</a>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Cadastro;
