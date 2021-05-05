package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.Operador;




public interface OperadorDAO {
	public boolean inserir (Operador operador);
	public List<JsonObject> verificarMatricula(String matricula);
	public List<JsonObject> buscarPorNome(String nome);
	public Operador checkId(int id);
	public boolean alterar(Operador operador);
	public boolean deletar(int id);
	public List<Operador> buscarSelO();
	public List<Operador> buscarSelOperador();
	public boolean alterarSenhaOp(Operador operador);
}
