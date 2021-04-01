package br.com.cartacep.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.cartacep.modelo.Usuario;



public interface UsuarioDAO {
	public boolean inserir (Usuario usuario);
	public List<JsonObject> verificarEmail(String email);
	public Usuario checkEmail(String email);
	public Usuario getProfile(String email);
	public boolean alterarPerfil(Usuario usuario);
	public boolean alterarSenhaPerfil(Usuario usuario);
	public boolean updatePic(Usuario usuario);
}
