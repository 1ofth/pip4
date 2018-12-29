import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

@Stateless
@Path("/")
public class PointController {

    @EJB
    private PointService pointService;
    @EJB
    private UserService userService;

    @POST
    @Path("add")
    public Response newPoint(@FormParam("X") double x, @FormParam("Y") double y ,
                             @FormParam("R") double r, @Context HttpServletRequest request ) {
        if (r < 0 || r > 5  || x < -2 || x > 2 || y < -3 || y > 5) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Incorrect input data")
                    .build();
        }

        User user = userService.findOne((String)request.getSession().getAttribute("login"));
        Point point = new Point(x, y, r,  checkArea(x, y, r), user);
        pointService.save(point);

        return Response.status(Response.Status.OK).entity(point.toString()).build();
    }

    @GET
    @Path("getAll")
    public Response getPoints(@Context HttpServletRequest request) {
        User user = userService.findOne((String)request.getSession().getAttribute("login"));

        return Response.status(Response.Status.OK)
                .entity(pointService.getAllPoints(user).toString())
                .build();
    }

    private boolean checkArea(double x, double y, double r){
        if(x>=0 && y<=0  && y >= x - r){
            return true;
        }
        if(x>=0 && y>=0 && y<=r && x<=r ){
            return true;
        }
        if(x<=0 && y>=0 && y*y + x*x <= (r/2)*(r/2)){
            return true;
        }
        return false;
    }

}
