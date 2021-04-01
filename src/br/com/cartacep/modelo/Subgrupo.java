package br.com.cartacep.modelo;

import java.io.Serializable;

public class Subgrupo implements Serializable{

	
	private static final long serialVersionUID = 1L;
	private int idEsp;
	private int idSub;
	private float valor;
	private int idMedicao;
	
	public int getIdEsp() {
		return idEsp;
	}
	public void setIdEsp(int idEsp) {
		this.idEsp = idEsp;
	}
	public int getIdSub() {
		return idSub;
	}
	public void setIdSub(int idSub) {
		this.idSub = idSub;
	}
	public float getValor() {
		return valor;
	}
	public void setValor(float valor) {
		this.valor = valor;
	}
	public int getIdMedicao() {
		return idMedicao;
	}
	public void setIdMedicao(int idMedicao) {
		this.idMedicao = idMedicao;
	}
	
	
}