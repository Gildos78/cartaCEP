package br.com.cartacep.modelo;

import java.io.Serializable;

public class Usuario implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	
	private int id;
	private String nome;
	private String senha;
	private String email;
	private String imagemNome;

	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getImagemNome() {
		return imagemNome;
	}
	public void setImagemNome(String imagemNome) {
		this.imagemNome = imagemNome;
	}
	
	
}
