import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Stateless
@Path("/secure")
public class PointController {

    @EJB
    private PointService pointService;
    @EJB
    private UserService userService;

    @POST
    @Path("/add")
    @Produces(MediaType.APPLICATION_JSON)
    public Point newPoint(@FormParam("X") double x, @FormParam("Y") double y ,
                          @FormParam("R") double r, @Context HttpServletRequest request, @Context HttpSession ee) {
        System.out.println((String)ee.getAttribute("login"));
        if (r < 0 || r > 5  || x < -2 || x > 2 || y < -3 || y > 5) return null;
        User user = userService.findOne((String)request.getSession().getAttribute("login"));
        Point point = new Point(x, y, r,  checkArea(x, y, r), user);
        pointService.save(point);

        return point;
    }

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Point> getPoints(@Context HttpServletRequest request) {
        User user = userService.findOne((String)request.getSession().getAttribute("login"));

        return pointService.getAllPoints(user);
    }

    private boolean checkArea(double x, double y, double r){
        if(x<=0 && y>=0 && x>=-r && y <= r/2){
            return true;
        }
        if(x<=0 && y<=0 &&  y>=-0.5*x-0.5*r){
            return true;
        }
        if(x>=0 && y>=0 && y*y + x*x <= (r/2)*(r/2) ){
            return true;
        }
        return false;
    }

}
