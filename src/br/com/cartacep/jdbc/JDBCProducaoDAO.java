package br.com.cartacep.jdbc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import br.com.cartacep.jdbcinterface.ProducaoDAO;
import br.com.cartacep.modelo.Producao;

public class JDBCProducaoDAO implements ProducaoDAO{

	private Connection conexao;

	public JDBCProducaoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	public boolean inserir (Producao producao) {
		String comando = "INSERT INTO producao"
				+ "(codigo, cliente, dataInicio, dataFinal, descricao, numAmostras, idOperacao, idMaquina, codeRefEsp, totalEsp) "
				+ "VALUES (?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);			
			p.setString(1, producao.getCodigo());
			p.setString(2, producao.getCliente());
			p.setString(3, producao.getDataInicio());
			p.setString(4, producao.getDataFinal());
			p.setString(5, producao.getDescricao());			
			p.setInt(6, producao.getNumAmostras());
			p.setInt(7,  producao.getOperacaoId());
			p.setInt(8, producao.getMaquinaId());
			p.setInt(9, producao.getCodeRefEsp());
			p.setInt(10, producao.getTotalEsp());
			p.execute();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}
	public boolean inserirSub (Producao producao) {
		String comando = "INSERT INTO subgrupo "
				+ "(quantidade, codeProd) "
				+ "VALUES (?,?)";
		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);			
			p.setInt(1, producao.getSubgrupo());
			p.setInt(2, producao.getCodeRefEsp());

