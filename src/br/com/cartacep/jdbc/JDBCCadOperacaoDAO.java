package br.com.cartacep.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import br.com.cartacep.jdbcinterface.CadOperacaoDAO;
import br.com.cartacep.modelo.CadOperacao;

public class JDBCCadOperacaoDAO implements CadOperacaoDAO{
	
private Connection conexao;

public JDBCCadOperacaoDAO(Connection conexao) {
	this.conexao = conexao;
}
	public boolean inserir (CadOperacao cadOperacao) {
		
		String comando = "INSERT INTO operacao"
				+ "(nome) "
				+ "VALUES (?)";
		PreparedStatement p;
		
		try {
			
			p = this.conexao.prepareStatement(comando);			
			p.setString(1, cadOperacao.getNome());
			p.execute();
			
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public List<JsonObject> buscarPorNome (String nome){

		//Inicia a cria��o do comando SQL de busca 
		String comando = "SELECT * FROM operacao ";
		//Se o nome n�o estiver vazio...
		if (nome != "") {
			//concatena no comando o WHERE buscando no nome do produto 
			//o texto da vari�vel nome
			comando += "WHERE operacao.nome LIKE '%"+ nome + "%' "; 
		}
		//Finaliza o comando ordenando alfabeticamente por
		//categoria, marca e depois modelo
		comando += "ORDER BY operacao.nome ASC";
		
		
			List<JsonObject> listaCadOperacoes = new ArrayList<JsonObject>();
			JsonObject cadOperacao = null;

			try {

				Statement stmt = conexao.createStatement();
				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					int id = rs.getInt("idOperacao");
					String nomeCad = rs.getString("nome");
					
					cadOperacao = new JsonObject();
					cadOperacao.addProperty("id", id);
					cadOperacao.addProperty("nome", nomeCad);
					
					
					listaCadOperacoes.add(cadOperacao);
				}

			}catch (Exception e) {
				e.printStackTrace();
			}
			return listaCadOperacoes;
		}
	public CadOperacao checkId(int id) {
		
		String comando = "SELECT * FROM operacao WHERE idOperacao = ?";
		CadOperacao cadOperacao = new CadOperacao();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int idd = rs.getInt("idOperacao");
				String nome = rs.getString("nome");				
				cadOperacao.setId(idd);
				cadOperacao.setNome(nome);

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return cadOperacao;
	}
		
		public boolean alterar(CadOperacao cadOperacao) {		
			String comando = "UPDATE operacao "
					+ "SET nome=?"
					+ " WHERE idOperacao=?";
			PreparedStatement p;
			try {
				
				
				
				p = this.conexao.prepareStatement(comando);
				p.setString(1,cadOperacao.getNome());
				p.setInt(2,cadOperacao.getId());

				p.executeUpdate();

			}catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
			return true;
		}
		public boolean deletar(int id) {
			String comando = "DELETE FROM operacao WHERE idOperacao = ?";
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
		public List<CadOperacao> buscarSel (){

			String comando = "SELECT * FROM operacao";
			List<CadOperacao> listaCadOperacoes = new ArrayList<CadOperacao>();
			CadOperacao cadOperacao = null;

			try {

				Statement stmt = conexao.createStatement();

				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					cadOperacao = new CadOperacao();

					int idd = rs.getInt("idOperacao");
					String nome = rs.getString("nome");
					

					cadOperacao.setId(idd);
					cadOperacao.setNome(nome);
					listaCadOperacoes.add(cadOperacao);
				}

			}catch (Exception ex) {

				ex.printStackTrace();
			}
			return listaCadOperacoes;
		}
}