package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.Producao;
import br.com.cartacep.modelo.Usuario;

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
	public List<JsonObject> getListProduction(String date30DaysPrior);
	public List<JsonObject> getProductionCountYear(String monthYear);
	public List<JsonObject> getProductionLastDec(String monthYear);
	public List<JsonObject> getMonthlyReadingCount(String producao);
	public Producao getFinalDate(int code);
}