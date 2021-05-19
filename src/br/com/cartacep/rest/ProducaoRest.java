package br.com.cartacep.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

import br.com.cartacep.bd.Conexao;
import br.com.cartacep.jdbc.JDBCProducaoDAO;
import br.com.cartacep.modelo.Producao;


@Path("producao")
public class ProducaoRest extends UtilRest{

	// Caminho para a pasta onde queremos armazenar os arquivos
	private static final String UPLOAD_FOLDER = "/CartaCEP/imgs/";



	@Context
	private UriInfo context;

	@POST
	@Path("/uploadVideo")
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	public Response uploadVideo(@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail, @FormDataParam("rename") String rename) {

		// verifica se todos os parâmetros do formulário são fornecidos
		if (uploadedInputStream == null || fileDetail == null)
			return Response.status(400).entity("Dados do formulário inválidos").build();

		// cria pasta de destino, se ela não existir
		try {

			createFolderIfNotExists(UPLOAD_FOLDER);

		} catch (SecurityException se) {

			return Response.status(500).entity("Não é possível criar pasta de destino no servidor").build();
		}

		String fileName;

		// verifica se o arquivo foi renomeado
		if (rename == null) {

			fileName = fileDetail.getFileName();

		} else {

			fileName = rename;

		}

		String uploadedFileLocation = UPLOAD_FOLDER + fileName + ".jpeg";

		try {

			saveToFile(uploadedInputStream, uploadedFileLocation);

		} catch (IOException e) {

			return Response.status(500).entity("Não é possível salvar o arquivo").build();

		}

		return Response.status(200).entity("Arquivo salvo em: " + uploadedFileLocation).build();
	}

	// Método para salvar dados InputStream no local / arquivo de destino
	private void saveToFile(InputStream inStream, String target) throws IOException {

		OutputStream out = null;

		int read = 0;

		byte[] bytes = new byte[1024];

		out = new FileOutputStream(new File(target));

		while ((read = inStream.read(bytes)) != -1) {

			out.write(bytes, 0, read);

		}

		out.flush();
		out.close();
	}

