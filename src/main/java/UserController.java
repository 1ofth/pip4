import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;

@Stateless
@Path("/")
public class UserController {

    @EJB
    private UserService userService;

    @POST
    @Path("login")
    public void checkAuth(@FormParam("login") String login,
                          @FormParam("password") String password,
                          @Context HttpServletResponse resp,
                          @Context HttpServletRequest req) {
        System.out.println("it works!!!!!!!!!!!!!!!!");
        try {
            User user = userService.findOne(login);
            if (user != null && user.getPassword().equals(password)) {
                req.getSession().setAttribute("login", login);
                resp.sendRedirect(req.getContextPath()+ "/secure/sec.html");
            } else {
                resp.sendRedirect(req.getContextPath() + "/index.html");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @POST
    @Path("registration")
    public void newUser(@FormParam("login") String login,
                        @FormParam("password") String password,
                        @Context HttpServletResponse resp,
                        @Context HttpServletRequest req) {
        try {
            User user = new User(login, password);
            if (validateCredentials(login, password)  && userService.findOne(login) == null) {
                userService.saveUser(user);
                req.getSession().setAttribute("login", login);
                resp.sendRedirect(req.getContextPath() + "/secure/sec.html");
            } else {
                resp.sendRedirect(req.getContextPath() +  "/index.html");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GET
    @Path("{path:.*}")
    public InputStream index(@Context HttpServletRequest req, @PathParam("path") String ee) {
        try {
            System.out.println("Doesn't fall yet!");
            String base = req.getServletContext().getRealPath("");
            File f = new File(String.format("%s/%s", base, ee));
            return new FileInputStream(f);
        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());
            // log the error?
            return null;
        }
    }


    @POST
    @Path("secure/logout")
    public void logOut(@Context HttpServletRequest req,
                       @Context HttpServletResponse resp) {
        try {
            req.getSession().invalidate();
            resp.sendRedirect(req.getContextPath() + "/index.html");
        } catch (Exception e) { e.printStackTrace(); }
    }

    private boolean validateCredentials(String login, String password){
        if (login.length() < 5 || login.length() > 20) return false;
        if (password.length() < 5 || password.length() > 20) return false;
        return true;
    }
}