			p.execute();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}
	public List<JsonObject> buscar (String cliente){

		String comando = "SELECT *, maquina.nome as maquina, operacao.nome as operacao, especificacoes.espMinimo as especMin,  especificacoes.espMaximo as especMax, subgrupo.quantidade as subgrupo FROM producao "+
				"inner join maquina on producao.idmaquina = maquina.idmaquina "+
				"inner join operacao on producao.idOperacao = operacao.idOperacao "+
				"inner join especificacoes on especificacoes.codeProd=producao.codeRefEsp "+
				"inner join subgrupo on subgrupo.codeProd=producao.codeRefEsp ";
		
		//comando += "ORDER BY producao.cliente ASC";		
		List<JsonObject> listaProducoes = new ArrayList<JsonObject>();
		JsonObject producao = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int id = rs.getInt("idProducao");
				String codigo = rs.getString("codigo");
				String nomeCliente = rs.getString("cliente");
				String dataI = rs.getString("dataInicio");
				String dataF = rs.getString("dataFinal");
				String descricao = rs.getString("descricao");
				float espMin = rs.getFloat("especMin");
				float espMax = rs.getFloat("especMax");
				int numAm = rs.getInt("numAmostras");
				String idOp = rs.getString("operacao");
				String idMaq = rs.getString("maquina");
				int subgrupo = rs.getInt("subgrupo");
				int codeRefEsp = rs.getInt("codeRefEsp");
				int contagemAtual  =rs.getInt("contagemAtual");

				producao = new JsonObject();
				producao.addProperty("id", id);
				producao.addProperty("codigo", codigo);
				producao.addProperty("cliente", nomeCliente);
				producao.addProperty("dataInicio", dataI);
				producao.addProperty("dataFinal", dataF);
				producao.addProperty("descricao", descricao);
				producao.addProperty("espMin", espMin);
				producao.addProperty("espMax", espMax);
				producao.addProperty("numAmostras", numAm);
				producao.addProperty("operacao", idOp);
				producao.addProperty("maquinaId", idMaq);
				producao.addProperty("subgrupo", subgrupo);
				producao.addProperty("codeRefEsp", codeRefEsp);
				producao.addProperty("contagem", contagemAtual);

				listaProducoes.add(producao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaProducoes;
	}

	public boolean deletarSub(int code) {
		String comando = "DELETE FROM subgrupo WHERE codeProd = ?";
		PreparedStatement p;
		try {
			p=this.conexao.prepareStatement(comando);
			p.setInt(1, code);
			p.execute();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public boolean deletarEspTotal(int code) {
		String comando = "DELETE FROM especificacoes WHERE codeProd = ?";
		PreparedStatement p;
		try {
			p=this.conexao.prepareStatement(comando);
			p.setInt(1, code);
			p.execute();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public boolean deletar(int code) {
		String comando = "DELETE FROM producao WHERE codeRefEsp = ?";
		PreparedStatement p;
		try {
			p=this.conexao.prepareStatement(comando);
			p.setInt(1, code);
			p.execute();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public List<Producao> buscarSelP (){

		String comando = "SELECT * FROM producao";
		List<Producao> listaProducao = new ArrayList<Producao>();
		Producao producao = null;

		try {

			Statement stmt = conexao.createStatement();

			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				producao = new Producao();

				int idd = rs.getInt("idProducao");
				String codigo = rs.getString("codigo");


				producao.setId(idd);
				producao.setCodigo(codigo);
				listaProducao.add(producao);
			}

		}catch (Exception ex) {

			ex.printStackTrace();
		}
		return listaProducao;
	}
	public Producao buscarCodigo(int id) {

		String comando = "SELECT * FROM producao WHERE idProducao = ?";
		Producao producao = new Producao();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				int idd = rs.getInt("idProducao");
				String codigo = rs.getString("codigo");
				int numAmostras = rs.getInt("numAmostras");
				int subgrupo = rs.getInt("subGrupo");


				producao.setId(idd);
				producao.setCodigo(codigo);
				producao.setNumAmostras(numAmostras);
				producao.setSubgrupo(subgrupo);


			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return producao;
	}
	public Producao buscarAm(int id) {
		String comando = "SELECT * FROM producao WHERE idProducao = ?";
		Producao producao = new Producao();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				int idd = rs.getInt("idProducao");

				int numAmostras = rs.getInt("numAmostras");

				producao.setId(idd);
				producao.setNumAmostras(numAmostras);


			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return producao;
	}
	public List<JsonObject> getDetailedList (int id){
		String comando = "SELECT *, maquina.nome as maquina, operacao.nome as operacao FROM producao "+
				"inner join maquina on producao.idmaquina = maquina.idmaquina "+
				"inner join operacao on producao.idOperacao = operacao.idOperacao "+
				"WHERE producao.idProducao = "+id+" ";

		List<JsonObject> listaProducoes = new ArrayList<JsonObject>();
		JsonObject producao = null;
		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int idd = rs.getInt("idProducao");
				String codigo = rs.getString("codigo");
				String nomeCliente = rs.getString("cliente");
				String dataI = rs.getString("dataInicio");
				String dataF = rs.getString("dataFinal");
				String descricao = rs.getString("descricao");
				float espMin = rs.getFloat("especMin");
				float espMax = rs.getFloat("especMax");
				int numAm = rs.getInt("numAmostras");
				int subgrupo = rs.getInt("subGrupo");
				String idOp = rs.getString("operacao");
				String idMaq = rs.getString("maquina");

				producao = new JsonObject();
				producao.addProperty("id", idd);
				producao.addProperty("codigo", codigo);
				producao.addProperty("cliente", nomeCliente);
				producao.addProperty("dataInicio", dataI);
				producao.addProperty("dataFinal", dataF);
				producao.addProperty("descricao", descricao);
				producao.addProperty("espMin", espMin);
				producao.addProperty("espMax", espMax);
				producao.addProperty("numAmostras", numAm);
				producao.addProperty("subgrupo", subgrupo);
				producao.addProperty("operacao", idOp);
				producao.addProperty("maquinaId", idMaq);


				listaProducoes.add(producao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaProducoes;
	}
	public List<JsonObject> buscarProducao (String cliente){

		String comando = "SELECT *, maquina.nome as maquina, operacao.nome as operacao, subgrupo.quantidade as subgrupo FROM producao "+
				"inner join maquina on producao.idmaquina = maquina.idmaquina "+
				"inner join operacao on producao.idOperacao = operacao.idOperacao "+
				"inner join subgrupo on subgrupo.codeProd=producao.codeRefEsp ";
		
		comando += "ORDER BY producao.cliente ASC";		
		List<JsonObject> listaProducoes = new ArrayList<JsonObject>();
		JsonObject producao = null;
		
		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int id = rs.getInt("idProducao");
				String codigo = rs.getString("codigo");
				String nomeCliente = rs.getString("cliente");
				String dataI = rs.getString("dataInicio");
				String dataF = rs.getString("dataFinal");
				String descricao = rs.getString("descricao");
				int numAm = rs.getInt("numAmostras");
				String idOp = rs.getString("operacao");
				String idMaq = rs.getString("maquina");
				int subgrupo = rs.getInt("subgrupo");
				int codeRefEsp = rs.getInt("codeRefEsp");
				int totalEsp = rs.getInt("totalEsp");
				Boolean statusFull = rs.getBoolean("statusFull");
				int contagemAtual = rs.getInt("contagemAtual");
				producao = new JsonObject();
				producao.addProperty("id", id);
				producao.addProperty("codigo", codigo);
				producao.addProperty("cliente", nomeCliente);
				producao.addProperty("dataInicio", dataI);
				producao.addProperty("dataFinal", dataF);
				producao.addProperty("descricao", descricao);
				producao.addProperty("numAmostras", numAm);
				producao.addProperty("operacao", idOp);
				producao.addProperty("maquinaId", idMaq);
				producao.addProperty("subgrupo", subgrupo);
				producao.addProperty("codeRefEsp", codeRefEsp);
				producao.addProperty("totalEsp", totalEsp);
				producao.addProperty("statusFull", statusFull);
				producao.addProperty("contagemAtual",contagemAtual);

				listaProducoes.add(producao);
				getTotalEsp(codeRefEsp);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaProducoes;
	}
	public Producao getSubNumber(int  code) {
		String comando = "SELECT * from subgrupo "+
				"WHERE codeProd = ?";
		Producao producao= new Producao();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, code);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("idSubgrupo");
				int codigo = rs.getInt("codeProd");
				int quantidade = rs.getInt("quantidade");
				
				producao.setIdSub(id);
				producao.setCodeRefEsp(codigo);
				producao.setSubgrupo(quantidade);

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return producao;
	}
	public List<JsonObject> limitMeasure(int  id) {
		String comando = "select medicoes.*, producao.numAmostras, subgrupo.quantidade from medicoes "
				+ "inner join especificacoes on especificacoes.idEspecificacoes = medicoes.idEsp "
				+ "inner join producao on producao.codeRefEsp = especificacoes.codeProd "
				+ "inner join subgrupo on subgrupo.codeProd = especificacoes.codeProd "
				+ "where medicoes.idEsp = "+id+" ";
		List<JsonObject> listaProducoes = new ArrayList<JsonObject>();
		JsonObject producao = null;
		
		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int numAmostras = rs.getInt("numAmostras");				
				int quantidade = rs.getInt("quantidade");
				
				producao = new JsonObject();
				producao.addProperty("numAmostras", numAmostras);
				producao.addProperty("quantidade", quantidade);
				

				listaProducoes.add(producao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaProducoes;
	}
	public Producao getProdInd(int  code) {
		
		
		String comando = "SELECT *, maquina.nome as maquina, operacao.nome as operacao, subgrupo.quantidade as subgrupo FROM producao "+
				"inner join maquina on producao.idmaquina = maquina.idmaquina "+
				"inner join operacao on producao.idOperacao = operacao.idOperacao "+
				"inner join subgrupo on subgrupo.codeProd=producao.codeRefEsp "+
				"WHERE codeRefEsp = ?";
		
		Producao producao= new Producao();
		try {
			getTotalSamples(code);
			
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, code);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("idProducao");
				String codigo = rs.getString("codigo");
				String nomeCliente = rs.getString("cliente");
				String dataI = rs.getString("dataInicio");
				String dataF = rs.getString("dataFinal");
				String descricao = rs.getString("descricao");
				int numAm = rs.getInt("numAmostras");
				String idOp = rs.getString("operacao");
				String idMaq = rs.getString("maquina");
				int subgrupo = rs.getInt("subgrupo");
				int codeRefEsp = rs.getInt("codeRefEsp");
				int contagemAtual = rs.getInt("contagemAtual");
				producao.setId(id);
				producao.setCliente(nomeCliente);
				producao.setCodigo(codigo);
				producao.setDataInicio(dataI);
				producao.setDataFinal(dataF);
				producao.setDescricao(descricao);
				producao.setNumAmostras(numAm);
				producao.setOperacao(idOp);
				producao.setMaquina(idMaq);
				producao.setSubgrupo(subgrupo);
				producao.setCodeRefEsp(codeRefEsp);
				producao.setContagemAtual(contagemAtual);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return producao;
	}
	public Producao getTotalSamples(int  code) {
		String comando = "select count(*), producao.numAmostras as Amostras, producao.totalEsp as Especificacoes, producao.codeRefEsp as Code, subgrupo.quantidade as Subgrupo from subgrupo_medicoes "
				+ "				inner join medicoes on medicoes.idMedicoes = subgrupo_medicoes.idMedicoes and medicoes.codeProd = ? "
				+ "                inner join producao on producao.codeRefEsp = medicoes.codeProd "
				+ "                inner join subgrupo on subgrupo.codeProd = medicoes.codeProd ";
		Producao producao= new Producao();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			
			p.setInt(1, code);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
			int count = rs.getInt("count(*)");
			int Amostras = rs.getInt("Amostras");
			int Especificacoes = rs.getInt("Especificacoes");
			int Subgrupo = rs.getInt("Subgrupo");
			int codigo = rs.getInt("Code");
			producao.setTotalAmostras(count);
			producao.setNumAmostras(Amostras);
			producao.setTotalEsp(Especificacoes);
			producao.setSubgrupo(Subgrupo);
			producao.setCodeRefEsp(codigo);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return producao;
	}
	
	public List<JsonObject> getTotalTeste (int code){

		String comando = "select subgrupo_medicoes.valorMedicao, producao.numAmostras as Amostras, producao.totalEsp as Especificacoes, producao.codeRefEsp as Code, subgrupo.quantidade as Subgrupo from subgrupo_medicoes "
				+ "inner join medicoes on medicoes.idMedicoes = subgrupo_medicoes.idMedicoes and medicoes.codeProd = "+code+" "
				+ "inner join producao on producao.codeRefEsp = medicoes.codeProd "
				+ "inner join subgrupo on subgrupo.codeProd = medicoes.codeProd ";
			
		List<JsonObject> listaProducoes = new ArrayList<JsonObject>();
		JsonObject producao = null;
		
		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while(rs.next()) {

				int Amostras = rs.getInt("Amostras");
				int Especificacoes = rs.getInt("Especificacoes");
				int Subgrupo = rs.getInt("Subgrupo");
				int Code =rs.getInt("Code");
				producao = new JsonObject();
				producao.addProperty("Amostras", Amostras);
				producao.addProperty("Especificacoes", Especificacoes);
				producao.addProperty("Subgrupo",Subgrupo);
				producao.addProperty("Code",Code);
				

				listaProducoes.add(producao);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}
		return listaProducoes;
	}
	
	public Producao getTotalEsp(int  code) {
		String comando = "select count(*) as total from especificacoes "
				+ " where especificacoes.codeProd   = ? ";
		Producao producao= new Producao();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, code);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
			int count = rs.getInt("total");
			producao.setTotalEsp(count);

			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return producao;
	}
	public boolean changeStatusFull(Producao producao) {		
		String comando = "UPDATE producao "
				+ "SET statusFull=?, contagemAtual=? "
				+ " WHERE codeRefEsp=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);			
			p.setBoolean(1, producao.getStatusFull());
			p.setInt(2, producao.getContagemAtual());
			p.setInt(3, producao.getCodeRefEsp());
			p.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
}