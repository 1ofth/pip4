import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter({"/secure", "/secure/*"})
public class SecurityFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpSession session = ((HttpServletRequest) request).getSession(false);
        if (session == null || session.getAttribute("login") == null) {
            System.out.println(((HttpServletRequest) request).getContextPath());
//            ((HttpServletResponse) response).sendRedirect(
//                    ((HttpServletRequest) request).getContextPath() + "/index.html");
          session = ((HttpServletRequest) request).getSession(true);
        session.setAttribute("login", "edem");
        } else {
            System.out.println("??????????? WHY ???????????");
            chain.doFilter(request, response);
        }
    }
}
