import javax.ejb.Stateless;
import javax.persistence.*;
import java.util.List;

@Stateless
public class PointService {

    @PersistenceContext(unitName = "provider")
    private EntityManager entityManager;

    public void save(Point point){
        entityManager.persist(point);
    }

    public List<Point> getAllPoints(User user){
        return  entityManager.createQuery("select p from Point p where p.user = :user")
                .setParameter("user", user).getResultList();
    }


}
