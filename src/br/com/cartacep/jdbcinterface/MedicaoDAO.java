package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.Medicao;
import br.com.cartacep.modelo.Producao;
import br.com.cartacep.modelo.Usuario;

public interface MedicaoDAO {
	public boolean inserir (Medicao medicao);
	public Medicao getCountEsp(int id);
	public List<JsonObject> buscarMed(int id);
	public boolean deletarMed(int id);
	public List<JsonObject> getSamplesComplete(int id);
	public List<JsonObject> getMeasureId(int code);
	public boolean deletarMedEsp(int id);
	public boolean addCount(Medicao medicao);
	public List<JsonObject> lookUpCount(int code);
	public Medicao lookUpCountSub(int code);
}