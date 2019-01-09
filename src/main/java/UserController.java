import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

@Stateless
@Path("/")
public class UserController {

    @EJB
    private UserService userService;

    @POST
    @Path("login")
    public Response checkAuth(@FormParam("login") String login,
                              @FormParam("password") String password,
                              @Context HttpServletRequest req) {
        User user = userService.findOne(login);

        Hash hash = new Hash();

        if (user == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("User with such name is not registered yet")
                    .build();
        } else if (!user.getPassword().equals(hash.getHash(password))) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Incorrect user password")
                    .build();
        } else {
            req.getSession().setAttribute("login", login);
            return Response.status(Response.Status.OK)
                    .entity("Logged in.")
                    .build();
        }
    }

    @POST
    @Path("registration")
    public Response newUser(@FormParam("login") String login,
                            @FormParam("password") String password,
                            @Context HttpServletRequest req) {

        Hash hash = new Hash();

        User user = new User(login, hash.getHash(password));
        if (validateCredentials(login, password) && userService.findOne(login) == null) {
            userService.saveUser(user);
            req.getSession().setAttribute("login", login);
            return Response.status(Response.Status.CREATED)
                    .entity("User was successfully registered.")
                    .build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Failed to create a user.")
                    .build();
        }
    }

    @GET
    @Path("{path:.*}")
    public InputStream index(@Context HttpServletRequest req, @PathParam("path") String path) {
        try {
            System.out.println("Doesn't fall yet!");
            String base = req.getServletContext().getRealPath("");
            path = path.equals("") ? "static/index.html" : path;
            File f = new File(String.format("%s/%s", base, path));
            return new FileInputStream(f);
        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }


    @POST
    @Path("secure/logout")
    public Response logOut(@Context HttpServletRequest req,
                           @Context HttpServletResponse resp) {
        try {
            req.getSession().invalidate();
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    private boolean validateCredentials(String login, String password) {
        if (login == null || login.equals("") || login.length() > 15) {
            return false;
        }
        return password != null && !password.equals("") && password.length() <= 15;
    }
}