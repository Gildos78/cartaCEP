package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.CadOperacao;



public interface CadOperacaoDAO {
	public boolean inserir (CadOperacao cadOperacao);
	
}
