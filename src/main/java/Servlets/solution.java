package Servlets;

import java.io.IOException;

import cbr.CBRAgent;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
		if (request instanceof HttpServletRequest) {
			String queryString = ((HttpServletRequest)request).getQueryString();
			if(queryString == null) {
				response.getOutputStream().println("{}");
			} else {
				response.getOutputStream().println(CBRAgent.getSolution(queryString));
			}
		}
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
