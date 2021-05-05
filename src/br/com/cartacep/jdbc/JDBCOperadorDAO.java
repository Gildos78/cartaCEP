package br.com.cartacep.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;

import com.google.gson.JsonObject;

import br.com.cartacep.jdbcinterface.OperadorDAO;
import br.com.cartacep.modelo.Operador;


public class JDBCOperadorDAO implements OperadorDAO{

	private Connection conexao;

	public JDBCOperadorDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserir (Operador operador) {

		String comando = "INSERT INTO operador "
				+ "(nome, matricula, senha, telefone) "
				+ "VALUES (?,?,?,?)";
		PreparedStatement p;

		try {
			//Prepara o comando para execução no BD em que nos conectamos

			p = this.conexao.prepareStatement(comando);

			//Substitui no comando os "?" pelos valores do produto


			String salt="DGE$5SGr@3VsHYUMas2323E4d57vfBfFSTRU@!DSH(*%FDSdfg13sgfsg";
			String senhaSalt = operador.getSenha()+salt;
			String senhaSha1SemSal = DigestUtils.shaHex(senhaSalt);
			p.setString(1, operador.getNome());
			p.setInt(2, operador.getMatricula());
			p.setString(3, senhaSha1SemSal);
			p.setNString(4, operador.getTelefone());


			//Executa o comando no BD
			p.execute();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public List<JsonObject> verificarMatricula (String matricula){
		String comando = "SELECT * FROM operador ";
		if (matricula != "") {
			comando += "WHERE operador.matricula like '%"+ matricula + "%' "; 
		}		
		List<JsonObject> listaMatriculas = new ArrayList<JsonObject>();
		JsonObject operador = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int id = rs.getInt("idOperador");
				String matriculaU = rs.getString("matricula");

				operador = new JsonObject();
				operador.addProperty("idOperador", id);
				operador.addProperty("matricula", matriculaU);


				listaMatriculas.add(operador);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaMatriculas;
	}
	public List<JsonObject> buscarPorNome (String nome){

		//Inicia a cria��o do comando SQL de busca 
		String comando = "SELECT * FROM operador ";
		//Se o nome n�o estiver vazio...
		if (nome != "") {
			//concatena no comando o WHERE buscando no nome do produto 
			//o texto da vari�vel nome
			comando += "WHERE operador.nome LIKE '%"+ nome + "%' "; 
		}
		//Finaliza o comando ordenando alfabeticamente por
		//categoria, marca e depois modelo
		comando += "ORDER BY operador.nome ASC";
		
		
			List<JsonObject> listaOperadores = new ArrayList<JsonObject>();
			JsonObject operador = null;

			try {

				Statement stmt = conexao.createStatement();
				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					int id = rs.getInt("idOperador");
					String nomeCad = rs.getString("nome");
					String matricula = rs.getString("matricula");
					String telefone = rs.getNString("telefone");
					
					operador = new JsonObject();
					operador.addProperty("id", id);
					operador.addProperty("nome", nomeCad);
					operador.addProperty("matricula", matricula);
					operador.addProperty("telefone", telefone);
					
					listaOperadores.add(operador);
				}

			}catch (Exception e) {
				e.printStackTrace();
			}
			return listaOperadores;
		}
	public Operador checkId(int id) {
		
		String comando = "SELECT * FROM operador WHERE idOperador = ?";
		Operador operador = new Operador();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int idd = rs.getInt("idOperador");
				String nome = rs.getString("nome");
				int matricula = rs.getInt("matricula");
				String telefone = rs.getNString("telefone");
				
				operador.setId(idd);
				operador.setNome(nome);
				operador.setMatricula(matricula);
				operador.setTelefone(telefone);

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return operador;
	}
		
		public boolean alterar(Operador operador) {		
			String comando = "UPDATE operador "
					+ "SET nome=?, matricula=?, telefone=?"
					+ " WHERE idOperador=?";
			PreparedStatement p;
			try {
				
				
				
				p = this.conexao.prepareStatement(comando);
				p.setString(1,operador.getNome());
				p.setInt(2, operador.getMatricula());
				p.setString(3, operador.getTelefone());
				p.setInt(4,operador.getId());

				p.executeUpdate();

			}catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
			return true;
		}
		public boolean deletar(int id) {
			String comando = "DELETE FROM operador WHERE idOperador = ?";
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
		public List<Operador> buscarSelO (){

			String comando = "SELECT * FROM operador";
			List<Operador> listaOperadores = new ArrayList<Operador>();
			Operador operador = null;

			try {

				Statement stmt = conexao.createStatement();

				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					operador = new Operador();

					int idd = rs.getInt("idOperador");
					String nome = rs.getString("nome");
					int matricula = rs.getInt("matricula");
					String telefone = rs.getNString("telefone");
					

					operador.setId(idd);
					operador.setNome(nome);
					operador.setMatricula(matricula);
					operador.setTelefone(telefone);
					
					listaOperadores.add(operador);
				}

			}catch (Exception ex) {

				ex.printStackTrace();
			}
			return listaOperadores;
		}
		public List<Operador> buscarSelOperador (){

			String comando = "SELECT * FROM operador";
			List<Operador> listaOperadores = new ArrayList<Operador>();
			Operador operador = null;

			try {

				Statement stmt = conexao.createStatement();

				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					operador = new Operador();

					int idd = rs.getInt("idOperador");
					String nome = rs.getString("nome");
					

					operador.setId(idd);
					operador.setNome(nome);
					listaOperadores.add(operador);
				}

			}catch (Exception ex) {

				ex.printStackTrace();
			}
			return listaOperadores;
		}
		public boolean alterarSenhaOp(Operador operador) {		
			String comando = "UPDATE operador "
					+ "SET senha=?"
					+ " WHERE idOperador=?";
			PreparedStatement p;
			String salt="DGE$5SGr@3VsHYUMas2323E4d57vfBfFSTRU@!DSH(*%FDSdfg13sgfsg";
			String senha = operador.getSenha();
			String senhaSalt = senha+salt;
			String senhaSha1ComSal = DigestUtils.shaHex(senhaSalt);
			try {
				
				
				
				p = this.conexao.prepareStatement(comando);
				p.setString(1,senhaSha1ComSal);
				p.setInt(2,operador.getId());

				p.executeUpdate();

			}catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
			return true;
		}
}