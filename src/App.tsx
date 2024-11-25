import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [resultado, setResultado] = useState<number | null>(null);
  const [status, setStatus] = useState<string>(''); 
  const [statusColor, setStatusColor] = useState<string>('');

  const obterSoma = async () => {
    setStatus('Processando requisição, aguarde...'); 
    setStatusColor('orange')
    try {
      const response = await fetch('http://localhost:3001/api/soma', {
        method: 'POST', 
      });

      const data = await response.json();
      setResultado(data.resultado);
      setStatus('Requisição completada com sucesso.'); 
      setStatusColor('green');
    } catch (error) {
      console.error('Erro ao buscar a soma:', error);
      setStatus('Erro ao processar a requisição'); 
      setStatusColor('red');
    }
  };

  return (
    <>
    <div className="App">
      <div className='header'>
        <img src='https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1486,h_663/https://www.fatecclub.gregmaster.com.br/wp-content/uploads/2018/09/logo-fatec.png' />
        <h1>Algoritmo Gerenciador de Requisições</h1>
      </div>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button onClick={obterSoma}>Requisitar</button>
        
        {status && (
          <p style={{ color: statusColor }}>{status}</p> 
        )}
        
        {resultado !== null && <p>Resultado: {resultado}</p>}
      </div>
       
    </div>
    <p style={{position: 'absolute', bottom: '5%', left: '50%', translate: '-50%', 
    fontSize: '20px', width: '100%', alignSelf: 'center', textAlign: 'center', alignItems: 'center' }}>Grupo: Bruno Alves, Gabriel Juliani, Paulo Alexandre, Pedro Oliveira</p><br />
    <p style={{position: 'absolute', bottom: '1%', left: '50%', translate: '-50%', 
    fontSize: '20px', width: '100%', alignSelf: 'center', textAlign: 'center', alignItems: 'center' }}>Prof. Fabrício Galende Marques de Carvalho</p>
    </>
  );
}

export default App;
