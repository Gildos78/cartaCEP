package br.com.cartacep.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.codec.digest.DigestUtils;

import com.google.gson.JsonObject;


import br.com.cartacep.jdbcinterface.UsuarioDAO;
import br.com.cartacep.modelo.Usuario;

public class JDBCUsuarioDAO implements UsuarioDAO{

	private Connection conexao;

	public JDBCUsuarioDAO(Connection conexao) {
		this.conexao = conexao;
	}
	public boolean inserir (Usuario usuario) {

		String comando = "INSERT INTO gestor "
				+ "(nome, email, senha) "
				+ "VALUES (?,?,?)";
		PreparedStatement p;

		try {
			//Prepara o comando para execução no BD em que nos conectamos

			p = this.conexao.prepareStatement(comando);

			//Substitui no comando os "?" pelos valores do produto


			String salt="DGE$5SGr@3VsHYUMas2323E4d57vfBfFSTRU@!DSH(*%FDSdfg13sgfsg";
			String senhaSalt = usuario.getSenha()+salt;
			String senhaSha1SemSal = DigestUtils.shaHex(senhaSalt);
			p.setString(1, usuario.getNome());
			p.setString(2, usuario.getEmail());
			p.setString(3, senhaSha1SemSal);


			//Executa o comando no BD
			p.execute();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public List<JsonObject> verificarEmail (String email){
		String comando = "SELECT * FROM gestor ";
		if (email != "") {
			comando += "WHERE gestor.email like '%"+ email + "%' "; 
		}		
		List<JsonObject> listaEmails = new ArrayList<JsonObject>();
		JsonObject usuario = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int id = rs.getInt("idGestor");
				String emailU = rs.getString("email");
				

				usuario = new JsonObject();
				usuario.addProperty("idGestor", id);
				usuario.addProperty("email", emailU);
			


				listaEmails.add(usuario);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaEmails;
	}

public Usuario checkEmail(String email) {
		
		String comando = "SELECT * FROM gestor WHERE email = ?";
		Usuario usuario = new Usuario();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setString(1, email);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				String nome = rs.getString("nome");
				String emailG = rs.getString("email");
				int id = rs.getInt("idGestor");
				String imagemNome = rs.getString("imagemNome");
				usuario.setId(id);
				usuario.setNome(nome);
				usuario.setEmail(emailG);
				usuario.setImagemNome(imagemNome);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return usuario;
	}
public Usuario getProfile(String email) {
	String comando = "SELECT * FROM gestor WHERE email = ?";
	Usuario usuario= new Usuario();
	try {
		PreparedStatement p = this.conexao.prepareStatement(comando);
		p.setString(1, email);
		ResultSet rs = p.executeQuery();
		while (rs.next()) {
			int id = rs.getInt("idGestor");
			String nome = rs.getString("nome");	
			String emailP = rs.getString("email");
			usuario.setId(id);
			usuario.setNome(nome);
			usuario.setEmail(emailP);

		}
	}catch (Exception e) {
		e.printStackTrace();
	}
	return usuario;
}
public boolean alterarPerfil(Usuario usuario) {

	String comando = "UPDATE gestor "
			+ "SET nome=?, email=?"
			+ " WHERE idGestor=?";
	PreparedStatement p;
	try {


		p = this.conexao.prepareStatement(comando);
		p.setString(1,usuario.getNome());
		p.setString(2, usuario.getEmail());			
		p.setInt(3,usuario.getId());

		p.executeUpdate();

	}catch (SQLException e) {
		e.printStackTrace();
		return false;
	}
	return true;
}public boolean alterarSenhaPerfil(Usuario usuario) {

	String comando = "UPDATE gestor "
			+ "SET senha=?"
			+ " WHERE idGestor=?";
	PreparedStatement p;
	try {
		String salt="DGE$5SGr@3VsHYUMas2323E4d57vfBfFSTRU@!DSH(*%FDSdfg13sgfsg";
		String senha = usuario.getSenha();
		String senhaSalt = senha+salt;
		String senhaSha1ComSal = DigestUtils.shaHex(senhaSalt);

		p = this.conexao.prepareStatement(comando);
		p.setString(1,senhaSha1ComSal);	
		p.setInt(2,usuario.getId());

		p.executeUpdate();

	}catch (SQLException e) {
		e.printStackTrace();
		return false;
	}
	return true;
}
public boolean updatePic(Usuario usuario) {

	String comando = "UPDATE gestor "
			+ "SET imagemNome=? "
			+ "WHERE idGestor=?";
	PreparedStatement p;
	try {


		p = this.conexao.prepareStatement(comando);
		p.setString(1,usuario.getImagemNome());		
		p.setInt(2,usuario.getId());

		p.executeUpdate();

	}catch (SQLException e) {
		e.printStackTrace();
		return false;
	}
	return true;
}

public List<JsonObject> buscarPorNome (String nome){

	//Inicia a cria��o do comando SQL de busca 
	String comando = "SELECT * FROM gestor ";
	//Se o nome n�o estiver vazio...
	if (nome != "") {
		//concatena no comando o WHERE buscando no nome do produto 
		//o texto da vari�vel nome
		comando += "WHERE gestor.nome LIKE '%"+ nome + "%' "; 
	}
	//Finaliza o comando ordenando alfabeticamente por
	//categoria, marca e depois modelo
	comando += "ORDER BY gestor.nome ASC";
	
	
		List<JsonObject> listaGestores = new ArrayList<JsonObject>();
		JsonObject gestor = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int id = rs.getInt("idGestor");
				String nomeCad = rs.getString("nome");
				String email = rs.getString("email");
			
				
				gestor = new JsonObject();
				gestor.addProperty("id", id);
				gestor.addProperty("nome", nomeCad);
				gestor.addProperty("email", email);
				
				
				listaGestores.add(gestor);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaGestores;
	}
public Usuario checkId(int id) {
	
	String comando = "SELECT * FROM gestor WHERE idGestor = ?";
	Usuario usuario = new Usuario();
	try {
		PreparedStatement p = this.conexao.prepareStatement(comando);
		p.setInt(1, id);
		ResultSet rs = p.executeQuery();
		while (rs.next()) {
			int idd = rs.getInt("idGestor");
			String nome = rs.getString("nome");
			String email = rs.getString("email");
			
			usuario.setId(idd);
			usuario.setNome(nome);
			usuario.setEmail(email);

		}
	}catch (Exception e) {
		e.printStackTrace();
	}
	return usuario;
}
	
	public boolean alterar(Usuario usuario) {		
		String comando = "UPDATE gestor "
				+ "SET nome=?, email=?"
				+ " WHERE idGestor=?";
		PreparedStatement p;
		try {
			
			
			
			p = this.conexao.prepareStatement(comando);
			p.setString(1,usuario.getNome());
			p.setString(2, usuario.getEmail());
			p.setInt(3,usuario.getId());

			p.executeUpdate();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public boolean deletar(int id) {
		String comando = "DELETE FROM gestor WHERE idGestor = ?";
		PreparedStatement p;
		try {
			p=this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			p.execute();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public List<Usuario> buscarSelG (){

		String comando = "SELECT * FROM gestor";
		List<Usuario> listaGestores = new ArrayList<Usuario>();
		Usuario usuario = null;

		try {

			Statement stmt = conexao.createStatement();

			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				usuario = new Usuario();

				int idd = rs.getInt("idGestor");
				String nome = rs.getString("nome");
				String email = rs.getString("email");
				

				usuario.setId(idd);
				usuario.setNome(nome);
				usuario.setEmail(email);
				
				listaGestores.add(usuario);
			}

		}catch (Exception ex) {

			ex.printStackTrace();
		}
		return listaGestores;
	}
	
	public boolean esqueciSenha(Usuario usuario) {		
		String comando = "UPDATE gestor "
				+ "SET senha=?"
				+ " WHERE email=?";
		String email = usuario.getEmail();
		PreparedStatement p;
		String senhaBase64 = usuario.getSenha();
		String senha = new String(Base64.getDecoder().decode(senhaBase64));
		System.out.println(senha);
		try {
					
				 
			enviarEmail(senha, email);
			
			String salt="DGE$5SGr@3VsHYUMas2323E4d57vfBfFSTRU@!DSH(*%FDSdfg13sgfsg";
			String senhaSalt = senhaBase64+salt;
			String senhaSha1Salgada = DigestUtils.shaHex(senhaSalt);
			System.out.println(senhaSha1Salgada);
			p = this.conexao.prepareStatement(comando);			
			p.setString(1,senhaSha1Salgada);
			p.setString(2,usuario.getEmail());

			p.executeUpdate();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public void enviarEmail(String senha, String email){
		
		 Properties props = new Properties();
		    /** Parâmetros de conexão com servidor Gmail */
		    props.put("mail.smtp.host", "smtp.gmail.com");
		    props.put("mail.smtp.socketFactory.port", "465");
		    props.put("mail.smtp.socketFactory.class",
		    "javax.net.ssl.SSLSocketFactory");
		    props.put("mail.smtp.auth", "true");
		    props.put("mail.smtp.port", "465");
		    props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

		    Session session = Session.getDefaultInstance(props,
		      new javax.mail.Authenticator() {
		           protected PasswordAuthentication getPasswordAuthentication()
		           {
		                 return new PasswordAuthentication("gildo.silva@sc.senai.br",
		                 "@Bermah1609");
		           }
		      });

		    /** Ativa Debug para sessão */
		    session.setDebug(false);

		    try {

		      Message message = new MimeMessage(session);
		      message.setFrom(new InternetAddress("gildo.silva@sc.senai.br"));
		      //Remetente

		      Address[] toUser = InternetAddress //Destinatário(s)
		                 .parse(email);

		      message.setRecipients(Message.RecipientType.TO, toUser);
		      message.setSubject("Recuperação de Senha");//Assunto
		      message.setText("Conforme solicitado, segue a sua nova senha temporária para acesso ao sistema Sistemen:\n\n"
		      		+ "Senha: "+senha+"\n\nLembre-se de alterar pela senha que desejar em Perfil!");
		      /**Método para enviar a mensagem criada*/
		      Transport.send(message);


		     } catch (MessagingException e) {
		        throw new RuntimeException(e);
		
		    }

	}
}