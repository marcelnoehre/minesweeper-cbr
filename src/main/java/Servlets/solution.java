package Servlets;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import minesweeper.Pattern;

/**
 * Servlet implementation class solution
 */
@WebServlet("/solution")
public class solution extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public solution() {
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String requestUrl = request.getRequestURI();
		String name = requestUrl.substring("/cbr?".length());
		if (request instanceof HttpServletRequest) {
			 String url = ((HttpServletRequest)request).getRequestURL().toString();
			 String queryString = ((HttpServletRequest)request).getQueryString();
			 System.out.println(url + "?" + queryString);
			}
//		Pattern pattern = new Pattern(
//				String.valueOf(name.charAt(0)),
//				String.valueOf(name.charAt(1)),
//				String.valueOf(name.charAt(2)),
//				String.valueOf(name.charAt(3)),
//				String.valueOf(name.charAt(4)),
//				String.valueOf(name.charAt(5)),
//				String.valueOf(name.charAt(6)),
//				String.valueOf(name.charAt(7)),
//				String.valueOf(name.charAt(8)),
//				String.valueOf(name.charAt(9)),
//				String.valueOf(name.charAt(10)),
//				String.valueOf(name.charAt(11)),
//				String.valueOf(name.charAt(12)),
//				String.valueOf(name.charAt(13)),
//				String.valueOf(name.charAt(14)),
//				String.valueOf(name.charAt(15)),
//				String.valueOf(name.charAt(16)),
//				String.valueOf(name.charAt(17)),
//				String.valueOf(name.charAt(18)),
//				String.valueOf(name.charAt(19)),
//				String.valueOf(name.charAt(20)),
//				String.valueOf(name.charAt(21)),
//				String.valueOf(name.charAt(22)),
//				String.valueOf(name.charAt(23)),
//				String.valueOf(name.charAt(24))
//		);
		String result = "";
		try {
			//TODO: get solution as json string
			result = "{test: test}";
		} catch(Exception e) {
			result = "{}";
		}
		response.getOutputStream().println(result);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("doPost method called");
		response.getOutputStream().println("doPost method called");
		//TODO: get case String array from request
		//TODO: add case to case base
	}

}
