package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.Producao;
import br.com.cartacep.modelo.Subgrupo;



public interface SubgrupoDAO {
	public boolean inserir (Subgrupo subgrupo);
	public boolean deletarSub(int id);
	public boolean deletarSubEsp(int id);
}