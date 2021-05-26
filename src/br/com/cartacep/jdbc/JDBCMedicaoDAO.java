package br.com.cartacep.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import br.com.cartacep.jdbcinterface.MedicaoDAO;
import br.com.cartacep.modelo.Medicao;
import br.com.cartacep.modelo.Producao;

public class JDBCMedicaoDAO implements MedicaoDAO{

	private Connection conexao;

	public JDBCMedicaoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir (Medicao medicao) {
		String comando = "INSERT INTO medicoes "
				+ "(idMedicoes, dataHora, obs, codeProd, idOperador, totalMed, idEsp) "
				+ "VALUES (?,?,?,?,?,?,?)";
		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);			
	
			p.setInt(1,  medicao.getIdMedicao());
			p.setString(2, medicao.getDataHora());
			p.setString(3, medicao.getObs());
			p.setInt(4, medicao.getCodeProd());
			p.setInt(5, medicao.getIdOperador());
			p.setInt(6, 0);
			p.setInt(7, medicao.getIdEsp());
			p.execute();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public Medicao getCountEsp(int id) {
		String comando = "select count(idMedicoes) as totalMedicoes from medicoes where idEsp = ?";
		Medicao medicao = new Medicao();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				int countMedicoes = rs.getInt("totalMedicoes");
				medicao.setCountMed(countMedicoes);


			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return medicao;
	}
	public List<JsonObject> buscarMed (int id){
		System.out.println(id);
		String comando = "SELECT *, medicoes.*, producao.numAmostras as Amostras,  subgrupo.quantidade as subGrupo, operador.nome as operador from subgrupo_medicoes "
				+ "inner join medicoes on medicoes.idEsp = "+id+" "
				+ "inner join producao on producao.codeRefEsp = medicoes.codeProd "
				+ "inner join operador on operador.idOperador = medicoes.idOperador "
				+ "inner join subgrupo on subgrupo.idSubgrupo = subgrupo_medicoes.idSubgrupo "
				+ "where medicoes.idMedicoes = subgrupo_medicoes.idMedicoes;";
		
		List<JsonObject> listaMedicoes = new ArrayList<JsonObject>();
		JsonObject medicao = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int idM = rs.getInt("idMedicoes");
				String dataHora = rs.getString("dataHora");
				String obs = rs.getString("obs");				
				int codeProd = rs.getInt("codeProd");
				int idOperador = rs.getInt("idOperador");
				int idEsp = rs.getInt("idEsp");
				int quantidade = rs.getInt("Amostras");
				String operador = rs.getString("operador");
				float valor = rs.getFloat("valorMedicao");
				int  subgrupo = rs.getInt("subGrupo");
				medicao = new JsonObject();
				medicao.addProperty("idMed", idM);
				medicao.addProperty("dataHora", dataHora);
				medicao.addProperty("obs", obs);
				medicao.addProperty("codeProd", codeProd);
				medicao.addProperty("idOperador", idOperador);
				medicao.addProperty("idEsp", idEsp);
				medicao.addProperty("quantidade", quantidade);
				medicao.addProperty("operador", operador);
				medicao.addProperty("valor", valor);
				medicao.addProperty("subgrupo", subgrupo);
				listaMedicoes.add(medicao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaMedicoes;
	}
	public boolean deletarMed(int id) {
		String comando = "DELETE FROM medicoes WHERE idMedicoes = ?";
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
	public boolean deletarMedEsp(int id) {
		String comando = "DELETE FROM medicoes WHERE idEsp = ?";
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
	public List<JsonObject> getSamplesComplete (int id){
		String comando = "select * from subgrupo_medicoes "
				+ "inner join subgrupo on subgrupo.idSubgrupo = subgrupo_medicoes.idSubgrupo "
				+ "inner join especificacoes on especificacoes.idEspecificacoes = subgrupo_medicoes.idEspecificacao "
				+ "inner join producao on producao.codeRefEsp = especificacoes.codeProd "
				+ "inner join medicoes on medicoes.idMedicoes = subgrupo_medicoes.idMedicoes "
				+ "where idEspecificacao = "+id+" ";
		
		List<JsonObject> listaMedicoes = new ArrayList<JsonObject>();
		JsonObject medicao = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				float valor = rs.getFloat("valorMedicao");
				int subgrupo = rs.getInt("quantidade");
				int contagem = rs.getInt("contagemAtual");
				int numAmostras = rs.getInt("numAmostras");
				String dataHora = rs.getString("dataHora");
				int code = rs.getInt("codeProd");
				int espMinimo = rs.getInt("espMinimo");
				int espMaximo = rs.getInt("espMaximo");
				String obs = rs.getString("obs");
				medicao = new JsonObject();
				medicao.addProperty("valor", valor);
				medicao.addProperty("subgrupo", subgrupo);
				medicao.addProperty("contagem", contagem);
				medicao.addProperty("numAmostras", numAmostras);
				medicao.addProperty("dataHora", dataHora);
				medicao.addProperty("code", code);
				medicao.addProperty("espMinimo", espMinimo);
				medicao.addProperty("espMaximo", espMaximo);
				medicao.addProperty("obs", obs);
				listaMedicoes.add(medicao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaMedicoes;
	}
	public List<JsonObject> getMeasureId (int code){
		String comando = "select * from medicoes where codeProd = "+code+" ";
				
		
		List<JsonObject> listaMedicoes = new ArrayList<JsonObject>();
		JsonObject medicao = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int idM = rs.getInt("idMedicoes");
			
				int idEsp = rs.getInt("idEsp");
				
				medicao = new JsonObject();
				medicao.addProperty("idMed", idM);
				
				medicao.addProperty("idEsp", idEsp);
				
				listaMedicoes.add(medicao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaMedicoes;
	}
	public boolean addCount(Medicao medicao) {		
		String comando = "UPDATE medicoes "
				+ "SET totalMed=?, Full=?, totalGer=?, totalSub=? "
				+ " WHERE idEsp=?";
		PreparedStatement p;
		try {
			
			p = this.conexao.prepareStatement(comando);			
			p.setInt(1, medicao.getCountMed());
			p.setBoolean(2, medicao.getFull());
			p.setInt(3, medicao.getTotalGer());
			p.setInt(4, medicao.getTotalSub());
			p.setInt(5, medicao.getIdEsp());
			p.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public List<JsonObject> lookUpCount (int code){
		String comando = "SELECT count(*) as totalSoFar, totalGer, totalSub, totalMed, subgrupo.quantidade as quantity from medicoes\r\n" + 
				"inner join subgrupo on subgrupo.codeProd = medicoes.codeProd\r\n" + 
				"where medicoes.codeProd = "+code+" ";
				
		
		List<JsonObject> listaMedicoes = new ArrayList<JsonObject>();
		JsonObject medicao = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int totalSoFar = rs.getInt("totalSoFar");
				int totalMed = rs.getInt("totalMed");
				int totalGer = rs.getInt("totalGer");
				int quantity = rs.getInt("quantity");
				int totalMC = rs.getInt("totalSub");
				
				
				medicao = new JsonObject();
				medicao.addProperty("totalSoFar", totalSoFar);
				medicao.addProperty("totalMed", totalMed);
				medicao.addProperty("totalGer", totalGer);
				medicao.addProperty("quantity", quantity);
				medicao.addProperty("totalMC", totalMC);
				
				listaMedicoes.add(medicao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaMedicoes;
	}
	public Medicao lookUpCountSub (int code){
		
		String comando = "select count(*) as quantidade from especificacoes where codeProd = ?";
		Medicao medicao = new Medicao();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, code);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				int countMedicoes = rs.getInt("quantidade");
				medicao.setIdEsp(countMedicoes);


			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return medicao;
	}
}