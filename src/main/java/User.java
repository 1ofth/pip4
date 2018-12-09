import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name= "user_lab")
@Getter @Setter
public class User {
    @Id
    @Column(name = "login", nullable = false)
    private String login;

    @Column(name = "password", nullable = false)
    private String password;

    public User(){}

    public User(String login, String password){
        this.login = login;
        this.password = password;
    }
}
