package br.com.cartacep.bd;

import java.sql.Connection;

public class Conexao {

	private Connection conexao;

	public Connection abrirConexao() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			conexao = java.sql.DriverManager.getConnection("jdbc:mysql://localhost/cartacep?"
					+"user=root&password=root&useTimezone=true&serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false");
		}catch(Exception e) {
			e.printStackTrace();
		}
		return conexao;
	}
public void fecharConexao() {
	try {
		conexao.close();
	}catch(Exception e) {
		e.printStackTrace();
	}
}
}