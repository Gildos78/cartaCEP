package br.com.cartacep.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import br.com.cartacep.jdbcinterface.CadMaquinaDAO;
import br.com.cartacep.modelo.CadMaquina;

public class JDBCCadMaquinaDAO implements CadMaquinaDAO{
	
private Connection conexao;

public JDBCCadMaquinaDAO(Connection conexao) {
	this.conexao = conexao;
}
	public boolean inserir (CadMaquina cadMaquina) {
		
		String comando = "INSERT INTO maquina"
				+ "(nome) "
				+ "VALUES (?)";
		PreparedStatement p;
		
		try {
			
			p = this.conexao.prepareStatement(comando);			
			p.setString(1, cadMaquina.getNome());
			p.execute();
			
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public List<JsonObject> buscarPorNome (String nome){

		//Inicia a cria��o do comando SQL de busca 
		String comando = "SELECT * FROM maquina ";
		//Se o nome n�o estiver vazio...
		if (nome != "") {
			//concatena no comando o WHERE buscando no nome do produto 
			//o texto da vari�vel nome
			comando += "WHERE maquina.nome LIKE '%"+ nome + "%' "; 
		}
		//Finaliza o comando ordenando alfabeticamente por
		//categoria, marca e depois modelo
		comando += "ORDER BY maquina.nome ASC";
		
		
			List<JsonObject> listaCadMaquinas = new ArrayList<JsonObject>();
			JsonObject cadMaquina = null;

			try {

				Statement stmt = conexao.createStatement();
				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					int id = rs.getInt("idmaquina");
					String nomeCad = rs.getString("nome");
					
					cadMaquina = new JsonObject();
					cadMaquina.addProperty("id", id);
					cadMaquina.addProperty("nome", nomeCad);
					
					
					listaCadMaquinas.add(cadMaquina);
				}

			}catch (Exception e) {
				e.printStackTrace();
			}
			return listaCadMaquinas;
		}
	public CadMaquina checkId(int id) {
		
		String comando = "SELECT * FROM maquina WHERE idmaquina = ?";
		CadMaquina cadMaquina = new CadMaquina();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int idd = rs.getInt("idmaquina");
				String nome = rs.getString("nome");				
				cadMaquina.setId(idd);
				cadMaquina.setNome(nome);

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return cadMaquina;
	}
		
		public boolean alterar(CadMaquina cadMaquina) {		
			String comando = "UPDATE maquina "
					+ "SET nome=?"
					+ " WHERE idMaquina=?";
			PreparedStatement p;
			try {
				
				
				
				p = this.conexao.prepareStatement(comando);
				p.setString(1,cadMaquina.getNome());
				p.setInt(2,cadMaquina.getId());

				p.executeUpdate();

			}catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
			return true;
		}
		public boolean deletar(int id) {
			String comando = "DELETE FROM maquina WHERE idmaquina = ?";
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
		public List<CadMaquina> buscarSelM (){

			String comando = "SELECT * FROM maquina";
			List<CadMaquina> listaCadMaquinas = new ArrayList<CadMaquina>();
			CadMaquina cadMaquina = null;

			try {

				Statement stmt = conexao.createStatement();

				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					cadMaquina = new CadMaquina();

					int idd = rs.getInt("idmaquina");
					String nome = rs.getString("nome");
					

					cadMaquina.setId(idd);
					cadMaquina.setNome(nome);
					listaCadMaquinas.add(cadMaquina);
				}

			}catch (Exception ex) {

				ex.printStackTrace();
			}
			return listaCadMaquinas;
		}
}