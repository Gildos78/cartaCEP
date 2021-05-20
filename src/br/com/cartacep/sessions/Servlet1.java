package br.com.cartacep.sessions;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.tomcat.util.digester.Digester;

import br.com.cartacep.modelo.Usuario;
import br.com.cartacep.bd.Conexao;



/**
 * Servlet implementation class Servlet1
 */
@WebServlet("/Servlet1")
public class Servlet1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		String email = request.getParameter("emailLogin");
		String password = request.getParameter("senhaLogin");
	
	String salt="DGE$5SGr@3VsHYUMas2323E4d57vfBfFSTRU@!DSH(*%FDSdfg13sgfsg";
	String senhaSalt = password+salt;
	String senhaSha1SemSal = DigestUtils.shaHex(senhaSalt);
	
	HttpSession session = request.getSession();
	boolean flag = false;
//	Usuario usuario = new Usuario();
	
	
	try {
		Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
		Conexao conec = new Conexao();
		Connection con = conec.abrirConexao();
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery("select * from gestor");
		

		while(rs.next()) {
			if(email.equals(rs.getString(3)) && senhaSha1SemSal.equals(rs.getString(4))) {
				session.setAttribute("email", email);
				session.setAttribute("senha", senhaSha1SemSal);
				String nome = rs.getString("nome");
				//String iduser = rs.getString("idGestor");

				
				
				session.setAttribute("nome", nome);	

//				usuario.setNome(nome);
				flag = true;
				response.sendRedirect("Pages/index.html");

			}
			
		}
		
		if(flag==false) {
			response.sendRedirect("register.html");

		}
		
		
	}catch(Exception p){
		out.print(p);
	}
		
		
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("Pages/index.html").forward(request, response);
		doGet(request, response);
	}

}