	// Cria uma pasta no local desejado, se ainda não existir
	private void createFolderIfNotExists(String dirName) throws SecurityException {

		File theDir = new File(dirName);

		if (!theDir.exists()) {

			theDir.mkdir();

		}
	}	

	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String producaoParam) {
		try {
			Producao producao = new Gson().fromJson(producaoParam, Producao.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			boolean retorno  = jdbcProducao.inserir(producao);
			String msg="";

			if(retorno) {
				msg = "Produto cadastrado com sucesso!";

			}else {
				msg = "Erro ao cadastrar produto.";

			}
			conec.fecharConexao();

			return this.buildResponse(msg);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@POST
	@Path("/inserirSub")
	@Consumes("application/*")
	public Response inserirSub(String producaoParam) {
		try {
			Producao producao = new Gson().fromJson(producaoParam, Producao.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			boolean retorno  = jdbcProducao.inserirSub(producao);
			String msg="";

			if(retorno) {
				msg = "Sub cadastrado com sucesso!";

			}else {
				msg = "Erro ao cadastrar sub.";

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
	public Response buscar(@QueryParam("valorBusca") String  cliente) {
		try {
			List<JsonObject> listaProducoes = new ArrayList<JsonObject>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			listaProducoes = jdbcProducao.buscar(cliente);

			conec.fecharConexao();

			String json = new Gson().toJson(listaProducoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	
	@DELETE
	@Path("/excluir/{id}")
	@Consumes("application/*")
	public Response excluir(@PathParam("id") int code) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			boolean retorno = jdbcProducao.deletar(code);

			String msg = "";
			if(retorno) {
				msg="Produção excluída com sucesso!";
			}else {
				msg="Erro ao excluir produção!";
			}

			conec.fecharConexao();

			return this.buildResponse(msg);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	@DELETE
	@Path("/excluirEspTotal/{id}")
	@Consumes("application/*")
	public Response excluirEspTotal(@PathParam("id") int code) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			boolean retorno = jdbcProducao.deletarEspTotal(code);

			String msg = "";
			if(retorno) {
				msg="Produção excluída com sucesso!";
			}else {
				msg="Erro ao excluir produção!";
			}

			conec.fecharConexao();

			return this.buildResponse(msg);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	@DELETE
	@Path("/excluirSub/{id}")
	@Consumes("application/*")
	public Response excluirSub(@PathParam("id") int code) {
		try {
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			boolean retorno = jdbcProducao.deletarSub(code);

			String msg = "";
			if(retorno) {
				msg="Produção excluída com sucesso!";
			}else {
				msg="Erro ao excluir produção!";
			}

			conec.fecharConexao();

			return this.buildResponse(msg);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}			
	}
	@GET
	@Path("/buscarSelP")
	@Produces(MediaType.APPLICATION_JSON)

	public Response buscarSelP() {

		try {
			List<Producao> listaProducao = new ArrayList<Producao>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			listaProducao = jdbcProducao.buscarSelP();
			conec.fecharConexao();
			return this.buildResponse(listaProducao);

		}catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/buscarCodigo")
	@Produces(MediaType.APPLICATION_JSON)

	public Response checkId(@QueryParam("id")int id) {

		try {
			Producao producao= new Producao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			producao = jdbcProducao.buscarCodigo(id);

			conec.fecharConexao();
			return this.buildResponse(producao);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/buscarAm")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarAm(@QueryParam("id") int  id) {
		try {
			Producao producao= new Producao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			producao = jdbcProducao.buscarAm(id);
			conec.fecharConexao();
			return this.buildResponse(producao);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}		
	}
	@GET
	@Path("/getDetailedList")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDetailedList(@QueryParam("id") int  id) {
		try {
			List<JsonObject> listaProducoes = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			listaProducoes = jdbcProducao.getDetailedList(id);

			conec.fecharConexao();

			String json = new Gson().toJson(listaProducoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	@GET
	@Path("/buscarProducao")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarProducao(@QueryParam("valorBusca") String  cliente) {
		try {
			List<JsonObject> listaProducoes = new ArrayList<JsonObject>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			listaProducoes = jdbcProducao.buscarProducao(cliente);

			conec.fecharConexao();

			String json = new Gson().toJson(listaProducoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	@GET
	@Path("/getProdInd")
	@Produces(MediaType.APPLICATION_JSON)

	public Response getProfile(@QueryParam("code")int code) {

		try {
			Producao producao = new Producao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			producao = jdbcProducao.getProdInd(code);

			conec.fecharConexao();
			return this.buildResponse(producao);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/getSubNumber")
	@Produces(MediaType.APPLICATION_JSON)

	public Response getSubNumber(@QueryParam("code")int code) {

		try {
			Producao producao = new Producao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			producao = jdbcProducao.getSubNumber(code);

			conec.fecharConexao();
			return this.buildResponse(producao);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@GET
	@Path("/getTotalSamples")
	@Produces(MediaType.APPLICATION_JSON)

	public Response getTotalSamples(@QueryParam("code")int code) {

		try {
			Producao producao = new Producao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			producao = jdbcProducao.getTotalSamples(code);

			conec.fecharConexao();
			return this.buildResponse(producao);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/getTotalTeste")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTotalTeste(@QueryParam("code") int  code) {
		try {
			List<JsonObject> listaProducoes = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			listaProducoes = jdbcProducao.getTotalTeste(code);

			conec.fecharConexao();

			String json = new Gson().toJson(listaProducoes);
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}				
	}
	@GET
	@Path("/getTotalEsp")
	@Produces(MediaType.APPLICATION_JSON)

	public Response getTotalEsp(@QueryParam("code")int code) {

		try {
			Producao producao = new Producao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);

			producao = jdbcProducao.getTotalEsp(code);

			conec.fecharConexao();
			return this.buildResponse(producao);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	@PUT
	@Path("/changeStatusFull")
	@Consumes("application/*")
	public Response alterar(String producaoParam) {
		try {
			Producao producao = new Gson().fromJson(producaoParam, Producao.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();

			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			boolean retorno = jdbcProducao.changeStatusFull(producao);

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
	@Path("/limitMeasure")
	@Produces(MediaType.APPLICATION_JSON)

	public Response limitMeasure(@QueryParam("id")int id) {

		try {
			List<JsonObject> listaProducoes = new ArrayList<JsonObject>();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCProducaoDAO jdbcProducao = new JDBCProducaoDAO(conexao);
			listaProducoes = jdbcProducao.limitMeasure(id);

			conec.fecharConexao();

			String json = new Gson().toJson(listaProducoes);
			return this.buildResponse(json);

		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}
