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
import br.com.cartacep.jdbc.JDBCMedicaoDAO;
import br.com.cartacep.jdbc.JDBCProducaoDAO;
import br.com.cartacep.jdbc.JDBCUsuarioDAO;
import br.com.cartacep.modelo.Medicao;
import br.com.cartacep.modelo.Producao;
import br.com.cartacep.modelo.Usuario;


@Path("medicao")
public class MedicaoRest extends UtilRest{
	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String medicaoParam) {
		try {
			Medicao medicao = new Gson().fromJson(medicaoParam, Medicao.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
			boolean retorno  = jdbcMedicao.inserir(medicao);
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
	@GET
	@Path("/getCountEsp")
	@Produces(MediaType.APPLICATION_JSON)

	public Response getCountEsp(@QueryParam("id")int id) {

		try {
			Medicao medicao= new Medicao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);

			medicao = jdbcMedicao.getCountEsp(id);

			conec.fecharConexao();
			return this.buildResponse(medicao);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/buscarMed")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarMed(@QueryParam("id") int  id) {
		try {
			List<JsonObject> listaMedicoes = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
			listaMedicoes = jdbcMedicao.buscarMed(id);
		
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaMedicoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	@DELETE
	@Path("/excluirMed/{idMed}")
	@Consumes("application/*")
	public Response excluirMed(@PathParam("idMed") int id) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
			
			boolean retorno = jdbcMedicao.deletarMed(id);
			
			String msg = "";
			if(retorno) {
				msg="Medição excluída com sucesso!";
			}else {
				msg="Erro ao excluir Medição!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	@GET
	@Path("/getSamplesComplete")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSamplesComplete(@QueryParam("id") int  id) {
		try {
			List<JsonObject> listaMedicoes = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
			listaMedicoes = jdbcMedicao.getSamplesComplete(id);
		
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaMedicoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	@GET
	@Path("/getMeasureId")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMeasureId(@QueryParam("code") int  code) {
		try {
			List<JsonObject> listaMedicoes = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
			listaMedicoes = jdbcMedicao.getMeasureId(code);
		
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaMedicoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	@DELETE
	@Path("/excluirMedEsp/{idMed}")
	@Consumes("application/*")
	public Response excluirMedEsp(@PathParam("idMed") int id) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
			
			boolean retorno = jdbcMedicao.deletarMedEsp(id);
			
			String msg = "";
			if(retorno) {
				msg="Medição excluída com sucesso!";
			}else {
				msg="Erro ao excluir Medição!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	@PUT
	@Path("/addCount")
	@Consumes("application/*")
	public Response addCount(String medicaoParam) {
		try {
			Medicao medicao = new Gson().fromJson(medicaoParam, Medicao.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
			boolean retorno  = jdbcMedicao.addCount(medicao);

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
	@Path("/lookUpCount")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response lookUpCount(@QueryParam("code") int  code) {
		try {
			List<JsonObject> listaMedicoes = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
			listaMedicoes = jdbcMedicao.lookUpCount(code);
		
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaMedicoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	
//	@GET
//	@Path("/lookUpCount")
//	@Produces(MediaType.APPLICATION_JSON)
//
//	public Response lookUpCount(@QueryParam("code") int  code) {
//
//		try {
//			Medicao medicao= new Medicao();
//			Conexao conec = new Conexao();
//			Connection conexao = conec.abrirConexao();
//			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);
//
//			medicao = jdbcMedicao.lookUpCount(code);
//
//			conec.fecharConexao();
//			return this.buildResponse(medicao);
//
//		}catch(Exception e) {
//			e.printStackTrace();
//			return this.buildErrorResponse(e.getMessage());
//		}
//	}
	
	@GET
	@Path("/lookUpCountSub")
	@Produces(MediaType.APPLICATION_JSON)

	public Response lookUpCountSub(@QueryParam("code")int code) {

		try {
			Medicao medicao= new Medicao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMedicaoDAO jdbcMedicao = new JDBCMedicaoDAO(conexao);

			medicao = jdbcMedicao.lookUpCountSub(code);

			conec.fecharConexao();
			return this.buildResponse(medicao);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}