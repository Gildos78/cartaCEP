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
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import br.com.cartacep.bd.Conexao;
import br.com.cartacep.jdbc.JDBCOperadorDAO;
import br.com.cartacep.modelo.Operador;




@Path("operador")
public class OperadorRest extends UtilRest{
	
	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String operadorParam) {
		try {
			Operador operador= new Gson().fromJson(operadorParam, Operador.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);
			boolean retorno  = jdbcOperador.inserir(operador);
			String msg="";
			
			if(retorno) {
				msg = "Operador cadastrado com sucesso!";
			}else {
				msg = "Erro ao cadastrar operador.";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/verificarMatricula")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response verificarMatricula(@QueryParam("valorBusca")String  matricula) {
		try {
			List<JsonObject> listaMatriculas = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);
			listaMatriculas = jdbcOperador.verificarMatricula(matricula);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaMatriculas);
			
			
			return this.buildResponse(json);
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
			List<JsonObject> listaOperadores = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);
			listaOperadores = jdbcOperador.buscarPorNome(nome);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaOperadores);
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
			Operador operador= new Operador();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);

			operador = jdbcOperador.checkId(id);

			conec.fecharConexao();
			return this.buildResponse(operador);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/alterar")
	@Consumes("application/*")
	public Response alterar(String operadorParam) {
		try {
			Operador operador = new Gson().fromJson(operadorParam, Operador.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);

			boolean retorno = jdbcOperador.alterar(operador);

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
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);
			
			boolean retorno = jdbcOperador.deletar(id);
			
			String msg = "";
			if(retorno) {
				msg="Operador excluído com sucesso!";
			}else {
				msg="Erro ao excluir operador!";
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

	public Response buscarSelO() {

		try {
			List<Operador> listaOperadores = new ArrayList<Operador>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);
			listaOperadores = jdbcOperador.buscarSelO();
			conec.fecharConexao();
			return this.buildResponse(listaOperadores);

		}catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/buscarSelOperador")
	@Produces(MediaType.APPLICATION_JSON)

	public Response buscarSelOperador() {

		try {
			List<Operador> listaOperadores = new ArrayList<Operador>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);
			listaOperadores = jdbcOperador.buscarSelOperador();
			conec.fecharConexao();
			return this.buildResponse(listaOperadores);

		}catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/alterarSenhaOp")
	@Consumes("application/*")
	public Response alterarSenhaOp(String operadorParam) {
		try {
			Operador operador = new Gson().fromJson(operadorParam, Operador.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCOperadorDAO jdbcOperador = new JDBCOperadorDAO(conexao);

			boolean retorno = jdbcOperador.alterarSenhaOp(operador);

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
}