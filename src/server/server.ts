import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Fila de requisições pendentes
let fila: number[] = [];

// Função que simula um processamento de requisição
const processarRequisicao = async (posicao: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      console.log(`Requisição na posição ${posicao} foi processada`);
      resolve(posicao);
    }, 5000); 
  });
};

// Função para realizar a soma
const somar = (a: number, b: number): number => {
  return a + b;
};

// Endpoint para realizar a soma
app.get('/api/somar', (req: Request, res: Response) => {
  const a = 2;
  const b = 3;
  const resultado = somar(a, b);
  res.json({ a, b, resultado });
});

// Endpoint para adicionar uma requisição à fila
app.post('/api/soma', async (req: Request, res: Response) => {
  const posicao = fila.length + 1; // Define a posição da requisição
  fila.push(posicao); // Adiciona a requisição à fila
  console.log(`Requisição adicionada à fila na posição ${posicao}`);

  // Processa a requisição
  const resultado = await processarRequisicao(posicao);

  // Realiza a soma chamando a função `somar`
  const somaResultado = somar(2, 3);

  // Remove a requisição da fila após ser processada
  fila = fila.filter(item => item !== posicao);
  console.log(`Requisição na posição ${resultado} concluída`);

  // Envia a posição da requisição processada para o cliente
  res.json({ posicao, resultado: somaResultado });
});

// Endpoint para consultar a posição atual da fila
app.get('/api/fila', (req: Request, res: Response) => {
  res.json({ fila });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
