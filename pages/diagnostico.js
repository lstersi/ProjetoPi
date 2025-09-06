import { useState, useEffect } from "react"
import Head from "next/head";
import  styles from "../styles/diagnostico.module.css";



export default function Diagnostico() {
  const [doencas, setDoencas] = useState([])
  const [resultado, setResultado] = useState(null)

   
  // Carrega doenças da API
  useEffect(() => {
    const carregarDoencas = async () => {
      try {
        const response = await fetch("/api/doencas");
        const data = await response.json();
        setDoencas(data);
      } catch (err) {
        console.error("Erro ao carregar doenças:", err);
      }
    };
    carregarDoencas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const selecionados = Array.from(e.target.sintomas.selectedOptions).map(
      o => o.value
    )

    let encontrados = []

    doencas.forEach(doenca => {
      if (selecionados.some(s => doenca.sintomas.includes(s))) {
        encontrados.push(doenca)
      }
    })

    if (encontrados.length > 0) {
      setResultado(encontrados)
    } else {
      setResultado("Nenhuma doença correspondente encontrada.")
    }
  }

  return (
    <>
      <Head>
        <title>Diagnóstico de Doenças</title>
        <meta
          name="description"
          content="Ferramenta interativa para diagnóstico de doenças e pragas da batata-doce, com recomendações de tratamento."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <header className={styles.header}><h1> Diagnóstico de Doenças/Pragas</h1></header>

      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.cardh2}>Selecione o Sintoma Observado</h2>
          <form id="formDiagnostico" onSubmit={handleSubmit}>
            <div className={styles.formDiagnostico}>
              <label className={styles.label} htmlFor="sintomas">Sintomas</label>
              <select id="sintomas" name="sintomas" multiple className={styles.selectbutton}>
                <option value="Apodrecimento total da raiz">Apodrecimento total da raiz</option>
                <option value="Danos no caule da planta">Caules com furos</option>
                <option value="Danos na raiz tuberosa">Danos na raiz tuberosa</option>
                <option value="Desfolhamento">Desfolhamento</option>
                <option value="escoriações superficiais">Furos na raiz</option>
                <option value="Furos nas folhas">Furos nas folhas</option>
                <option value="furos nos turberculos">Furos nos tubérculos</option>
                <option value="amarelecimento">Folhas amareladas</option>
                <option value="folhas enroladas">Folhas enroladas</option>
                <option value="lagarta no coleto da planta">Lagarta/Larva no coleto da planta</option>
                <option value="Lesões circulares amareladas">Lesões circulares amareladas</option>
                <option value="Lesões marrons ciruculares nas folhas">Lesões marrons circulares nas folhas</option>
                <option value="lesões marrons">Lesões marrons</option>
                <option value="Lesões necróticas">Lesões necróticas</option>
                <option value="Lesões nos tuberculos coloração (marrom a preto)">Lesões nos tubérculos coloração (marrom a preto)</option>
                <option value="manchas">Manchas nas folhas</option>
                <option value="Manchas circulares marrons">Manchas circulares marrom nos tubérculos</option>
              </select>
            </div>

            <button className={styles.button} type="submit">Diagnosticar</button>
          </form>
        </div>

        {resultado && (
          <div id="resultado" className={styles.resultado}>
            {Array.isArray(resultado) ? (
              resultado.map((doenca, idx) => (
                <div key={idx}>
                  <h3>{doenca.nome}</h3>
                  <img className={styles.img}src={doenca.imagem} alt={doenca.descricao} />
                  <p className={styles.fonte}>
                    <strong>FONTE:</strong> {doenca.fonte1}
                  </p>
                  <p>
                    <strong>Tratamento recomendado:</strong>{" "}
                    {doenca.tratamento}
                  </p>
                  <div className={styles.alerta}>
                    ⚠️ Atenção: Confirme com um especialista local antes de aplicar qualquer tratamento.
                  </div>
                  <p>
                    Para mais informações:{" "}
                    <a href={doenca.fonte} target="_blank">
                      Clique aqui
                    </a>
                  </p>
                </div>
              ))
            ) : (
              <p>{resultado}</p>
            )}
          </div>
        )}
      </main>
    </>
  )
};
