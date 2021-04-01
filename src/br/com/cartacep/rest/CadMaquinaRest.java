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
import br.com.cartacep.jdbc.JDBCCadMaquinaDAO;
import br.com.cartacep.modelo.CadMaquina;






@Path("cadMaquina")
public class CadMaquinaRest extends UtilRest{
	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String cadMaquinaParam) {
		try {
			CadMaquina cadMaquina = new Gson().fromJson(cadMaquinaParam, CadMaquina.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCCadMaquinaDAO jdbcCadMaquina = new JDBCCadMaquinaDAO(conexao);
			boolean retorno  = jdbcCadMaquina.inserir(cadMaquina);
			String msg="";
			
			if(retorno) {
				msg = "Máquina cadastrada com sucesso!";
			}else {
				msg = "Erro ao cadastrar máquina.";
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
			List<JsonObject> listaCadMaquinas = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCCadMaquinaDAO jdbcCadMaquina = new JDBCCadMaquinaDAO(conexao);
			listaCadMaquinas = jdbcCadMaquina.buscarPorNome(nome);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaCadMaquinas);
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
			CadMaquina cadMaquina= new CadMaquina();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCCadMaquinaDAO jdbcCadMaquina = new JDBCCadMaquinaDAO(conexao);

			cadMaquina = jdbcCadMaquina.checkId(id);

			conec.fecharConexao();
			return this.buildResponse(cadMaquina);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/alterar")
	@Consumes("application/*")
	public Response alterar(String cadMaquinaParam) {
		try {
			CadMaquina cadMaquina = new Gson().fromJson(cadMaquinaParam, CadMaquina.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCCadMaquinaDAO jdbcCadMaquina = new JDBCCadMaquinaDAO(conexao);

			boolean retorno = jdbcCadMaquina.alterar(cadMaquina);

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
			JDBCCadMaquinaDAO jdbcCadMaquina = new JDBCCadMaquinaDAO(conexao);
			
			boolean retorno = jdbcCadMaquina.deletar(id);
			
			String msg = "";
			if(retorno) {
				msg="Máquina excluída com sucesso!";
			}else {
				msg="Erro ao excluir máquina!";
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

	public Response buscarSelM() {

		try {
			List<CadMaquina> listaMaquinas = new ArrayList<CadMaquina>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCCadMaquinaDAO jdbcCadMaquina = new JDBCCadMaquinaDAO(conexao);
			listaMaquinas = jdbcCadMaquina.buscarSelM();
			conec.fecharConexao();
			return this.buildResponse(listaMaquinas);

		}catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}
