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
import br.com.cartacep.jdbc.JDBCCadOperacaoDAO;
import br.com.cartacep.jdbc.JDBCProducaoDAO;
import br.com.cartacep.jdbc.JDBCSubgrupoDAO;
import br.com.cartacep.modelo.CadOperacao;
import br.com.cartacep.modelo.Subgrupo;






@Path("subgrupo")
public class SubgrupoRest extends UtilRest{
	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String subParam) {
		try {
			Subgrupo subgrupo = new Gson().fromJson(subParam, Subgrupo.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCSubgrupoDAO jdbcSubgrupo = new JDBCSubgrupoDAO(conexao);
			boolean retorno  = jdbcSubgrupo.inserir(subgrupo);
			String msg="";
			
			if(retorno) {
				msg = "Operação cadastrada com sucesso!";
			}else {
				msg = "Erro ao cadastrar operação.";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@DELETE
	@Path("/excluirSub/{idMed}")
	@Consumes("application/*")
	public Response excluir(@PathParam("idMed") int id) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCSubgrupoDAO jdbcSubgrupo = new JDBCSubgrupoDAO(conexao);
			
			boolean retorno = jdbcSubgrupo.deletarSub(id);
			
			String msg = "";
			if(retorno) {
				msg="Sub excluída com sucesso!";
			}else {
				msg="Erro ao excluir sub!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	@DELETE
	@Path("/excluirSubEsp/{idMed}")
	@Consumes("application/*")
	public Response excluirMedEsp(@PathParam("idMed") int id) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCSubgrupoDAO jdbcSubgrupo = new JDBCSubgrupoDAO(conexao);
			
			boolean retorno = jdbcSubgrupo.deletarSubEsp(id);
			
			String msg = "";
			if(retorno) {
				msg="Sub excluída com sucesso!";
			}else {
				msg="Erro ao excluir sub!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
}