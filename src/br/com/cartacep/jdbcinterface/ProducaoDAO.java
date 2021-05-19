package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.Producao;

public interface ProducaoDAO {
	public boolean inserir (Producao producao);
	public boolean inserirSub (Producao producao);
	public List<JsonObject> buscar(String cliente);

	public boolean deletar(int code);
	public Producao buscarCodigo(int id);
	public Producao buscarAm(int id);
	public List<JsonObject> getDetailedList(int id);
	public List<JsonObject> buscarProducao(String cliente);
	public Producao getProdInd(int code);
	public Producao getSubNumber(int code);
	public  List<JsonObject> limitMeasure(int id);
	public Producao getTotalSamples(int code);
	public Producao getTotalEsp(int code);
	public boolean changeStatusFull(Producao producao);
	public List<JsonObject> getTotalTeste(int code);
}