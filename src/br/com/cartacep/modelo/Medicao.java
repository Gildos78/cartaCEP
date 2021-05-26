package br.com.cartacep.modelo;

import java.io.Serializable;
import java.util.Date;

public class Medicao implements Serializable{

	
	private static final long serialVersionUID = 1L;
	private int idMedicao;
	private String dataHora;
	private String obs;
	private int codeProd;
	private int idOperador;
	private int idEsp;
	private boolean full;
	private int countMed;
	private int totalGer;
	private int totalSub;
	private int totalMed;
	private int quantity;
	
	public int getIdMedicao() {
		return idMedicao;
	}
	public void setIdMedicao(int idMedicao) {
		this.idMedicao = idMedicao;
	}
	public String getDataHora() {
		return dataHora;
	}
	public void setDataHora(String dataHora) {
		this.dataHora = dataHora;
	}
	public String getObs() {
		return obs;
	}
	public void setObs(String obs) {
		this.obs = obs;
	}
	public int getCodeProd() {
		return codeProd;
	}
	public void setCodeProd(int codeProd) {
		this.codeProd = codeProd;
	}
	public int getIdOperador() {
		return idOperador;
	}
	public void setIdOperador(int idOperador) {
		this.idOperador = idOperador;
	}
	public int getIdEsp() {
		return idEsp;
	}
	public void setIdEsp(int idEsp) {
		this.idEsp = idEsp;
	}
	public int getCountMed() {
		return countMed;
	}
	public void setCountMed(int countMed) {
		this.countMed = countMed;
	}
	public boolean getFull() {
		return full;
	}
	public void setFull(boolean full) {
		this.full = full;
	}
	public int getTotalGer() {
		return totalGer;
	}
	public void setTotalGer(int totalGer) {
		this.totalGer = totalGer;
	}
	public int getTotalSub() {
		return totalSub;
	}
	public void setTotalSub(int totalSub) {
		this.totalSub = totalSub;
	}
	
	public int getTotalMed() {
		return totalMed;
	}
	public void setTotalMed(int totalMed) {
		this.totalMed = totalMed;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
}