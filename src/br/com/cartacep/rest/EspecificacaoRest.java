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
import br.com.cartacep.jdbc.JDBCEspecificacaoDAO;
import br.com.cartacep.modelo.Especificacao;






@Path("especificacao")
public class EspecificacaoRest extends UtilRest{
	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String especificacaoParam) {
		try {
			Especificacao especificacao = new Gson().fromJson(especificacaoParam, Especificacao.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCEspecificacaoDAO jdbcEspecificacao = new JDBCEspecificacaoDAO(conexao);
			boolean retorno  = jdbcEspecificacao.inserir(especificacao);
			String msg="";
			
			if(retorno) {
				msg = "Especificações cadastradas com sucesso!";
				
			}else {
				msg = "Erro ao cadastrar especificações.";
				
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
	public Response buscarPorCodigo(@QueryParam("valorBusca") int  code) {
		try {
			List<JsonObject> listaEspecificacoes = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCEspecificacaoDAO jdbcEspecificacao = new JDBCEspecificacaoDAO(conexao);
			listaEspecificacoes = jdbcEspecificacao.buscarPorCodigo(code);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaEspecificacoes);
			return this.buildResponse(json);
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
			JDBCEspecificacaoDAO jdbcEspecificacao = new JDBCEspecificacaoDAO(conexao);
			
			boolean retorno = jdbcEspecificacao.deletar(id);
			
			String msg = "";
			if(retorno) {
				msg="Especificações excluídas com sucesso!";
			}else {
				msg="Erro ao excluir especificações!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	@GET
	@Path("/getSample")
	@Produces(MediaType.APPLICATION_JSON)

	public Response getSample(@QueryParam("code")int code) {

		try {
List<JsonObject> listaEspecificacoes = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCEspecificacaoDAO jdbcEspecificacao = new JDBCEspecificacaoDAO(conexao);
			listaEspecificacoes = jdbcEspecificacao.getSample(code);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaEspecificacoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}
