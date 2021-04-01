package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.Especificacao;




public interface EspecificacaoDAO {
	public boolean inserir (Especificacao especificacao);
	public List<JsonObject> buscarPorCodigo(int codigo);
	public boolean deletar(int id);
	public List<JsonObject> getSample(int code);
}
