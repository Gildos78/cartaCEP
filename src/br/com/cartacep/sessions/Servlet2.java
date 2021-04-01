package br.com.cartacep.sessions;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



/**
 * Servlet implementation class Servlet2
 */


@WebServlet("/Servlet2")
public class Servlet2 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession(false);
		if(session!=null) {
			
			String name = (String)session.getAttribute("nome");
			
			
			
			
			out.print("<!DOCTYPE html>\r\n" + 
					"<html lang=\"pt-br\">\r\n" + 
					"<head>\r\n" + 
					"<meta charset=\"utf-8\">\r\n" + 
					"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"+
					"<title>Projeto SENAI</title>\r\n" +
					"<link rel=\"stylesheet\" href=\"css/index.css\">\r\n" +
					"<script src=\"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js\"></script>"+
					"<script src=\"https://code.jquery.com/jquery-3.4.1.min.js\" integrity=\"sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=\" crossorigin=\"anonymous\"></script>\r\n" + 
					"<script src=\"//cdn.jsdelivr.net/npm/sweetalert2@9/dist/sweetalert2.min.js\"></script>  \r\n" + 
					"<script src=\"js/admin.js\"></script>"+
					"<script src=\"js/gerente.js\"></script>"+
					"<script src=\"js/jquery-ui.js\"></script>"+
					"<link rel=\"stylesheet\" type=\"text/css\" href=\"css/jquery-ui.css\">"+
					"<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css\">\r\n" + 
					"</head>\r\n" + 
					"<body>\r\n" + 
					"\r\n" + 
					"    <input type=\"checkbox\" id=\"check\">\r\n" + 
					"    <!--header area start-->\r\n" + 
					"    <header class=\"cabecalho\">\r\n" + 
					"        <label for=\"check\">\r\n" + 
					"            <i class=\"fas fa-bars\" id=\"sidebar_btn\"></i>\r\n" + 
					"        </label>\r\n" + 
					"        \r\n" + 
					"        <div class=\"left-area\">\r\n" + 
					"            <h3>Projeto <span>SENAI</span></h3>\r\n" + 
					"        </div>\r\n" + 
					"        <div>\r\n" + 
					"           \r\n" + 
					"        </div>\r\n" + 
					"        <div class=\"right-area\">\r\n" + 
					"         \r\n" + 
					"            <a href=\"Servlet3\" class=\"logout_btn\">Logout</a> \r\n" + 
					"			<h3 id=\"nomeUs\">Bem vindo, "+name+"</h3>\r\n" + 
					"        </div>\r\n" + 
					"    </header>\r\n" + 
					"    <!--header area end-->\r\n" + 
					"    <!--Sidebar start-->\r\n" + 				
					"    <div class=\"sidebar\">\r\n" + 
					"        <a href=\"#\" onclick=\"SENAI.carregaPagina('Content/principal')\"><i class=\"fas fa-home\"></i><span>Principal</span></a>\r\n" + 
					"        <a href=\"#\" onclick=\"SENAI.carregaPagina('Content/Inserir')\"><i class=\"fas fa-keyboard\"></i><span>Ordens de produ&ccedil&atildeo</span></a>\r\n" + 
					"        <a href=\"#\" onclick=\"SENAI.carregaPagina('Content/Desempenho')\"><i class=\"fas fa-chart-line\"></i><span>Desempenho</span></a>\r\n" + 
					"        <a href=\"#\" onclick=\"SENAI.carregaPagina('Content/outrosCadastros')\"><i class=\"fas fa-download\"></i><span>Cadastros</span></a>\r\n" + 
					"        <a href=\"#\" onclick=\"SENAI.carregaPagina('Content/osMeusDados')\"><i class=\"fas fa-user\"></i><span>Os meus dados</span></a>\r\n" + 
					"        <a href=\"#\" onclick=\"SENAI.carregaPagina('Content/cadastroFuncionario')\"><i class=\"fas fa-users\"></i><span>Cadastro funcion&aacuterio</span></a>\r\n" + 
					"    </div>\r\n" + 
					"    <!--Sidebar end-->\r\n" +		
					"<div class=\"content\"> \r\n" + 
					"	<section>\r\n" + 
					"<h2>Principal</h2>\r\n" + 
					"	</section>\r\n" + 
					"<div id=\"modalAviso\"></div>"+
					"</div>"+					
					"</body>\r\n" + 
					"</html>");	
		}else {
			response.sendRedirect("index.html");
	
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
