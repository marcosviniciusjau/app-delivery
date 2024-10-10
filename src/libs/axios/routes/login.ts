import { AxiosError } from "axios";
import { api } from "../api";

export async function Login(username: string, password: string) {
  try{
    await api.post('/session', {username})
    return true
  }catch (error: any) {
    // Verifica se o erro possui uma resposta (ou seja, foi retornado pelo servidor)
    if (error.response) {
      // Captura detalhes da resposta de erro do backend
      const { status, data } = error.response;
      console.error(`Erro ${status}:`, data);

      // Retorna uma mensagem detalhada ou um objeto com as informações
      return {
        success: false,
        status: status, // Código de status HTTP
        message: data?.message || 'Erro desconhecido no login.', // Mensagem do backend ou um fallback
      };
    } else if (error.request) {
      // O erro ocorreu, mas não houve resposta do servidor (erro na requisição)
      console.error('Erro na requisição:', error.request);
      return {
        success: false,
        message: 'Não foi possível se conectar ao servidor. Verifique sua conexão com a internet.',
      };
    } else {
      console.error('Erro desconhecido:', error);
      return {
        success: false,
        message: error.message || 'Ocorreu um erro inesperado.',
      };
    }
  }
}