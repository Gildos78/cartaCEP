package br.com.cartacep.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import br.com.cartacep.bd.Conexao;
import br.com.cartacep.jdbc.JDBCUsuarioDAO;
import br.com.cartacep.modelo.Usuario;




@Path("usuario")
public class UsuarioRest extends UtilRest{

	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String usuarioParam) {
		try {
			Usuario usuario= new Gson().fromJson(usuarioParam, Usuario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
			boolean retorno  = jdbcUsuario.inserir(usuario);
			String msg="";
			
			if(retorno) {
				msg = "Colaborador cadastrado com sucesso!";
			}else {
				msg = "Erro ao cadastrar colaborador.";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/verificarEmail")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response verificarEmail(@QueryParam("valorBusca")String  email) {
		try {
			List<JsonObject> listaEmails = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
			listaEmails = jdbcUsuario.verificarEmail(email);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaEmails);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	@GET
	@Path("/checkEmail")
	@Produces(MediaType.APPLICATION_JSON)
	
	public Response checkMat(@QueryParam("email")String email) {

		try {
			Usuario usuario = new Usuario();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
			usuario = jdbcUsuario.checkEmail(email);
			
			conec.fecharConexao();
			return this.buildResponse(usuario);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/getProfile")
	@Produces(MediaType.APPLICATION_JSON)

	public Response getProfile(@QueryParam("email")String email) {

		try {
			Usuario usuario = new Usuario();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			usuario = jdbcUsuario.getProfile(email);

			conec.fecharConexao();
			return this.buildResponse(usuario);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/alterarPerfil")
	@Consumes("application/*")
	public Response alterarPerfil(String usuarioParam) {
		try {
			Usuario usuario = new Gson().fromJson(usuarioParam, Usuario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			boolean retorno = jdbcUsuario.alterarPerfil(usuario);

			String msg="";
			if (retorno) {
				msg = "Cadastro alterado com sucesso!";
			}else {
				msg = "Erro ao alterar cadastro";
			}
			conec.fecharConexao();
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/alterarSenhaPerfil")
	@Consumes("application/*")
	public Response alterarSenhaPerfil(String usuarioParam) {
		try {
			Usuario usuario = new Gson().fromJson(usuarioParam, Usuario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			boolean retorno = jdbcUsuario.alterarSenhaPerfil(usuario);

			String msg="";
			if (retorno) {
				msg = "Senha alterada com sucesso!";
			}else {
				msg = "Erro ao alterar senha";
			}
			conec.fecharConexao();
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/updatePic")
	@Consumes("application/*")
	public Response updatePic(String usuarioParam) {
		try {
			Usuario usuario = new Gson().fromJson(usuarioParam, Usuario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			boolean retorno = jdbcUsuario.updatePic(usuario);

			String msg="";
			if (retorno) {
				msg = "Cadastro alterado com sucesso!";
			}else {
				msg = "Erro ao alterar cadastro";
			}
			conec.fecharConexao();
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/buscar")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarPorNome(@QueryParam("valorBusca") String  nome) {
		try {
			List<JsonObject> listaGestores = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
			listaGestores = jdbcUsuario.buscarPorNome(nome);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaGestores);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	@GET
	@Path("/checkId")
	@Produces(MediaType.APPLICATION_JSON)

	public Response checkId(@QueryParam("id")int id) {

		try {
			Usuario usuario= new Usuario();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			usuario = jdbcUsuario.checkId(id);

			conec.fecharConexao();
			return this.buildResponse(usuario);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/alterar")
	@Consumes("application/*")
	public Response alterar(String gestorParam) {
		try {
			Usuario usuario = new Gson().fromJson(gestorParam, Usuario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			boolean retorno = jdbcUsuario.alterar(usuario);

			String msg="";
			if (retorno) {
				msg = "Cadastro alterado com sucesso!";
			}else {
				msg = "Erro ao alterar cadastro";
			}
			conec.fecharConexao();
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@DELETE
	@Path("/excluir/{id}")
	@Consumes("application/*")
	public Response excluir(@PathParam("id") int id) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
			
			boolean retorno = jdbcUsuario.deletar(id);
			
			String msg = "";
			if(retorno) {
				msg="Gestor excluído com sucesso!";
			}else {
				msg="Erro ao excluir gestor!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	@PUT
	@Path("/esqueciSenha")
	@Consumes("application/*")
	public Response esqueciSenha(String usuarioParam) {
		try {
			Usuario usuario = new Gson().fromJson(usuarioParam, Usuario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);

			boolean retorno = jdbcUsuario.esqueciSenha(usuario);

			String msg="";
			if (retorno) {
				msg = "Senha alterada com sucesso!";
			}else {
				msg = "Erro ao alterar senha";
			}
			conec.fecharConexao();
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/buscarSelM")
	@Produces(MediaType.APPLICATION_JSON)

	public Response buscarSelG() {

		try {
			List<Usuario> listaGestores = new ArrayList<Usuario>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
			listaGestores = jdbcUsuario.buscarSelG();
			conec.fecharConexao();
			return this.buildResponse(listaGestores);

		}catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}