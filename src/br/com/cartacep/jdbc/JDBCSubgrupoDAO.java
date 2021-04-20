package br.com.cartacep.jdbc;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;

import com.google.gson.JsonObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import br.com.cartacep.jdbcinterface.SubgrupoDAO;
import br.com.cartacep.modelo.Producao;
import br.com.cartacep.modelo.Subgrupo;

public class JDBCSubgrupoDAO implements SubgrupoDAO{

	private Connection conexao;

	public JDBCSubgrupoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir (Subgrupo subgrupo) {
		String comando = "INSERT INTO subgrupo_medicoes "
				+ "(idEspecificacao, idSubgrupo, valorMedicao, idMedicoes) "
				+ "VALUES (?,?,?,?)";
		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);			
	
			p.setInt(1,  subgrupo.getIdEsp());
			p.setInt(2, subgrupo.getIdSub());
			p.setFloat(3, subgrupo.getValor());
			p.setInt(4, subgrupo.getIdMedicao());
			p.execute();

		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public boolean deletarSub(int id) {
		System.out.println(id);
		String comando = "DELETE FROM subgrupo_medicoes WHERE idMedicoes = ?";
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
	public boolean deletarSubEsp(int id) {
		System.out.println(id);
		String comando = "DELETE FROM subgrupo_medicoes WHERE idEspecificacao = ?";
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
}