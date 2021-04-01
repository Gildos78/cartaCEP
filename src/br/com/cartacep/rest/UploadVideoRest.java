package br.com.cartacep.rest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

@Path("amostra")
public class UploadVideoRest {

	// Caminho para a pasta onde queremos armazenar os arquivos
	private static final String UPLOAD_FOLDER = "opt/tomcat/webapps/CartaCEP/imgs/";
//	public UploadVideoRest() {
//
//	}

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

		String uploadedFileLocation = UPLOAD_FOLDER + fileName + ".png";

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
}