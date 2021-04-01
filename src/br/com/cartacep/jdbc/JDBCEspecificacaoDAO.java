package br.com.cartacep.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import br.com.cartacep.jdbcinterface.EspecificacaoDAO;
import br.com.cartacep.modelo.Especificacao;


public class JDBCEspecificacaoDAO implements EspecificacaoDAO{

	private Connection conexao;

	public JDBCEspecificacaoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public JDBCEspecificacaoDAO() {
		// TODO Auto-generated constructor stub
	}
	public boolean inserir (Especificacao especificacao) {

		String comando = "INSERT INTO especificacoes "
				+ "(descricao, espMinimo, espMaximo, codeProd, imagemNome) "
				+ "VALUES (?,?,?,?,?)";
		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);

			p.setString(1, especificacao.getDescricao());
			p.setFloat(2, especificacao.getEspMin());
			p.setFloat(3, especificacao.getEspMax());
			p.setInt(4, especificacao.getCodeProd());
			p.setString(5, especificacao.getImagemNome());


			//Executa o comando no BD
			p.execute();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public List<JsonObject> buscarPorCodigo (int codigo){

		//Inicia a cria��o do comando SQL de busca 
		String comando = "SELECT * FROM especificacoes ";
		//Se o nome n�o estiver vazio...
		if (codigo != 0) {
			//concatena no comando o WHERE buscando no nome do produto 
			//o texto da vari�vel nome
			comando += "WHERE especificacoes.codeProd = "+ codigo + " "; 
		}
		
		
			List<JsonObject> listaEspecificacoes = new ArrayList<JsonObject>();
			JsonObject especificacao = null;

			try {

				Statement stmt = conexao.createStatement();
				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					int id = rs.getInt("idEspecificacoes");
					String descricao = rs.getString("descricao");
					float espMin = rs.getFloat("espMinimo");
					float espMax = rs.getFloat("espMaximo");
					
					especificacao = new JsonObject();
					especificacao.addProperty("id", id);
					especificacao.addProperty("descricao", descricao);
					especificacao.addProperty("espMin", espMin);
					especificacao.addProperty("espMax", espMax);
					
					
					listaEspecificacoes.add(especificacao);
				}

			}catch (Exception e) {
				e.printStackTrace();
			}
			return listaEspecificacoes;
		}
	public boolean deletar(int id) {
		String comando = "DELETE FROM especificacoes WHERE idEspecificacoes = ?";
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
	public List<JsonObject> getSample(int  code) {
		String comando = "SELECT * from especificacoes "+
				"WHERE codeProd = ?";
		List<JsonObject> listaEspecificacoes = new ArrayList<JsonObject>();
		JsonObject especificacao = null;
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, code);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("idEspecificacoes");
				String descricao = rs.getString("descricao");
				float espMinimo = rs.getFloat("espMinimo");
				float espMaximo = rs.getFloat("espMaximo");
				int codeProd = rs.getInt("codeProd");
				String imagem = rs.getString("imagemNome");
				especificacao = new JsonObject();
				especificacao.addProperty("id", id);
				especificacao.addProperty("descricao", descricao);
				especificacao.addProperty("espMin", espMinimo);
				especificacao.addProperty("espMax", espMaximo);
				especificacao.addProperty("codeProd", codeProd);
				especificacao.addProperty("imagem", imagem);
				
				
				listaEspecificacoes.add(especificacao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaEspecificacoes;
	}
}