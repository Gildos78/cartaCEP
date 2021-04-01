package br.com.cartacep.modelo;

import java.io.Serializable;

public class Especificacao implements Serializable{

	
	private static final long serialVersionUID = 1L;
	private int id;
	private String descricao;
	private float espMin;
	private float espMax;
	private String imagemNome;
	private int codeProd;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public float getEspMin() {
		return espMin;
	}
	public void setEspMin(float espMin) {
		this.espMin = espMin;
	}
	public float getEspMax() {
		return espMax;
	}
	public void setEspMax(float espMax) {
		this.espMax = espMax;
	}
	
	public String getImagemNome() {
		return imagemNome;
	}
	public void setImagemNome(String imagemNome) {
		this.imagemNome = imagemNome;
	}
	public int getCodeProd() {
		return codeProd;
	}
	public void setCodeProd(int codeProd) {
		this.codeProd = codeProd;
	}
	
}
	