"use client"

import { useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    // Inicializar o FingerprintJS no carregamento do componente
    const getFingerprint = async () => {
      // Carregar o agente
      const fp = await FingerprintJS.load();

      // Obter o identificador do visitante
      const result = await fp.get();

      // Este é o identificador do visitante:
      const visitorId = result.visitorId;
      const accesskey = "your-access-key"; // Peça seu accesskey para equipe Credify
      const action = "action-to-call-api"; // descrição do momento em que a chamada será feita, exemplo:( "login", "cadastro", "consulta", etc)
      const bodyParams = {
        visitorId,
        accesskey,
        action,
        document: "document-to-identify-the-client",
        tipoDocument: "type-of-document", // Opções: "CPF", "CNPJ", "CNH", "RG" ou "OUTROS"
      };
      axios
        .post(`https://back.credify.com.br/device-finger-print`, bodyParams)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getFingerprint();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Device Finger Print NextJs</h1>
    </main>
  );
}
