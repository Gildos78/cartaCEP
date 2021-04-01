

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



public class Filter implements javax.servlet.Filter {

    
    public Filter() {
    }

	
	public void destroy() {
	}

	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		String context = request.getServletContext().getContextPath();
		HttpSession session = httpServletRequest .getSession();
		
		if(session.getAttribute("email")==null&&session.getAttribute("senha")==null) {
			
			((HttpServletResponse) response).sendRedirect(context+"/index.html");
		
			
			
		}else {
			chain.doFilter(request, response);
		}
		
	}
	public void init(FilterConfig fConfig) throws ServletException {
	}

}
