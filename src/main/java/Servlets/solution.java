package Servlets;

import java.io.IOException;

import cbr.CBRAgent;
import cbr.CBRConstants;
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
		response.getWriter().append("Minesweeper CBR Backend running at Port 8080");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request instanceof HttpServletRequest) {
			String caseName = request.getParameter("Case");
			if(caseName == null || caseName.length() != CBRConstants.CELLS_AMOUNT) {
				response.sendError(400, "Bad Request");
			} else {
				response.getOutputStream().println(CBRAgent.getSolution(caseName));
			}
		}
	}

}
