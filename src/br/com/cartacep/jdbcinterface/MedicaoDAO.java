package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.Medicao;



public interface MedicaoDAO {
	public boolean inserir (Medicao medicao);
	public Medicao getCountEsp(int id);
	public List<JsonObject> buscarMed(int id);
	public boolean deletarMed(int id);
	public List<JsonObject> getSamplesComplete(int id);
}