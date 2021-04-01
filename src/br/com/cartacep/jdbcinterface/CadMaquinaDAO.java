package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.CadMaquina;




public interface CadMaquinaDAO {
	public boolean inserir (CadMaquina cadMaquina);
	public List<JsonObject> buscarPorNome(String nome);
	public CadMaquina checkId(int id);
	public boolean alterar(CadMaquina cadMaquina);
	public boolean deletar(int id);
	public List<CadMaquina> buscarSelM();
}
