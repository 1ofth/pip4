import javax.ejb.*;
import javax.persistence.*;
import java.util.Objects;

@Stateful
public class UserService {

    @PersistenceContext(unitName = "provider")
    private EntityManager entityManager;

    public UserService(){}

    public void saveUser(User user){
        entityManager.persist(user);
    }

    public User findOne(String login) {
        User user;
        try {
             user = (User) entityManager.createQuery(" select u from User u where u.login = :login")
                    .setParameter("login", login).getSingleResult();
        } catch (NoResultException e ) {
            System.out.println("no user with such login");
            return null;
        }
        return user;
    }

}
